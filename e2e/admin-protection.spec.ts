import { test, expect } from "@playwright/test";

test.describe("Protection admin", () => {
  test("redirige /admin vers login sans session", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("redirige /admin/agencies vers login", async ({ page }) => {
    await page.goto("/admin/agencies");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("page login accessible", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.getByRole("heading", { name: /Connexion/i })).toBeVisible();
    await expect(page.getByLabel(/mot de passe/i)).toBeVisible();
  });

  test("échec login avec mauvais mot de passe", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/mot de passe/i).fill("wrong-password-e2e-test");
    await page.getByRole("button", { name: /Se connecter/i }).click();
    await expect(page).toHaveURL(/err=auth/);
  });
});
