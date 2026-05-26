import { test, expect } from "@playwright/test";

test.describe("Fichiers SEO", () => {
  test("robots.txt disallow admin", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain("Disallow: /admin");
    expect(body).toContain("Sitemap:");
  });

  test("sitemap.xml liste les pages publiques", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain("/contact");
    expect(body).toContain("/solutions");
    expect(body).not.toContain("/admin");
  });

  test("manifest web app accessible", async ({ request }) => {
    const res = await request.get("/manifest.webmanifest");
    expect(res.ok()).toBeTruthy();
  });
});
