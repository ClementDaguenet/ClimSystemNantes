import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  CONTENT_DEFAULT_BY_KEY,
  CONTENT_SEED_ROWS,
  deriveContentPage,
  getContentGroupsInOrder,
  getContentPagesInOrder,
  getMediaContentGroupsInOrder,
  seedRowsForGroup,
} from "@/lib/cms/contentSeed";
import { HOME_CONTENT_KEYS } from "@/lib/cms/homeContentKeys";

describe("lib/cms/contentSeed", () => {
  describe("CONTENT_SEED_ROWS", () => {
    it("contient au moins 90 clés CMS", () => {
      expect(CONTENT_SEED_ROWS.length).toBeGreaterThanOrEqual(90);
    });

    it("a des clés uniques", () => {
      const keys = CONTENT_SEED_ROWS.map((r) => r.key);
      expect(new Set(keys).size).toBe(CONTENT_SEED_ROWS.length);
    });

    it("chaque entrée a key, label, group et value définis", () => {
      expect(
        CONTENT_SEED_ROWS.every(
          (r) => r.key && r.label && r.group && r.value !== undefined,
        ),
      ).toBe(true);
    });

    it("inclut la clé hero.badge", () => {
      expect(CONTENT_DEFAULT_BY_KEY["hero.badge"]).toBeTruthy();
    });

    it("inclut media.og.image_url", () => {
      expect(CONTENT_SEED_ROWS.some((r) => r.key === "media.og.image_url")).toBe(
        true,
      );
    });

    it("toutes les clés image_url se terminent par .image_url", () => {
      const imageUrlKeys = CONTENT_SEED_ROWS.filter((r) =>
        r.key.endsWith(".image_url"),
      ).map((r) => r.key);
      expect(imageUrlKeys.length).toBeGreaterThan(0);
      expect(imageUrlKeys.every((k) => k.endsWith(".image_url"))).toBe(true);
    });

    it("toutes les clés image_alt se terminent par .image_alt", () => {
      const imageAltKeys = CONTENT_SEED_ROWS.filter((r) =>
        r.key.endsWith(".image_alt"),
      ).map((r) => r.key);
      expect(imageAltKeys.length).toBeGreaterThan(0);
      expect(imageAltKeys.every((k) => k.endsWith(".image_alt"))).toBe(true);
    });
  });

  describe("getContentGroupsInOrder", () => {
    it("retourne des groupes sans doublon", () => {
      const groups = getContentGroupsInOrder();
      expect(new Set(groups).size).toBe(groups.length);
    });

    it("contient Accueil - Hero", () => {
      expect(getContentGroupsInOrder()).toContain("Accueil - Hero");
    });
  });

  describe("deriveContentPage", () => {
    it("mappe Accueil vers id accueil", () => {
      const page = deriveContentPage("Accueil - Hero");
      expect(page.id).toBe("accueil");
      expect(page.title.toLowerCase()).toContain("accueil");
    });

    it("mappe Page Contact", () => {
      expect(deriveContentPage("Page Contact")).toEqual({
        id: "contact",
        title: "Contact",
      });
    });

    it("mappe Site global", () => {
      expect(deriveContentPage("Site - Médias & partage (SEO)")).toEqual({
        id: "site",
        title: "Site (global)",
      });
    });

    it("fallback autres pour groupe inconnu", () => {
      expect(deriveContentPage("Groupe inconnu")).toEqual({
        id: "autres",
        title: "Autres",
      });
    });
  });

  describe("getContentPagesInOrder", () => {
    it("retourne au moins 5 pages admin", () => {
      expect(getContentPagesInOrder().length).toBeGreaterThanOrEqual(5);
    });

    it("chaque page a au moins un groupe", () => {
      expect(getContentPagesInOrder().every((p) => p.groups.length > 0)).toBe(
        true,
      );
    });

    it("respecte l'ordre site → accueil → solutions", () => {
      const ids = getContentPagesInOrder().map((p) => p.id);
      expect(ids.indexOf("site")).toBeLessThan(ids.indexOf("accueil"));
      expect(ids.indexOf("accueil")).toBeLessThan(ids.indexOf("solutions"));
    });
  });

  describe("getMediaContentGroupsInOrder", () => {
    it("ne retourne que des groupes avec clés media.*", () => {
      const mediaGroups = getMediaContentGroupsInOrder();
      for (const g of mediaGroups) {
        const hasMedia = CONTENT_SEED_ROWS.some(
          (r) => r.group === g && r.key.startsWith("media."),
        );
        expect(hasMedia).toBe(true);
      }
    });
  });

  describe("seedRowsForGroup", () => {
    it("filtre par nom de groupe exact", () => {
      const rows = seedRowsForGroup("Accueil - Hero");
      expect(rows.length).toBeGreaterThan(0);
      expect(rows.every((r) => r.group === "Accueil - Hero")).toBe(true);
    });
  });
});

describe("lib/cms/homeContentKeys", () => {
  it("référence des clés existantes dans le seed", () => {
    for (const key of HOME_CONTENT_KEYS) {
      expect(CONTENT_DEFAULT_BY_KEY[key]).toBeDefined();
    }
  });

  it("inclut les clés hero et media", () => {
    expect(HOME_CONTENT_KEYS).toContain("hero.badge");
    expect(HOME_CONTENT_KEYS).toContain("media.hero.image_url");
  });

  it("a au moins 35 clés pour la page d'accueil", () => {
    expect(HOME_CONTENT_KEYS.length).toBeGreaterThanOrEqual(35);
  });
});

describe("content/site seed JSON (via CONTENT defaults)", () => {
  it("contient des textes pour toutes les pages métier", () => {
    const pageIds = getContentPagesInOrder().map((p) => p.id);
    expect(pageIds).toContain("accueil");
    expect(pageIds).toContain("solutions");
    expect(pageIds).toContain("contact");
    expect(pageIds).toContain("agences");
    expect(pageIds).toContain("sav");
  });
});
