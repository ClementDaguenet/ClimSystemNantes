import { cookies } from "next/headers";

const COOKIE_NAME = "admin_login_rl";
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;

type RateState = { n: number; reset: number };

function parseState(raw: string | undefined): RateState {
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

async function writeState(state: RateState) {
  (await cookies()).set(COOKIE_NAME, JSON.stringify(state), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin/login",
    maxAge: Math.ceil(WINDOW_MS / 1000),
  });
}

export async function isLoginRateLimited(): Promise<boolean> {
  const jar = await cookies();
  const state = parseState(jar.get(COOKIE_NAME)?.value);
  return state.n >= MAX_ATTEMPTS;
}

export async function recordFailedLoginAttempt(): Promise<void> {
  const jar = await cookies();
  const state = parseState(jar.get(COOKIE_NAME)?.value);
  await writeState({ n: state.n + 1, reset: state.reset });
}

export async function clearLoginRateLimit(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}
