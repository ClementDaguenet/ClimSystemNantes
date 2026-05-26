import { test, expect } from "@playwright/test";

test.describe("Accessibilité de base", () => {
  const publicPages = [
    "/",
    "/solutions",
    "/agences",
    "/sav",
    "/contact",
    "/mentions-legales",
    "/politique-confidentialite",
  ];

  for (const path of publicPages) {
    test(`${path} - un seul h1`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
    });

    test(`${path} - lien skip-to-content`, async ({ page }) => {
      await page.goto(path);
      await expect(
        page.getByRole("link", { name: /contenu principal/i }),
      ).toBeVisible();
    });

    test(`${path} - html lang=fr`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    });
  }

  test("contact - champs obligatoires marqués", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText(/Tous les champs sont obligatoires/i)).toBeVisible();
  });

  test("images décoratives avec alt ou aria-hidden", async ({ page }) => {
    await page.goto("/");
    const imgs = page.locator("img");
    const count = await imgs.count();
    for (let i = 0; i < Math.min(count, 15); i++) {
      const img = imgs.nth(i);
      const alt = await img.getAttribute("alt");
      const ariaHidden = await img.getAttribute("aria-hidden");
      expect(alt !== null || ariaHidden === "true").toBe(true);
    }
  });
});
