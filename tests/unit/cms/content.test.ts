import { describe, it, expect, vi, beforeEach } from "vitest";
import { CONTENT_DEFAULT_BY_KEY } from "@/lib/cms/contentSeed";

const { findMany } = vi.hoisted(() => ({
  findMany: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    contentBlock: {
      findMany,
    },
  },
}));

import { getContents } from "@/lib/cms/content";

describe("lib/cms/content", () => {
  beforeEach(() => {
    findMany.mockReset();
  });

  it("retourne un objet vide pour une liste vide", async () => {
    expect(await getContents([])).toEqual({});
    expect(findMany).not.toHaveBeenCalled();
  });

  it("utilise les valeurs par défaut du seed si absentes en base", async () => {
    findMany.mockResolvedValue([]);
    const result = await getContents(["hero.badge"]);
    expect(result["hero.badge"]).toBe(CONTENT_DEFAULT_BY_KEY["hero.badge"]);
  });

  it("priorise la valeur en base sur le seed", async () => {
    findMany.mockResolvedValue([{ key: "hero.badge", value: "Custom badge" }]);
    const result = await getContents(["hero.badge"]);
    expect(result["hero.badge"]).toBe("Custom badge");
  });

  it("déduplique les clés demandées", async () => {
    findMany.mockResolvedValue([]);
    await getContents(["hero.badge", "hero.badge", "hero.badge"]);
    expect(findMany).toHaveBeenCalledWith({
      where: { key: { in: ["hero.badge"] } },
    });
  });

  it("ignore les clés vides dans la requête", async () => {
    findMany.mockResolvedValue([]);
    await getContents(["hero.badge", ""]);
    expect(findMany).toHaveBeenCalledWith({
      where: { key: { in: ["hero.badge"] } },
    });
  });

  it("retourne une chaîne vide si clé inconnue", async () => {
    findMany.mockResolvedValue([]);
    const result = await getContents(["unknown.key"]);
    expect(result["unknown.key"]).toBe("");
  });

  it("résout plusieurs clés en une requête", async () => {
    findMany.mockResolvedValue([
      { key: "hero.badge", value: "A" },
      { key: "hero.title", value: "B" },
    ]);
    const result = await getContents(["hero.badge", "hero.title", "hero.subtitle"]);
    expect(result).toEqual({
      "hero.badge": "A",
      "hero.title": "B",
      "hero.subtitle": CONTENT_DEFAULT_BY_KEY["hero.subtitle"] ?? "",
    });
  });
});
