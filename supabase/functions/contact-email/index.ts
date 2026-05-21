import { createClient } from "npm:@supabase/supabase-js@2";
import { isHoneypotTriggered, sanitizeContactPayload, type ContactSubmission } from "./_shared/contact-validation.ts";

const RECIPIENT_EMAIL = "team@capsorix.tech";
const DEFAULT_ALLOWED_ORIGINS = [
  "https://capsorix.tech",
  "https://www.capsorix.tech",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const env = (globalThis as { Deno?: { env: { get: (key: string) => string | undefined } } }).Deno?.env;
const throttleCache = new Map<string, number[]>();

const getAllowedOrigins = () => {
  const raw = env?.get("CONTACT_ALLOWED_ORIGINS") ?? "";
  if (!raw.trim()) return DEFAULT_ALLOWED_ORIGINS;
  return raw.split(",").map((value) => value.trim()).filter(Boolean);
};

const normalizeOrigin = (origin: string | null) => (origin ? origin.trim().toLowerCase() : "");

const isAllowedOrigin = (origin: string | null) => {
  const normalized = normalizeOrigin(origin);
  if (!normalized) return false;
  return getAllowedOrigins().some((value) => value.toLowerCase() === normalized);
};

const corsHeaders = (origin: string | null) => {
  const allowed = isAllowedOrigin(origin);
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": allowed ? origin ?? DEFAULT_ALLOWED_ORIGINS[0] : DEFAULT_ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const getClientIp = (headers: Headers) => {
  const forwarded = headers.get("x-forwarded-for");
  const connectingIp = headers.get("cf-connecting-ip") ?? headers.get("x-real-ip");
  const source = forwarded?.split(",")[0]?.trim() || connectingIp?.trim();
  if (!source) return "unknown";
  return source.slice(0, 64);
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const timestamps = throttleCache.get(ip) ?? [];
  const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    throttleCache.set(ip, recent);
    return true;
  }
  recent.push(now);
  throttleCache.set(ip, recent);
  return false;
};

const sendViaResend = async (apiKey: string, from: string, submission: ContactSubmission, requestId: string) => {
  const subject = submission.subject || `New contact request from ${submission.full_name}`;
  const messageText = [
    `Reference: ${requestId}`,
    `Name: ${submission.full_name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone}`,
    `Project type: ${submission.project_type}`,
    `Budget range: ${submission.budget_range}`,
    `Timeline: ${submission.timeline}`,
    "",
    "Message:",
    submission.description,
  ].join("\n");

  const html = `
    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;line-height:1.65;color:#0f172a;">
      <h2 style="margin:0 0 16px;">New contact request</h2>
      <p style="margin:0 0 12px;"><strong>Reference:</strong> ${escapeHtml(requestId)}</p>
      <p style="margin:0 0 12px;"><strong>Name:</strong> ${escapeHtml(submission.full_name)}</p>
      <p style="margin:0 0 12px;"><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
      <p style="margin:0 0 12px;"><strong>Phone:</strong> ${escapeHtml(submission.phone)}</p>
      <p style="margin:0 0 12px;"><strong>Project type:</strong> ${escapeHtml(submission.project_type)}</p>
      <p style="margin:0 0 12px;"><strong>Budget range:</strong> ${escapeHtml(submission.budget_range)}</p>
      <p style="margin:0 0 12px;"><strong>Timeline:</strong> ${escapeHtml(submission.timeline)}</p>
      <p style="margin:0 0 8px;"><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px;margin:0;">${escapeHtml(submission.description)}</pre>
    </div>
  `;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [RECIPIENT_EMAIL],
        reply_to: submission.email,
        subject,
        text: messageText,
        html,
      }),
    });

    if (emailResponse.ok) return true;
    if (attempt === 2) {
      const providerError = await emailResponse.text();
      console.error("contact-email provider error", { requestId, status: emailResponse.status, providerError });
      return false;
    }
  }
  return false;
};

const json = (status: number, body: Record<string, unknown>, origin: string | null) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders(origin) });

const denoRuntime = (globalThis as { Deno?: { serve: (handler: (request: Request) => Promise<Response> | Response) => void } }).Deno;
if (!denoRuntime) throw new Error("Deno runtime is required for this function.");

denoRuntime.serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(origin) });
  if (req.method !== "POST") return json(405, { error: "Method not allowed." }, origin);
  if (!isAllowedOrigin(origin)) return json(403, { error: "Invalid origin." }, origin);

  const requestId = crypto.randomUUID();
  const ip = getClientIp(req.headers);

  if (isRateLimited(ip)) {
    console.warn("contact-email rate limited", { requestId, ip });
    return json(429, { error: "Too many requests." }, origin);
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "Invalid request body." }, origin);
  }

  const validated = sanitizeContactPayload(payload);
  if (!validated.ok) return json(400, { error: validated.message }, origin);

  if (isHoneypotTriggered(validated.data.honeypot)) {
    console.warn("contact-email honeypot triggered", { requestId, ip });
    return json(200, { success: true, requestId }, origin);
  }

  const supabaseUrl = env?.get("SUPABASE_URL");
  const serviceRoleKey = env?.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendKey = env?.get("RESEND_API_KEY");
  const fromEmail = env?.get("CONTACT_FROM_EMAIL");

  if (!supabaseUrl || !serviceRoleKey || !resendKey || !fromEmail) {
    console.error("contact-email missing env configuration", { requestId });
    return json(500, { error: "Server configuration error." }, origin);
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error: insertError } = await supabaseAdmin.from("project_requests").insert({
    full_name: validated.data.full_name,
    email: validated.data.email,
    phone: validated.data.phone,
    project_type: validated.data.project_type,
    budget_range: validated.data.budget_range,
    timeline: validated.data.timeline,
    description: validated.data.description,
  });

  if (insertError) {
    console.error("contact-email db insert failed", { requestId, code: insertError.code, details: insertError.message });
    return json(500, { error: "Could not store your request." }, origin);
  }

  const sent = await sendViaResend(resendKey, fromEmail, validated.data, requestId);
  if (!sent) return json(502, { error: "Unable to send email right now." }, origin);

  console.info("contact-email sent", { requestId, domain: validated.data.email.split("@")[1] ?? "unknown" });
  return json(200, { success: true, requestId }, origin);
});
