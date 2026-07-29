import { describe, expect, it, vi } from "vitest";
import { ContactApiError, submitContact, type ContactPayload } from "@/lib/contact-api";

const id = "123e4567-e89b-42d3-a456-426614174000";
const payload: ContactPayload = { full_name: "Mary James", email: "mary@example.com", phone: "+1 555 123 4567", project_type: "Website", budget_range: "$25k", timeline: "Soon", description: "A sufficiently detailed project description." };
const response = (body: unknown, status = 200) => Promise.resolve(new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } }));
const options = (fetchImpl: typeof fetch) => ({ url: "https://example.supabase.co", publishableKey: "public-key", fetchImpl });

describe("contact API", () => {
  it("returns the canonical server reference on successful delivery", async () => {
    const result = await submitContact(payload, id, options(vi.fn(() => response({ accepted: true, reference: "CPX-20260729-A1B2C3D4", delivery: "sent", duplicate: false }))));
    expect(result.reference).toBe("CPX-20260729-A1B2C3D4");
    expect(result.delivery).toBe("sent");
  });

  it("represents stored-but-delayed delivery as an accepted receipt", async () => {
    await expect(submitContact(payload, id, options(vi.fn(() => response({ accepted: true, reference: "CPX-20260729-A1B2C3D4", delivery: "delayed", code: "NOTIFICATION_DELAYED" }, 202))))).resolves.toMatchObject({ delivery: "delayed" });
  });

  it.each([[422, "validation"], [429, "rate_limit"], [503, "unavailable"]] as const)("maps HTTP %s without creating false success", async (status, kind) => {
    await expect(submitContact(payload, id, options(vi.fn(() => response({ accepted: false, code: "PUBLIC_CODE", message: "Safe message" }, status))))).rejects.toMatchObject({ kind, code: "PUBLIC_CODE" });
  });

  it("rejects malformed client configuration before fetch", async () => {
    const fetchImpl = vi.fn();
    await expect(submitContact(payload, id, { url: "undefined", publishableKey: "", fetchImpl })).rejects.toMatchObject({ kind: "configuration" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("distinguishes network failure", async () => {
    await expect(submitContact(payload, id, options(vi.fn(() => Promise.reject(new TypeError("offline")))))).rejects.toMatchObject({ kind: "network" });
  });

  it("aborts finite requests and reports timeout", async () => {
    const fetchImpl = vi.fn((_url: RequestInfo | URL, init?: RequestInit) => new Promise<Response>((_resolve, reject) => init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")))) as ReturnType<typeof fetch>);
    await expect(submitContact(payload, id, { ...options(fetchImpl), timeoutMs: 5 })).rejects.toMatchObject({ kind: "timeout", code: "REQUEST_TIMEOUT" });
  });

  it("reuses the same idempotency key on retry", async () => {
    const fetchImpl = vi.fn()
      .mockRejectedValueOnce(new TypeError("offline"))
      .mockImplementationOnce(() => response({ accepted: true, reference: "CPX-20260729-A1B2C3D4", delivery: "sent", duplicate: true }));
    await expect(submitContact(payload, id, options(fetchImpl))).rejects.toBeInstanceOf(ContactApiError);
    await submitContact(payload, id, options(fetchImpl));
    expect(JSON.parse(fetchImpl.mock.calls[1][1].body as string).submission_id).toBe(id);
  });

  it("does not accept an ok response without an accepted receipt", async () => {
    await expect(submitContact(payload, id, options(vi.fn(() => response({ success: true }))))).rejects.toMatchObject({ kind: "unavailable" });
  });
});
