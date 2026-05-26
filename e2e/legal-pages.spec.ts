import { test, expect } from "@playwright/test";

test.describe("Pages légales", () => {
  test("mentions légales - SIREN CLIMSYSTEM", async ({ page }) => {
    await page.goto("/mentions-legales");
    await expect(page.getByRole("heading", { name: /Mentions légales/i })).toBeVisible();
    await expect(page.getByText(/SIREN\s*:/i)).toBeVisible();
    await expect(page.getByText(/437 990 252/).first()).toBeVisible();
    await expect(page.getByText(/Dénomination sociale/i)).toBeVisible();
    await expect(page.getByText(/CLIMSYSTEM/).first()).toBeVisible();
    await expect(page.getByText(/Vercel/).first()).toBeVisible();
  });

  test("politique confidentialité - formulaire et cookies", async ({ page }) => {
    await page.goto("/politique-confidentialite");
    await expect(page.getByText(/Formulaire de contact/i).first()).toBeVisible();
    await expect(page.getByText(/Google Analytics/i).first()).toBeVisible();
    await expect(page.getByText(/Resend/i).first()).toBeVisible();
  });

  test("pas de placeholder [à compléter]", async ({ page }) => {
    for (const path of ["/mentions-legales", "/politique-confidentialite"]) {
      await page.goto(path);
      await expect(page.getByText(/\[à compléter\]/i)).toHaveCount(0);
    }
  });
});
