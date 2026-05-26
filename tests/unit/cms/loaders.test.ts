import { describe, it, expect, vi, beforeEach } from "vitest";

const { agencyFindMany, siteSettingsFindUnique } = vi.hoisted(() => ({
  agencyFindMany: vi.fn(),
  siteSettingsFindUnique: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    agency: { findMany: agencyFindMany },
    siteSettings: { findUnique: siteSettingsFindUnique },
  },
}));

import {
  getAgencies,
  getFeaturedAgency,
  getFooterContent,
  getSavContent,
} from "@/lib/cms/loaders";

const agencyRow = {
  id: "nantes",
  name: "Climsystem Distribution Atlantique",
  city: "Les Sorinières",
  address: "1 rue Test",
  postalCode: "44840",
  phone: "02 59 16 58 37",
  email: "contact44@climsystem.com",
  hours: "Lun-Ven 8h-18h",
  latitude: 47.14,
  longitude: -1.49,
  isFeatured: true,
  tagline: "Nantes",
  sortOrder: 0,
};

describe("lib/cms/loaders", () => {
  beforeEach(() => {
    agencyFindMany.mockReset();
    siteSettingsFindUnique.mockReset();
  });

  describe("getAgencies", () => {
    it("mappe les lignes Prisma vers le type Agency", async () => {
      agencyFindMany.mockResolvedValue([agencyRow]);
      const agencies = await getAgencies();
      expect(agencies).toHaveLength(1);
      expect(agencies[0]).toMatchObject({
        id: "nantes",
        city: "Les Sorinières",
        coords: [47.14, -1.49],
        isFeatured: true,
        tagline: "Nantes",
      });
    });

    it("omet isFeatured si false", async () => {
      agencyFindMany.mockResolvedValue([{ ...agencyRow, isFeatured: false }]);
      const agencies = await getAgencies();
      expect(agencies[0].isFeatured).toBeUndefined();
    });

    it("trie par sortOrder ascendant", async () => {
      agencyFindMany.mockResolvedValue([]);
      await getAgencies();
      expect(agencyFindMany).toHaveBeenCalledWith({ orderBy: { sortOrder: "asc" } });
    });
  });

  describe("getFeaturedAgency", () => {
    it("retourne l'agence featured", async () => {
      agencyFindMany.mockResolvedValue([
        { ...agencyRow, isFeatured: false, id: "other" },
        agencyRow,
      ]);
      const featured = await getFeaturedAgency();
      expect(featured.id).toBe("nantes");
      expect(featured.isFeatured).toBe(true);
    });

    it("retourne la première agence si aucune featured", async () => {
      agencyFindMany.mockResolvedValue([
        { ...agencyRow, isFeatured: false, id: "first" },
        { ...agencyRow, isFeatured: false, id: "second" },
      ]);
      const featured = await getFeaturedAgency();
      expect(featured.id).toBe("first");
    });

    it("lève une erreur explicite si aucune agence", async () => {
      agencyFindMany.mockResolvedValue([]);
      await expect(getFeaturedAgency()).rejects.toThrow(/Aucune agence/);
    });
  });

  describe("getFooterContent", () => {
    it("retourne l'intro footer", async () => {
      siteSettingsFindUnique.mockResolvedValue({
        id: 1,
        footerIntro: "Intro footer test",
      });
      await expect(getFooterContent()).resolves.toEqual({
        intro: "Intro footer test",
      });
    });

    it("lève une erreur si paramètres absents", async () => {
      siteSettingsFindUnique.mockResolvedValue(null);
      await expect(getFooterContent()).rejects.toThrow(/Paramètres site/);
    });
  });

  describe("getSavContent", () => {
    it("retourne flyer image et champs optionnels", async () => {
      siteSettingsFindUnique.mockResolvedValue({
        id: 1,
        savFlyerImage: "/flyer.jpg",
        savFlyerPdf: "/flyer.pdf",
        savImageAlt: "Flyer SAV",
      });
      await expect(getSavContent()).resolves.toEqual({
        flyerImage: "/flyer.jpg",
        flyerPdf: "/flyer.pdf",
        imageAlt: "Flyer SAV",
      });
    });

    it("omet pdf et alt si absents", async () => {
      siteSettingsFindUnique.mockResolvedValue({
        id: 1,
        savFlyerImage: "/flyer.jpg",
        savFlyerPdf: null,
        savImageAlt: null,
      });
      await expect(getSavContent()).resolves.toEqual({
        flyerImage: "/flyer.jpg",
      });
    });
  });
});
