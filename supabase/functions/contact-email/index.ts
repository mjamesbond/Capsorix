import { createClient } from "npm:@supabase/supabase-js@2";
import { isHoneypotTriggered, sanitizeContactPayload, type ContactSubmission } from "./_shared/contact-validation.ts";

const RECIPIENT = "team@capsorix.tech";
const defaults = ["https://capsorix.tech", "https://www.capsorix.tech", "http://localhost:5173", "http://127.0.0.1:5173"];
type Env = { get(key: string): string | undefined };
const runtime = (globalThis as { Deno?: { env: Env; serve(handler: (request: Request) => Promise<Response>): void } }).Deno;

const allowedOrigins = (env: Env) => (env.get("CONTACT_ALLOWED_ORIGINS") || defaults.join(",")).split(",").map((x) => x.trim().toLowerCase()).filter(Boolean);
export const isAllowedOrigin = (origin: string | null, env: Env) => Boolean(origin && allowedOrigins(env).includes(origin.trim().toLowerCase()));
const headers = (origin: string) => ({
  "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Headers": "authorization, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS", Vary: "Origin",
});
const json = (origin: string, status: number, body: Record<string, unknown>) => new Response(JSON.stringify(body), { status, headers: headers(origin) });
const escape = (s: string) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
const reference = () => {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return `CPX-${date}-${Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
};
const ipKey = async (req: Request, salt: string) => {
  const ip = (req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown").trim();
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${salt}:${ip}`));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
};

type ProviderResult = { ok: true; id: string } | { ok: false; code: string };
export const sendNotification = async (apiKey: string, from: string, data: ContactSubmission, ref: string, fetcher = fetch): Promise<ProviderResult> => {
  const text = [`Reference: ${ref}`, `Name: ${data.full_name}`, `Email: ${data.email}`, `Phone: ${data.phone}`, `Project type: ${data.project_type}`, `Budget: ${data.budget_range}`, `Timeline: ${data.timeline}`, "", data.description].join("\n");
  const html = `<main style="font-family:Arial,sans-serif;line-height:1.6;color:#181818"><h1>New Capsorix enquiry</h1><p><strong>Reference:</strong> ${escape(ref)}</p><p><strong>Name:</strong> ${escape(data.full_name)}</p><p><strong>Email:</strong> ${escape(data.email)}</p><p><strong>Phone:</strong> ${escape(data.phone)}</p><p><strong>Project:</strong> ${escape(data.project_type)}</p><p><strong>Budget:</strong> ${escape(data.budget_range)}</p><p><strong>Timeline:</strong> ${escape(data.timeline)}</p><h2>Message</h2><p style="white-space:pre-wrap">${escape(data.description)}</p></main>`;
  try {
    const response = await fetcher("https://api.resend.com/emails", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` }, body: JSON.stringify({ from, to: [RECIPIENT], reply_to: data.email, subject: `[${ref}] New Capsorix enquiry`, text, html }) });
    let body: unknown = {};
    try { body = await response.json(); } catch { /* provider may return non-JSON */ }
    if (response.ok && body && typeof body === "object" && typeof (body as { id?: unknown }).id === "string") return { ok: true, id: (body as { id: string }).id };
    return { ok: false, code: `RESEND_${response.status}` };
  } catch { return { ok: false, code: "RESEND_NETWORK" }; }
};

export const createHandler = (env: Env, fetcher = fetch) => async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin")?.trim() || "";
  if (!isAllowedOrigin(origin, env)) return new Response(JSON.stringify({ accepted: false, code: "ORIGIN_NOT_ALLOWED", message: "Origin is not allowed." }), { status: 403, headers: { "Content-Type": "application/json" } });
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: headers(origin) });
  if (req.method !== "POST") return json(origin, 405, { accepted: false, code: "METHOD_NOT_ALLOWED", message: "Method not allowed." });
  let raw: unknown;
  try { raw = await req.json(); } catch { return json(origin, 400, { accepted: false, code: "INVALID_JSON", message: "Request body must be JSON." }); }
  const parsed = sanitizeContactPayload(raw);
  if (!parsed.ok) return json(origin, 422, { accepted: false, code: parsed.code, message: parsed.message });
  if (isHoneypotTriggered(parsed.data.honeypot)) return json(origin, 202, { accepted: false, code: "REQUEST_FILTERED" });

  const url = env.get("SUPABASE_URL"), role = env.get("SUPABASE_SERVICE_ROLE_KEY"), resend = env.get("RESEND_API_KEY"), from = env.get("CONTACT_FROM_EMAIL"), salt = env.get("CONTACT_RATE_LIMIT_SALT");
  if (!url || !role || !resend || !from || !salt) return json(origin, 503, { accepted: false, code: "SERVICE_MISCONFIGURED", message: "Contact service is unavailable." });
  const db = createClient(url, role, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: allowed, error: throttleError } = await db.rpc("consume_contact_rate_limit", { p_key_hash: await ipKey(req, salt), p_limit: 5 });
  if (throttleError) return json(origin, 503, { accepted: false, code: "THROTTLE_UNAVAILABLE", message: "Contact service is unavailable." });
  if (!allowed) return json(origin, 429, { accepted: false, code: "RATE_LIMITED", message: "Please wait before trying again." });

  const submissionId = parsed.data.submission_id || crypto.randomUUID();
  const { data: existing } = await db.from("project_requests").select("public_reference,delivery_status").eq("submission_id", submissionId).maybeSingle();
  if (existing) return json(origin, 200, { accepted: true, reference: existing.public_reference, delivery: existing.delivery_status === "sent" ? "sent" : "delayed", duplicate: true });

  const ref = reference();
  const row = { full_name: parsed.data.full_name, email: parsed.data.email, phone: parsed.data.phone, project_type: parsed.data.project_type, budget_range: parsed.data.budget_range, timeline: parsed.data.timeline, description: parsed.data.description, submission_id: submissionId, public_reference: ref, delivery_status: "pending" };
  const { error: insertError } = await db.from("project_requests").insert(row);
  if (insertError) {
    if (insertError.code === "23505") {
      const { data: duplicate } = await db.from("project_requests").select("public_reference,delivery_status").eq("submission_id", submissionId).single();
      if (duplicate) return json(origin, 200, { accepted: true, reference: duplicate.public_reference, delivery: duplicate.delivery_status === "sent" ? "sent" : "delayed", duplicate: true });
    }
    console.error("contact stored failed", { reference: ref, code: insertError.code });
    return json(origin, 503, { accepted: false, code: "PERSISTENCE_FAILED", message: "Contact service is unavailable." });
  }
  console.info("contact stored", { reference: ref });
  const sent = await sendNotification(resend, from, parsed.data, ref, fetcher);
  const update = sent.ok ? { delivery_status: "sent", provider_message_id: sent.id, email_sent_at: new Date().toISOString(), delivery_error_code: null, updated_at: new Date().toISOString() } : { delivery_status: "failed", delivery_error_code: sent.code, updated_at: new Date().toISOString() };
  const { error: updateError } = await db.from("project_requests").update(update).eq("submission_id", submissionId);
  if (updateError) console.error("contact status update failed", { reference: ref, code: updateError.code });
  if (!sent.ok) { console.error("contact notification delayed", { reference: ref, code: sent.code }); return json(origin, 202, { accepted: true, reference: ref, delivery: "delayed", duplicate: false, code: "NOTIFICATION_DELAYED" }); }
  console.info("contact notification sent", { reference: ref });
  return json(origin, 200, { accepted: true, reference: ref, delivery: "sent", duplicate: false });
};

if (runtime) runtime.serve(createHandler(runtime.env));
