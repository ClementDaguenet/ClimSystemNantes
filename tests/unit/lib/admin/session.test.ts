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

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

import {
  clearAdminSessionCookie,
  createAdminJwt,
  readAdminCookie,
  requireAdminSession,
  setAdminSessionCookie,
  verifyAdminJwt,
} from "@/lib/admin/session";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/constants";
import { redirect } from "next/navigation";

describe("lib/admin/session", () => {
  beforeEach(() => {
    jar.clear();
    vi.mocked(redirect).mockClear();
    vi.stubEnv("ADMIN_JWT_SECRET", "test-secret-at-least-32-characters-long");
  });

  describe("createAdminJwt / verifyAdminJwt", () => {
    it("signe et vérifie un token admin", async () => {
      const token = await createAdminJwt();
      expect(await verifyAdminJwt(token)).toBe(true);
    });

    it("rejette un token invalide", async () => {
      expect(await verifyAdminJwt("not.a.jwt")).toBe(false);
    });

    it("rejette un token signé avec un autre secret", async () => {
      const token = await createAdminJwt();
      vi.stubEnv("ADMIN_JWT_SECRET", "other-secret-at-least-32-characters-long");
      expect(await verifyAdminJwt(token)).toBe(false);
    });

    it("échoue sans ADMIN_JWT_SECRET pour createAdminJwt", async () => {
      vi.stubEnv("ADMIN_JWT_SECRET", "");
      await expect(createAdminJwt()).rejects.toThrow(/ADMIN_JWT_SECRET/);
    });
  });

  describe("cookies session", () => {
    it("pose et lit le cookie admin", async () => {
      const token = await createAdminJwt();
      await setAdminSessionCookie(token);
      expect(await readAdminCookie()).toBe(token);
    });

    it("supprime le cookie admin", async () => {
      await setAdminSessionCookie("token");
      await clearAdminSessionCookie();
      expect(await readAdminCookie()).toBeUndefined();
    });

    it("utilise le nom de cookie attendu", async () => {
      await setAdminSessionCookie("abc");
      expect(jar.has(ADMIN_COOKIE_NAME)).toBe(true);
    });
  });

  describe("requireAdminSession", () => {
    it("redirige si pas de secret configuré", async () => {
      vi.stubEnv("ADMIN_JWT_SECRET", "");
      await expect(requireAdminSession()).rejects.toThrow("REDIRECT:/admin/login?err=config");
    });

    it("redirige si cookie absent", async () => {
      await expect(requireAdminSession()).rejects.toThrow("REDIRECT:/admin/login");
    });

    it("ne redirige pas avec session valide", async () => {
      const token = await createAdminJwt();
      await setAdminSessionCookie(token);
      await requireAdminSession();
      expect(redirect).not.toHaveBeenCalled();
    });
  });
});
