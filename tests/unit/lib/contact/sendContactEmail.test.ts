import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendContactEmail } from "@/lib/contact/sendContactEmail";
import { validContactPayload } from "../../../fixtures/contact";

describe("lib/contact/sendContactEmail", () => {
  const payload = {
    name: validContactPayload.name,
    email: validContactPayload.email,
    phone: validContactPayload.phone,
    subject: validContactPayload.subject,
    message: validContactPayload.message,
  };

  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("CONTACT_TO_EMAIL", "dest@climsystem.com");
    vi.stubEnv("CONTACT_FROM_EMAIL", "Site <noreply@climsystem.com>");
  });

  it("envoie une requête POST à l'API Resend", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await sendContactEmail(payload);

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init?.method).toBe("POST");
    expect(init?.headers).toMatchObject({
      Authorization: "Bearer re_test_key",
    });
  });

  it("inclut reply_to avec l'email du visiteur", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await sendContactEmail(payload);

    const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(body.reply_to).toBe(payload.email);
    expect(body.to).toEqual(["dest@climsystem.com"]);
  });

  it("préfixe le sujet avec [Contact site]", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await sendContactEmail(payload);

    const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(body.subject).toContain("[Contact site]");
    expect(body.subject).toContain(payload.name);
  });

  it("inclut html et text dans le corps", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await sendContactEmail(payload);

    const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(body.html).toContain(payload.message);
    expect(body.text).toContain(payload.message);
  });

  it("échappe le HTML dans le corps email", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await sendContactEmail({
      ...payload,
      name: "<script>alert(1)</script>",
    });

    const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(body.html).not.toContain("<script>");
    expect(body.html).toContain("&lt;script&gt;");
  });

  it("lève une erreur si RESEND_API_KEY absent", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    await expect(sendContactEmail(payload)).rejects.toThrow(
      /Configuration email incomplète/,
    );
  });

  it("lève une erreur si Resend répond en erreur", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 403, text: async () => "forbidden" }),
    );
    await expect(sendContactEmail(payload)).rejects.toThrow(/403/);
  });
});
