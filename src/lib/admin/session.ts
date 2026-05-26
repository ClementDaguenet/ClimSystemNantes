import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/constants";
import { signAdminJwt, verifyAdminToken } from "@/lib/admin/jwt";

export async function createAdminJwt(): Promise<string> {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("ADMIN_JWT_SECRET manquant.");
  return signAdminJwt(secret);
}

export async function verifyAdminJwt(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || !token) return false;
  return verifyAdminToken(token, secret);
}

export async function setAdminSessionCookie(token: string) {
  (await cookies()).set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 10,
  });
}

export async function clearAdminSessionCookie() {
  (await cookies()).delete(ADMIN_COOKIE_NAME);
}

export async function readAdminCookie(): Promise<string | undefined> {
  return (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
}

/** Redirige vers /admin/login si session invalide ou configuration absente. */
export async function requireAdminSession(): Promise<void> {
  if (!process.env.ADMIN_JWT_SECRET) redirect("/admin/login?err=config");
  const tok = await readAdminCookie();
  if (!(await verifyAdminJwt(tok ?? ""))) redirect("/admin/login");
}
