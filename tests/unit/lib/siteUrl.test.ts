import { describe, it, expect, vi } from "vitest";
import {
  DEFAULT_SITE_URL,
  getApexHost,
  getSiteHost,
  getSiteHostLabel,
  getSiteUrl,
  getWwwHost,
} from "@/lib/siteUrl";

describe("lib/siteUrl", () => {
  describe("getSiteUrl", () => {
    it("retourne l'URL par défaut sans variable d'environnement", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
      expect(getSiteUrl()).toBe(DEFAULT_SITE_URL);
    });

    it("normalise une URL avec trailing slash", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://climsystem.com/");
      expect(getSiteUrl()).toBe("https://climsystem.com");
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
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "  https://climsystem.com  ");
      expect(getSiteUrl()).toBe("https://climsystem.com");
    });
  });

  describe("getSiteHost", () => {
    it("extrait l'hôte apex par défaut", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
      expect(getSiteHost()).toBe("climsystem.com");
    });

    it("extrait le host d'un domaine custom", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://staging.example.io");
      expect(getSiteHost()).toBe("staging.example.io");
    });
  });

  describe("getApexHost", () => {
    it("retourne null si le canonique est déjà l'apex", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
      expect(getApexHost()).toBeNull();
    });

    it("retourne l'apex si l'URL canonique commence par www.", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.climsystem.com");
      expect(getApexHost()).toBe("climsystem.com");
    });
  });

  describe("getWwwHost", () => {
    it("préfixe www quand le canonique est l'apex", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
      expect(getWwwHost()).toBe("www.climsystem.com");
    });

    it("retourne le host tel quel s'il est déjà www", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.example.com");
      expect(getWwwHost()).toBe("www.example.com");
    });
  });

  describe("getSiteHostLabel", () => {
    it("retourne le même libellé que getSiteHost", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
      expect(getSiteHostLabel()).toBe(getSiteHost());
    });
  });

  describe("DEFAULT_SITE_URL", () => {
    it("utilise https sans sous-domaine www", () => {
      expect(DEFAULT_SITE_URL).toBe("https://climsystem.com");
    });
  });
});
