import { describe, it, expect } from "vitest";
import { brands } from "@/data/brands";

describe("data/brands", () => {
  it("contient exactement 33 marques", () => {
    expect(brands).toHaveLength(33);
  });

  it("a des ids uniques", () => {
    const ids = brands.map((b) => b.id);
    expect(new Set(ids).size).toBe(brands.length);
  });

  it("a des noms non vides", () => {
    expect(brands.every((b) => b.name.trim().length > 0)).toBe(true);
  });

  it("utilise des ids kebab-case sans espaces", () => {
    expect(brands.every((b) => /^[a-z0-9-]+$/.test(b.id))).toBe(true);
  });

  it("inclut les marques majeures HVAC", () => {
    const ids = brands.map((b) => b.id);
    expect(ids).toContain("daikin");
    expect(ids).toContain("mitsubishi");
    expect(ids).toContain("atlantic");
    expect(ids).toContain("carrier");
  });

  it("inclut Daikin avec le bon libellé", () => {
    const daikin = brands.find((b) => b.id === "daikin");
    expect(daikin?.name).toBe("Daikin");
  });
});
