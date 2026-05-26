import { NextResponse } from "next/server";
import { contactApiSchema } from "@/lib/contact/schema";
import { sendContactEmail } from "@/lib/contact/sendContactEmail";

const RATE_LIMIT_COOKIE = "contact_submit_rl";
const MAX_SUBMISSIONS = 5;
const WINDOW_MS = 60 * 60 * 1000;

type RateState = { n: number; reset: number };

function parseRateState(raw: string | undefined): RateState {
  const now = Date.now();
  if (!raw) return { n: 0, reset: now + WINDOW_MS };
  try {
    const s = JSON.parse(raw) as RateState;
    if (typeof s.n !== "number" || typeof s.reset !== "number") {
      return { n: 0, reset: now + WINDOW_MS };
    }
    if (now > s.reset) return { n: 0, reset: now + WINDOW_MS };
    return s;
  } catch {
    return { n: 0, reset: now + WINDOW_MS };
  }
}

export async function POST(request: Request) {
  const rateCookie = request.headers.get("cookie")?.match(
    new RegExp(`${RATE_LIMIT_COOKIE}=([^;]+)`),
  )?.[1];
  const rateState = parseRateState(
    rateCookie ? decodeURIComponent(rateCookie) : undefined,
  );

  if (rateState.n >= MAX_SUBMISSIONS) {
    return NextResponse.json(
      {
        error:
          "Trop de messages envoyés récemment. Réessayez dans une heure ou contactez-nous par téléphone.",
      },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const parsed = contactApiSchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Données invalides.";
    return NextResponse.json({ error: first }, { status: 400 });
  }

  const { website, name, email, phone, subject, message } = parsed.data;

  if (website?.trim()) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactEmail({ name, email, phone, subject, message });
  } catch (e) {
    const msg =
      e instanceof Error ? e.message : "Impossible d'envoyer le message.";
    console.error("[contact]", msg);
    return NextResponse.json(
      {
        error:
          "L'envoi a échoué. Merci de nous contacter directement par téléphone ou email.",
      },
      { status: 503 },
    );
  }

  const nextState: RateState = { n: rateState.n + 1, reset: rateState.reset };
  const response = NextResponse.json({ ok: true });
  response.cookies.set(RATE_LIMIT_COOKIE, JSON.stringify(nextState), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/contact",
    maxAge: Math.ceil(WINDOW_MS / 1000),
  });
  return response;
}
