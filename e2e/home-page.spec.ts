import { test, expect } from "@playwright/test";
import { mainNav } from "./helpers";

test.describe("Page d'accueil", () => {
  test("affiche le hero et le titre principal", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("affiche la section solutions", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Solutions/i }).first()).toBeVisible();
  });

  test("affiche la section marques partenaires", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("region", { name: /Carrousel des marques partenaires/i }),
    ).toBeVisible();
    await expect(page.locator('img[alt*="Daikin"]').first()).toBeVisible();
  });

  test("CTA contact accessible depuis le header", async ({ page }) => {
    await page.goto("/");
    await expect(
      mainNav(page).getByRole("link", { name: "Contact", exact: true }),
    ).toBeVisible();
  });

  test("meta title contient Climsystem", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Climsystem/i);
  });
});
