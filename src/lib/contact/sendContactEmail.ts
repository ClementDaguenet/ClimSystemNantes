import type { ContactFormData } from "@/lib/contact/schema";

export type ContactEmailPayload = Omit<ContactFormData, "consent">;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtmlBody(data: ContactEmailPayload): string {
  const rows = [
    ["Nom", data.name],
    ["Email", data.email],
    ["Téléphone", data.phone],
    ["Sujet", data.subject],
    ["Message", data.message.replace(/\n/g, "<br>")],
  ] as const;

  const tr = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;">${typeof value === "string" && label === "Message" ? value : escapeHtml(String(value))}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html lang="fr"><body style="font-family:sans-serif;color:#0f172a;"><p>Nouvelle demande via le formulaire de contact du site Climsystem Distribution Atlantique.</p><table style="border-collapse:collapse;width:100%;max-width:560px;">${tr}</table></body></html>`;
}

function buildTextBody(data: ContactEmailPayload): string {
  return [
    "Nouvelle demande via le formulaire de contact - Climsystem Distribution Atlantique",
    "",
    `Nom : ${data.name}`,
    `Email : ${data.email}`,
    `Téléphone : ${data.phone}`,
    `Sujet : ${data.subject}`,
    "",
    "Message :",
    data.message,
  ].join("\n");
}

export async function sendContactEmail(data: ContactEmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) {
    throw new Error(
      "Configuration email incomplète (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL).",
    );
  }

  const subject = `[Contact site] ${data.subject} - ${data.name}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject,
      html: buildHtmlBody(data),
      text: buildTextBody(data),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `Envoi email refusé (${res.status})${detail ? ` : ${detail.slice(0, 200)}` : ""}`,
    );
  }
}
