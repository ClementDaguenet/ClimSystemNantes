import { SignJWT, jwtVerify } from "jose";

export async function signAdminJwt(secret: string): Promise<string> {
  const key = new TextEncoder().encode(secret);
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("10h")
    .sign(key);
}

export async function verifyAdminToken(token: string, secret: string): Promise<boolean> {
  if (!token || !secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}
