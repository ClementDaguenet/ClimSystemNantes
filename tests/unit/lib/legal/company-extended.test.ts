import { describe, it, expect } from "vitest";
import {
  ANALYTICS_PROVIDER,
  DATABASE_HOSTING,
  EMAIL_PROVIDER,
  HOSTING,
  LEGAL_ENTITY,
} from "@/lib/legal/company";

describe("lib/legal/company - conformité", () => {
  describe("LEGAL_ENTITY", () => {
    it("contient un SIREN formaté", () => {
      expect(LEGAL_ENTITY.siren).toMatch(/^\d{3} \d{3} \d{3}$/);
    });

    it("contient un SIRET siège", () => {
      expect(LEGAL_ENTITY.siretSiege).toMatch(/^437 990 252 \d{5}$/);
    });

    it("contient une forme juridique SAS", () => {
      expect(LEGAL_ENTITY.legalForm).toMatch(/SAS/i);
    });

    it("a une dénomination CLIMSYSTEM", () => {
      expect(LEGAL_ENTITY.denomination).toBe("CLIMSYSTEM");
    });

    it("a un capital social numérique", () => {
      expect(LEGAL_ENTITY.capitalSocial).toMatch(/^\d/);
    });
  });

  describe("prestataires", () => {
    it("hébergeur web = Vercel", () => {
      expect(HOSTING.name).toMatch(/Vercel/);
      expect(HOSTING.website).toContain("vercel.com");
    });

    it("base de données = Supabase", () => {
      expect(DATABASE_HOSTING.name).toMatch(/Supabase/);
    });

    it("email = Resend", () => {
      expect(EMAIL_PROVIDER.name).toMatch(/Resend/);
    });

    it("analytics = Google Analytics", () => {
      expect(ANALYTICS_PROVIDER.name).toMatch(/Google Analytics/);
    });
  });
});
