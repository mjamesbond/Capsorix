import { describe, expect, it } from "vitest";
import { isHoneypotTriggered, sanitizeContactPayload } from "../../supabase/functions/contact-email/_shared/contact-validation";

describe("contact-email validation", () => {
  it("accepts valid payloads and sanitizes text fields", () => {
    const result = sanitizeContactPayload({
      full_name: "  Mary James  ",
      email: "  Mary@Example.com  ",
      phone: " +1 555 333 2222 ",
      project_type: "Website",
      budget_range: "$25k-$50k",
      timeline: "4-8 weeks",
      description: "  We need a premium landing page and client portal.  ",
      subject: "  New project ",
      honeypot: "  ",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.full_name).toBe("Mary James");
    expect(result.data.email).toBe("mary@example.com");
    expect(result.data.description).toBe("We need a premium landing page and client portal.");
  });

  it("rejects invalid email addresses", () => {
    const result = sanitizeContactPayload({
      full_name: "Mary James",
      email: "not-an-email",
      phone: "+1 555 333 2222",
      project_type: "Website",
      budget_range: "$25k-$50k",
      timeline: "4-8 weeks",
      description: "Long enough message content.",
    });

    expect(result.ok).toBe(false);
  });

  it("flags honeypot values", () => {
    expect(isHoneypotTriggered("")).toBe(false);
    expect(isHoneypotTriggered("   ")).toBe(false);
    expect(isHoneypotTriggered("https://spam.example")).toBe(true);
  });

  it("supports boundary-valid values and trims oversized input", () => {
    const result = sanitizeContactPayload({
      full_name: "A".repeat(140),
      email: "ok@example.com",
      phone: "12345",
      project_type: "Web",
      budget_range: "Low",
      timeline: "Soon",
      description: "1234567890",
      subject: "S".repeat(300),
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.full_name.length).toBe(100);
    expect(result.data.subject?.length).toBe(120);
    expect(result.data.description).toBe("1234567890");
  });
});
