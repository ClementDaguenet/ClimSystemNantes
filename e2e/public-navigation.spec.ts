import { test, expect } from "@playwright/test";
import { mainNav } from "./helpers";

const PUBLIC_PAGES = [
  { path: "/", titlePattern: /Climsystem|génie climatique/i },
  { path: "/solutions", titlePattern: /Solutions/i },
  { path: "/agences", titlePattern: /Agences/i },
  { path: "/sav", titlePattern: /SAV|après-vente/i },
  { path: "/contact", titlePattern: /Contact/i },
  { path: "/mentions-legales", titlePattern: /Mentions légales/i },
  { path: "/politique-confidentialite", titlePattern: /confidentialité|RGPD/i },
];

test.describe("Navigation publique", () => {
  for (const { path, titlePattern } of PUBLIC_PAGES) {
    test(`charge ${path} avec un titre pertinent`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBeLessThan(400);
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page).toHaveTitle(titlePattern);
    });
  }

  test("navbar contient les 5 liens principaux", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const nav = mainNav(page);
    for (const label of [
      "Accueil",
      "Solutions",
      "Agences",
      "SAV",
      "Contact",
    ]) {
      await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
  });

  test("footer contient les liens légaux", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Mentions légales/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Politique de confidentialité/i }),
    ).toBeVisible();
  });

  test("skip link vers le contenu principal", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /Aller au contenu/i });
    await expect(skip).toBeFocused();
  });
});
