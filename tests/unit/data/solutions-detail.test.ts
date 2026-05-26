import { describe, it, expect } from "vitest";
import { solutions } from "@/data/solutions";

describe("data/solutions - détail", () => {
  it("contient exactement 6 catégories", () => {
    expect(solutions).toHaveLength(6);
  });

  it("id et slug sont identiques pour chaque catégorie", () => {
    expect(solutions.every((s) => s.id === s.slug)).toBe(true);
  });

  it("chaque catégorie a au moins 3 puces", () => {
    expect(solutions.every((s) => s.bullets.length >= 3)).toBe(true);
  });

  it("chaque catégorie a une icône définie", () => {
    expect(solutions.every((s) => s.icon != null)).toBe(true);
  });

  it("chaque catégorie a un alt image descriptif", () => {
    expect(solutions.every((s) => s.imageAlt.length > 20)).toBe(true);
  });

  const expectedSlugs = [
    "chauffage",
    "climatisation",
    "diffusion",
    "hygrometrie",
    "ventilation",
    "accessoires",
  ];

  for (const slug of expectedSlugs) {
    it(`inclut la catégorie ${slug}`, () => {
      expect(solutions.some((s) => s.slug === slug)).toBe(true);
    });
  }
});
