export type ContactSubmission = {
  full_name: string;
  email: string;
  phone: string;
  project_type: string;
  budget_range: string;
  timeline: string;
  description: string;
  subject?: string;
  honeypot?: string;
  submission_id: string;
};

export type ContactValidationResult =
  | { ok: true; data: ContactSubmission }
  | { ok: false; code: string; message: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\d\s\-./]{5,40}$/;

const cleanText = (value: unknown, max: number) => {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
};

export const sanitizeContactPayload = (payload: unknown): ContactValidationResult => {
  const body = (payload ?? {}) as Record<string, unknown>;

  const data: ContactSubmission = {
    full_name: cleanText(body.full_name, 100),
    email: cleanText(body.email, 255).toLowerCase(),
    phone: cleanText(body.phone, 40),
    project_type: cleanText(body.project_type, 80),
    budget_range: cleanText(body.budget_range, 80),
    timeline: cleanText(body.timeline, 80),
    description: cleanText(body.description, 2000),
    subject: cleanText(body.subject, 120),
    honeypot: cleanText(body.honeypot, 255),
    submission_id: cleanText(body.submission_id, 36),
  };
  const phoneDigits = data.phone.replace(/\D/g, "").length;

  const invalid = (code: string, message: string): ContactValidationResult => ({ ok: false, code, message });
  // Legacy clients deployed before idempotency did not send this field. The
  // handler generates one for those requests so Edge-first rollouts remain safe.
  if (data.submission_id && !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.submission_id)) return invalid("SUBMISSION_ID_INVALID", "Submission identifier is invalid.");
  if (data.full_name.length < 2) return invalid("FULL_NAME_INVALID", "Please provide your full name.");
  if (!EMAIL_REGEX.test(data.email)) return invalid("EMAIL_INVALID", "Please provide a valid email address.");
  if (!PHONE_REGEX.test(data.phone) || phoneDigits < 5) return invalid("PHONE_INVALID", "Please provide a valid phone number.");
  if (!data.project_type) return invalid("PROJECT_TYPE_REQUIRED", "Please select a project type.");
  if (!data.budget_range) return invalid("BUDGET_REQUIRED", "Please select a budget range.");
  if (!data.timeline) return invalid("TIMELINE_REQUIRED", "Please select a timeline.");
  if (data.description.length < 10) return invalid("DESCRIPTION_INVALID", "Please add more details to your message.");

  return { ok: true, data };
};

export const isHoneypotTriggered = (value: string | undefined) => Boolean(value && value.trim().length > 0);
