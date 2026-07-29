export type ContactPayload = {
  full_name: string;
  email: string;
  phone: string;
  project_type: string;
  budget_range: string;
  timeline: string;
  description: string;
  honeypot?: string;
};

export type ContactReceipt = {
  accepted: true;
  reference: string;
  delivery: "sent" | "delayed";
  duplicate: boolean;
};

export type ContactFailureKind =
  | "configuration"
  | "validation"
  | "rate_limit"
  | "unavailable"
  | "network"
  | "timeout";

export class ContactApiError extends Error {
  constructor(
    public readonly kind: ContactFailureKind,
    public readonly code: string,
    message: string,
    public readonly retryable: boolean,
  ) {
    super(message);
    this.name = "ContactApiError";
  }
}

type ContactApiOptions = {
  url?: string;
  publishableKey?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
};

const isValidUrl = (value: string | undefined) => {
  try {
    const url = new URL(value ?? "");
    return url.protocol === "https:" || ["localhost", "127.0.0.1"].includes(url.hostname);
  } catch {
    return false;
  }
};

const safeJson = async (response: Response): Promise<Record<string, unknown>> => {
  try {
    const body = await response.json();
    return body && typeof body === "object" ? body as Record<string, unknown> : {};
  } catch {
    return {};
  }
};

const requestHeaders = (key: string): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: key,
  };

  // Modern sb_publishable_* keys are not JWTs and must not be sent as Bearer
  // tokens. Keep Authorization only for the legacy JWT-based anon key so old
  // deployments remain compatible during migration.
  if (!key.startsWith("sb_publishable_")) headers.Authorization = `Bearer ${key}`;
  return headers;
};

export async function submitContact(
  payload: ContactPayload,
  submissionId: string,
  options: ContactApiOptions = {},
): Promise<ContactReceipt> {
  const url = options.url ?? import.meta.env.VITE_SUPABASE_URL;
  const key = options.publishableKey ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!isValidUrl(url) || !key?.trim()) {
    throw new ContactApiError("configuration", "CLIENT_CONFIGURATION_INVALID", "Contact service is not configured.", false);
  }
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) {
    throw new ContactApiError("validation", "SUBMISSION_ID_INVALID", "Submission identifier is invalid.", false);
  }

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), options.timeoutMs ?? 12_000);
  let response: Response;
  try {
    response = await (options.fetchImpl ?? fetch)(`${url.replace(/\/$/, "")}/functions/v1/contact-email`, {
      method: "POST",
      headers: requestHeaders(key),
      body: JSON.stringify({ ...payload, submission_id: submissionId }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ContactApiError("timeout", "REQUEST_TIMEOUT", "The request timed out.", true);
    }
    throw new ContactApiError("network", "NETWORK_FAILURE", "The contact service could not be reached.", true);
  } finally {
    window.clearTimeout(timer);
  }

  const body = await safeJson(response);
  const code = typeof body.code === "string" ? body.code : "UNEXPECTED_RESPONSE";
  if (response.ok && body.accepted === true && typeof body.reference === "string" &&
      (body.delivery === "sent" || body.delivery === "delayed")) {
    return { accepted: true, reference: body.reference, delivery: body.delivery, duplicate: body.duplicate === true };
  }
  if (response.status === 429) throw new ContactApiError("rate_limit", code, "Please wait before trying again.", true);
  if (response.status === 400 || response.status === 422) {
    throw new ContactApiError("validation", code, typeof body.message === "string" ? body.message : "Check the submitted details.", false);
  }
  throw new ContactApiError("unavailable", code, "The contact service is temporarily unavailable.", true);
}
