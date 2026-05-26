import { describe, it, expect, vi, beforeEach } from "vitest";

type CookieJar = Map<string, string>;

function createCookieMock(jar: CookieJar) {
  return {
    get: (name: string) => {
      const value = jar.get(name);
      return value === undefined ? undefined : { name, value };
    },
    set: (name: string, value: string) => {
      jar.set(name, value);
    },
    delete: (name: string) => {
      jar.delete(name);
    },
  };
}

const jar: CookieJar = new Map();

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => createCookieMock(jar)),
}));

import {
  clearLoginRateLimit,
  isLoginRateLimited,
  recordFailedLoginAttempt,
} from "@/lib/admin/loginRateLimit";

describe("lib/admin/loginRateLimit", () => {
  beforeEach(() => {
    jar.clear();
  });

  it("n'est pas limité au départ", async () => {
    expect(await isLoginRateLimited()).toBe(false);
  });

  it("devient limité après 8 échecs", async () => {
    for (let i = 0; i < 8; i++) {
      await recordFailedLoginAttempt();
    }
    expect(await isLoginRateLimited()).toBe(true);
  });

  it("reste sous le seuil avec 7 échecs", async () => {
    for (let i = 0; i < 7; i++) {
      await recordFailedLoginAttempt();
    }
    expect(await isLoginRateLimited()).toBe(false);
  });

  it("réinitialise le compteur après clearLoginRateLimit", async () => {
    for (let i = 0; i < 8; i++) {
      await recordFailedLoginAttempt();
    }
    await clearLoginRateLimit();
    expect(await isLoginRateLimited()).toBe(false);
  });

  it("ignore un cookie JSON corrompu", async () => {
    jar.set("admin_login_rl", "{not-json");
    expect(await isLoginRateLimited()).toBe(false);
  });

  it("ignore un cookie avec structure invalide", async () => {
    jar.set("admin_login_rl", JSON.stringify({ n: "x", reset: "y" }));
    expect(await isLoginRateLimited()).toBe(false);
  });

  it("réinitialise si la fenêtre est expirée", async () => {
    jar.set(
      "admin_login_rl",
      JSON.stringify({ n: 8, reset: Date.now() - 1_000 }),
    );
    expect(await isLoginRateLimited()).toBe(false);
  });
});
