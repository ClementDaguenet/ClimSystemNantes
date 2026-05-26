import { describe, it, expect } from "vitest";
import {
  ANALYTICS_PROVIDER,
  DATABASE_HOSTING,
  EMAIL_PROVIDER,
  HOSTING,
  LEGAL_ENTITY,
} from "@/lib/legal/company";

describe("lib/legal/company", () => {
  describe("LEGAL_ENTITY", () => {
    it("référence CLIMSYSTEM comme dénomination", () => {
      expect(LEGAL_ENTITY.denomination).toBe("CLIMSYSTEM");
    });

    it("contient un SIREN valide (9 chiffres)", () => {
      expect(LEGAL_ENTITY.siren.replace(/\s/g, "")).toMatch(/^\d{9}$/);
    });

    it("contient un SIRET siège cohérent avec le SIREN", () => {
      expect(LEGAL_ENTITY.siretSiege.replace(/\s/g, "")).toMatch(/^437990252\d{5}$/);
    });

    it("contient un numéro TVA FR", () => {
      expect(LEGAL_ENTITY.tva).toMatch(/^FR\d+/);
    });

    it("définit la forme juridique SAS", () => {
      expect(LEGAL_ENTITY.legalForm).toContain("SAS");
    });

    it("a un capital social positif", () => {
      expect(Number(LEGAL_ENTITY.capitalSocial.replace(/\s/g, ""))).toBeGreaterThan(
        0,
      );
    });

    it("localise le siège à Châtillon", () => {
      expect(LEGAL_ENTITY.headquarters).toContain("Châtillon");
    });
  });

  describe("sous-traitants documentés", () => {
    it("hébergeur = Vercel", () => {
      expect(HOSTING.name).toContain("Vercel");
    });

    it("base de données = Supabase", () => {
      expect(DATABASE_HOSTING.name).toContain("Supabase");
    });

    it("email = Resend", () => {
      expect(EMAIL_PROVIDER.name).toContain("Resend");
    });

    it("analytics = Google", () => {
      expect(ANALYTICS_PROVIDER.name).toContain("Google");
    });
  });
});
