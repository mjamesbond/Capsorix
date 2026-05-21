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
};

export type ContactValidationResult =
  | { ok: true; data: ContactSubmission }
  | { ok: false; message: string };

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
  };
  const phoneDigits = data.phone.replace(/\D/g, "").length;

  if (data.full_name.length < 2) return { ok: false, message: "Please provide your full name." };
  if (!EMAIL_REGEX.test(data.email)) return { ok: false, message: "Please provide a valid email address." };
  if (!PHONE_REGEX.test(data.phone)) return { ok: false, message: "Please provide a valid phone number." };
  if (phoneDigits < 5) return { ok: false, message: "Please provide a valid phone number." };
  if (!data.project_type) return { ok: false, message: "Please select a project type." };
  if (!data.budget_range) return { ok: false, message: "Please select a budget range." };
  if (!data.timeline) return { ok: false, message: "Please select a timeline." };
  if (data.description.length < 10) return { ok: false, message: "Please add more details to your message." };

  return { ok: true, data };
};

export const isHoneypotTriggered = (value: string | undefined) => Boolean(value && value.trim().length > 0);
