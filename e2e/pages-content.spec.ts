import { test, expect } from "@playwright/test";
import { mainNav } from "./helpers";

test.describe("Page solutions", () => {
  test("affiche les 6 catégories", async ({ page }) => {
    await page.goto("/solutions");
    for (const title of [
      "Chauffage",
      "Climatisation",
      "Diffusion",
      "Hygrométrie",
      "Ventilation",
      "Accessoires",
    ]) {
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
    }
  });

  test("ancre #chauffage scroll vers la section", async ({ page }) => {
    await page.goto("/solutions#chauffage");
    const section = page.locator("#chauffage");
    await expect(section).toBeInViewport();
  });
});

test.describe("Page agences", () => {
  test("affiche les fiches agences", async ({ page }) => {
    await page.goto("/agences");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByText(/Les Sorinières|Châtillon|Tours|Aubagne/i).first()).toBeVisible();
  });
});

test.describe("Page SAV", () => {
  test("lien contact SAV pré-rempli", async ({ page }) => {
    await page.goto("/sav");
    await expect(page.locator('a[href="/contact?sujet=SAV"]')).toBeVisible();
  });
});
