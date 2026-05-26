import { describe, it, expect } from "vitest";
import { atouts } from "@/data/atouts";

describe("data/atouts", () => {
  it("définit 5 atouts", () => {
    expect(atouts).toHaveLength(5);
  });

  it("a des ids uniques", () => {
    const ids = atouts.map((a) => a.id);
    expect(new Set(ids).size).toBe(5);
  });

  it("chaque atout a titre, description et icône", () => {
    expect(
      atouts.every(
        (a) =>
          a.title.trim().length > 0 &&
          a.description.trim().length > 0 &&
          a.icon != null,
      ),
    ).toBe(true);
  });

  it("inclut devis sous 24/48h", () => {
    expect(atouts.some((a) => a.id === "devis-24-48h")).toBe(true);
  });
});
