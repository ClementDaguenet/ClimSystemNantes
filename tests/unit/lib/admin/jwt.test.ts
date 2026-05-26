import { describe, it, expect } from "vitest";
import { signAdminJwt, verifyAdminToken } from "@/lib/admin/jwt";

const SECRET = "test-jwt-secret-minimum-32-characters-long";

describe("lib/admin/jwt", () => {
  describe("signAdminJwt", () => {
    it("produit un token JWT non vide", async () => {
      const token = await signAdminJwt(SECRET);
      expect(token).toBeTruthy();
      expect(token.split(".")).toHaveLength(3);
    });

    it("produit un JWT décodable avec role admin", async () => {
      const token = await signAdminJwt(SECRET);
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64url").toString("utf8"),
      );
      expect(payload.role).toBe("admin");
    });
  });

  describe("verifyAdminToken", () => {
    it("valide un token signé avec le bon secret", async () => {
      const token = await signAdminJwt(SECRET);
      expect(await verifyAdminToken(token, SECRET)).toBe(true);
    });

    it("rejette un token avec un mauvais secret", async () => {
      const token = await signAdminJwt(SECRET);
      expect(await verifyAdminToken(token, "wrong-secret")).toBe(false);
    });

    it("rejette une chaîne vide", async () => {
      expect(await verifyAdminToken("", SECRET)).toBe(false);
    });

    it("rejette un secret vide", async () => {
      const token = await signAdminJwt(SECRET);
      expect(await verifyAdminToken(token, "")).toBe(false);
    });

    it("rejette un token malformé", async () => {
      expect(await verifyAdminToken("not.a.jwt", SECRET)).toBe(false);
    });

    it("rejette un token tronqué", async () => {
      const token = await signAdminJwt(SECRET);
      expect(await verifyAdminToken(token.slice(0, -5), SECRET)).toBe(false);
    });
  });
});
