import { describe, it, expect, vi } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("app/sitemap", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  });

  it("liste 7 routes publiques", () => {
    expect(sitemap()).toHaveLength(7);
  });

  it("priorité maximale pour l'accueil", () => {
    const home = sitemap().find((e) => e.priority === 1);
    expect(home?.priority).toBe(1);
  });

  it("n'inclut pas /admin", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => u.includes("/admin"))).toBe(false);
  });

  it("utilise l'URL canonique https", () => {
    expect(sitemap().every((e) => e.url.startsWith("https://climsystem.com"))).toBe(
      true,
    );
  });

  it("inclut contact et pages légales", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/contact"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/mentions-legales"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/politique-confidentialite"))).toBe(
      true,
    );
  });
});

describe("app/robots", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  });

  it("autorise tout le site public", () => {
    const config = robots();
    expect(config.rules?.[0]?.allow).toBe("/");
  });

  it("interdit /admin", () => {
    const config = robots();
    const disallow = config.rules?.[0]?.disallow;
    expect(disallow).toContain("/admin");
  });

  it("référence le sitemap", () => {
    expect(robots().sitemap).toContain("/sitemap.xml");
  });
});
