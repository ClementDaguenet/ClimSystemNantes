import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/contact/route";
import { validContactPayload } from "../../fixtures/contact";

vi.mock("@/lib/contact/sendContactEmail", () => ({
  sendContactEmail: vi.fn().mockResolvedValue(undefined),
}));

import { sendContactEmail } from "@/lib/contact/sendContactEmail";

function postContact(
  body: unknown,
  cookie?: string,
): ReturnType<typeof POST> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (cookie) headers.cookie = cookie;
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }),
  );
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.mocked(sendContactEmail).mockClear();
  });

  it("retourne 200 ok pour un payload valide", async () => {
    const res = await postContact(validContactPayload);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ ok: true });
    expect(sendContactEmail).toHaveBeenCalledOnce();
  });

  it("retourne 400 pour un JSON invalide", async () => {
    const res = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{ broken",
      }),
    );
    expect(res.status).toBe(400);
  });

  it("retourne 400 pour email invalide", async () => {
    const res = await postContact({
      ...validContactPayload,
      email: "bad",
    });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBeTruthy();
  });

  it("retourne 400 sans consentement", async () => {
    const res = await postContact({
      ...validContactPayload,
      consent: false,
    });
    expect(res.status).toBe(400);
  });

  it("ignore silencieusement le honeypot rempli", async () => {
    const res = await postContact({
      ...validContactPayload,
      website: "http://spam-bot.com",
    });
    expect(res.status).toBe(200);
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("pose un cookie rate-limit après succès", async () => {
    const res = await postContact(validContactPayload);
    const setCookie = res.headers.get("set-cookie");
    expect(setCookie).toContain("contact_submit_rl");
  });

  it("retourne 429 après 5 soumissions (cookie)", async () => {
    const state = JSON.stringify({ n: 5, reset: Date.now() + 3_600_000 });
    const cookie = `contact_submit_rl=${encodeURIComponent(state)}`;
    const res = await postContact(validContactPayload, cookie);
    expect(res.status).toBe(429);
  });

  it("retourne 503 si sendContactEmail échoue", async () => {
    vi.mocked(sendContactEmail).mockRejectedValueOnce(new Error("Resend down"));
    const res = await postContact(validContactPayload);
    expect(res.status).toBe(503);
  });

  it("transmet les champs contact sans consent au service email", async () => {
    await postContact(validContactPayload);
    expect(sendContactEmail).toHaveBeenCalledWith({
      name: validContactPayload.name,
      email: validContactPayload.email,
      phone: validContactPayload.phone,
      subject: validContactPayload.subject,
      message: validContactPayload.message,
    });
  });
});
