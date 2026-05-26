import { describe, it, expect } from "vitest";
import { navLinks } from "@/data/navigation";

describe("data/navigation", () => {
  it("définit 5 liens principaux", () => {
    expect(navLinks).toHaveLength(5);
  });

  it("commence par Accueil", () => {
    expect(navLinks[0]).toEqual({ href: "/", label: "Accueil" });
  });

  it("termine par Contact", () => {
    expect(navLinks.at(-1)?.href).toBe("/contact");
  });

  it("a des href uniques", () => {
    const hrefs = navLinks.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(navLinks.length);
  });

  it("inclut Solutions, Agences et SAV", () => {
    const hrefs = navLinks.map((l) => l.href);
    expect(hrefs).toContain("/solutions");
    expect(hrefs).toContain("/agences");
    expect(hrefs).toContain("/sav");
  });
});
