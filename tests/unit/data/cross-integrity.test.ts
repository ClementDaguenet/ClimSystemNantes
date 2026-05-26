import { describe, it, expect } from "vitest";
import { brands } from "@/data/brands";
import { solutions } from "@/data/solutions";
import { navLinks } from "@/data/navigation";
import { atouts } from "@/data/atouts";
import { CONTENT_SEED_ROWS } from "@/lib/cms/contentSeed";

describe("Intégrité transverse des données statiques", () => {
  describe("solutions ↔ SEO / CMS", () => {
    it("chaque solution a une clé media correspondante dans le seed", () => {
      for (const s of solutions) {
        const mediaKey = `media.solutions.${s.slug}.image_url`;
        expect(
          CONTENT_SEED_ROWS.some((r) => r.key === mediaKey),
          `clé manquante: ${mediaKey}`,
        ).toBe(true);
      }
    });

    it("6 solutions avec slugs uniques", () => {
      const slugs = solutions.map((s) => s.slug);
      expect(new Set(slugs).size).toBe(6);
    });
  });

  describe("navigation", () => {
    it("pointe vers des routes publiques valides", () => {
      const hrefs = navLinks.map((l) => l.href);
      expect(hrefs).toContain("/");
      expect(hrefs).toContain("/solutions");
      expect(hrefs).toContain("/agences");
      expect(hrefs).toContain("/sav");
      expect(hrefs).toContain("/contact");
    });

    it("n'inclut pas de routes admin", () => {
      expect(navLinks.every((l) => !l.href.startsWith("/admin"))).toBe(true);
    });
  });

  describe("atouts", () => {
    it("contient au moins 4 atouts", () => {
      expect(atouts.length).toBeGreaterThanOrEqual(4);
    });

    it("chaque atout a titre et description", () => {
      expect(
        atouts.every((a) => a.title.trim() && a.description.trim()),
      ).toBe(true);
    });
  });

  describe("brands", () => {
    it("n'a pas de doublon de nom", () => {
      const names = brands.map((b) => b.name.toLowerCase());
      expect(new Set(names).size).toBe(names.length);
    });
  });
});
