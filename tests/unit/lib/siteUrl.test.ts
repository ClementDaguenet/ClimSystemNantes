import { describe, it, expect, vi } from "vitest";
import {
  DEFAULT_SITE_URL,
  getApexHost,
  getSiteHost,
  getSiteHostLabel,
  getSiteUrl,
} from "@/lib/siteUrl";

describe("lib/siteUrl", () => {
  describe("getSiteUrl", () => {
    it("retourne l'URL par défaut sans variable d'environnement", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
      expect(getSiteUrl()).toBe(DEFAULT_SITE_URL);
    });

    it("normalise une URL avec trailing slash", () => {
      vi.stubEnv(
        "NEXT_PUBLIC_SITE_URL",
        "https://www.climsystem-distribution-atlantique.fr/",
      );
      expect(getSiteUrl()).toBe(
        "https://www.climsystem-distribution-atlantique.fr",
      );
    });

    it("accepte une URL avec chemin et retourne l'origine", () => {
      vi.stubEnv(
        "NEXT_PUBLIC_SITE_URL",
        "https://www.example.com/foo/bar",
      );
      expect(getSiteUrl()).toBe("https://www.example.com");
    });

    it("retombe sur la valeur par défaut si URL invalide", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "pas-une-url");
      expect(getSiteUrl()).toBe(DEFAULT_SITE_URL);
    });

    it("trim les espaces autour de l'URL", () => {
      vi.stubEnv(
        "NEXT_PUBLIC_SITE_URL",
        "  https://www.climsystem-distribution-atlantique.fr  ",
      );
      expect(getSiteUrl()).toBe(
        "https://www.climsystem-distribution-atlantique.fr",
      );
    });
  });

  describe("getSiteHost", () => {
    it("extrait le host www", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
      expect(getSiteHost()).toBe("www.climsystem-distribution-atlantique.fr");
    });

    it("extrait le host d'un domaine custom", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://staging.example.io");
      expect(getSiteHost()).toBe("staging.example.io");
    });
  });

  describe("getApexHost", () => {
    it("retourne l'apex sans www pour le domaine canonique", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
      expect(getApexHost()).toBe("climsystem-distribution-atlantique.fr");
    });

    it("retourne null si le host ne commence pas par www.", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com");
      expect(getApexHost()).toBeNull();
    });
  });

  describe("getSiteHostLabel", () => {
    it("retourne le même libellé que getSiteHost", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
      expect(getSiteHostLabel()).toBe(getSiteHost());
    });
  });

  describe("DEFAULT_SITE_URL", () => {
    it("utilise https et le sous-domaine www", () => {
      expect(DEFAULT_SITE_URL).toMatch(/^https:\/\/www\./);
    });
  });
});
