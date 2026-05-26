import { describe, it, expect } from "vitest";
import { solutions } from "@/data/solutions";

const EXPECTED_SLUGS = [
  "chauffage",
  "climatisation",
  "diffusion",
  "hygrometrie",
  "ventilation",
  "accessoires",
];

describe("data/solutions", () => {
  it("définit 6 catégories de solutions", () => {
    expect(solutions).toHaveLength(6);
  });

  it("a des slugs uniques", () => {
    const slugs = solutions.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(6);
  });

  it("couvre toutes les familles métier attendues", () => {
    expect(solutions.map((s) => s.slug)).toEqual(EXPECTED_SLUGS);
  });

  it("id === slug pour chaque catégorie", () => {
    expect(solutions.every((s) => s.id === s.slug)).toBe(true);
  });

  it("chaque catégorie a au moins 3 bullets", () => {
    expect(solutions.every((s) => s.bullets.length >= 3)).toBe(true);
  });

  it("chaque catégorie a titre et description non vides", () => {
    expect(
      solutions.every(
        (s) =>
          s.title.trim().length > 0 &&
          s.description.trim().length > 0 &&
          s.tagline.trim().length > 0,
      ),
    ).toBe(true);
  });

  it("chaque catégorie a une icône Lucide", () => {
    expect(solutions.every((s) => s.icon != null)).toBe(true);
  });

  it("chaque catégorie a un imageAlt descriptif", () => {
    expect(solutions.every((s) => s.imageAlt.length > 10)).toBe(true);
  });

  it("Chauffage contient PAC dans les bullets", () => {
    const chauffage = solutions.find((s) => s.slug === "chauffage");
    expect(chauffage?.bullets.some((b) => b.includes("PAC"))).toBe(true);
  });
});
