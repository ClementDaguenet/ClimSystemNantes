import { test, expect } from "@playwright/test";
import { mainNav } from "./helpers";

test.describe("Responsive accueil", () => {
  test("mobile - menu burger visible", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: /Ouvrir le menu/i });
    await expect(menuButton).toBeVisible();
  });

  test("mobile - pas de scroll horizontal", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth,
    );
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test("desktop - navbar links visibles sans burger", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(
      mainNav(page).getByRole("link", { name: "Solutions", exact: true }),
    ).toBeVisible();
  });
});
