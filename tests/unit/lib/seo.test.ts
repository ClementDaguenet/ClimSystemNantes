import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  SITE_NAME,
  buildBreadcrumbSchema,
  buildLocalBusinessSchemas,
  buildOrganizationSchema,
  websiteSchema,
} from "@/lib/seo";
import { allAgenciesFixture, agencyNantes } from "../../fixtures/agencies";

describe("lib/seo", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  });

  describe("buildOrganizationSchema", () => {
    it("produit un schéma Organization valide", () => {
      const schema = buildOrganizationSchema(allAgenciesFixture, agencyNantes);
      expect(schema["@type"]).toBe("Organization");
      expect(schema.name).toBe(SITE_NAME);
      expect(schema.knowsAbout).toHaveLength(6);
    });

    it("inclut le point de contact de l'agence featured", () => {
      const schema = buildOrganizationSchema(allAgenciesFixture, agencyNantes);
      expect(schema.contactPoint.email).toBe(agencyNantes.email);
      expect(schema.contactPoint.telephone).toBe(agencyNantes.phone);
    });

    it("liste toutes les agences en location", () => {
      const schema = buildOrganizationSchema(allAgenciesFixture, agencyNantes);
      expect(schema.location).toHaveLength(4);
    });

    it("référence l'URL canonique du site", () => {
      const schema = buildOrganizationSchema(allAgenciesFixture, agencyNantes);
      expect(schema.url).toContain("climsystem.com");
    });

    it("inclut logo et image absolus", () => {
      const schema = buildOrganizationSchema(allAgenciesFixture, agencyNantes);
      expect(schema.logo).toContain("/logo.png");
      expect(schema.image).toBe(schema.logo);
    });

    it("contient l'adresse postale featured", () => {
      const schema = buildOrganizationSchema(allAgenciesFixture, agencyNantes);
      expect(schema.address.postalCode).toBe("44840");
      expect(schema.address.addressLocality).toBe("Les Sorinières");
    });
  });

  describe("buildLocalBusinessSchemas", () => {
    it("génère un LocalBusiness par agence", () => {
      const schemas = buildLocalBusinessSchemas(allAgenciesFixture);
      expect(schemas).toHaveLength(4);
      expect(schemas.every((s) => s["@type"] === "LocalBusiness")).toBe(true);
    });

    it("assigne un @id unique par agence", () => {
      const schemas = buildLocalBusinessSchemas(allAgenciesFixture);
      const ids = schemas.map((s) => s["@id"]);
      expect(new Set(ids).size).toBe(4);
      expect(ids[0]).toContain("#nantes");
    });

    it("inclut les coordonnées GPS", () => {
      const schemas = buildLocalBusinessSchemas([agencyNantes]);
      expect(schemas[0].geo.latitude).toBe(47.148);
      expect(schemas[0].geo.longitude).toBe(-1.743);
    });

    it("définit les horaires d'ouverture lun-ven", () => {
      const schemas = buildLocalBusinessSchemas([agencyNantes]);
      expect(schemas[0].openingHoursSpecification).toHaveLength(2);
    });
  });

  describe("websiteSchema", () => {
    it("produit un schéma WebSite", () => {
      const schema = websiteSchema();
      expect(schema["@type"]).toBe("WebSite");
      expect(schema.inLanguage).toBe("fr-FR");
    });

    it("référence l'organisation éditrice", () => {
      const schema = websiteSchema();
      expect(schema.publisher["@id"]).toContain("#organization");
    });
  });

  describe("buildBreadcrumbSchema", () => {
    it("numérote les éléments de fil d'Ariane", () => {
      const schema = buildBreadcrumbSchema([
        { name: "Accueil", url: "/" },
        { name: "Contact", url: "/contact" },
      ]);
      expect(schema.itemListElement).toHaveLength(2);
      expect(schema.itemListElement[0].position).toBe(1);
      expect(schema.itemListElement[1].position).toBe(2);
    });

    it("préfixe les URLs avec le site canonique", () => {
      const schema = buildBreadcrumbSchema([
        { name: "Solutions", url: "/solutions" },
      ]);
      expect(schema.itemListElement[0].item).toMatch(
        /^https:\/\/climsystem\.com\/solutions$/,
      );
    });
  });
});
