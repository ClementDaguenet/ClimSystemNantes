import { test, expect } from "@playwright/test";
import { resetCookieConsent } from "./helpers";

test.describe("Bandeau cookies", () => {
  test.beforeEach(async ({ page }) => {
    await resetCookieConsent(page);
  });

  test("s'affiche à la première visite", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByText(/Cookies et mesure d'audience/i)).toBeVisible({
      timeout: 20_000,
    });
  });

  test("disparaît après refus", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Refuser" }).click();
    await expect(page.getByText(/Cookies et mesure d'audience/i)).toBeHidden();
    await expect
      .poll(async () =>
        page.evaluate(() => localStorage.getItem("clims_cookie_consent")),
      )
      .toBe("rejected");
  });

  test("disparaît après acceptation", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Accepter" }).click();
    await expect(page.getByText(/Cookies et mesure d'audience/i)).toBeHidden();
    await expect
      .poll(async () =>
        page.evaluate(() => localStorage.getItem("clims_cookie_consent")),
      )
      .toBe("accepted");
  });

  test("ne réapparaît pas après choix enregistré", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Refuser" }).click();
    await expect
      .poll(async () =>
        page.evaluate(() => localStorage.getItem("clims_cookie_consent")),
      )
      .toBe("rejected");
    await page.reload({ waitUntil: "networkidle" });
    await expect(page.getByText(/Cookies et mesure d'audience/i)).toBeHidden();
  });
});
