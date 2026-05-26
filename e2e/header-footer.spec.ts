import { test, expect } from "@playwright/test";
import { mainNav } from "./helpers";

test.describe("Header & Footer", () => {
  test("logo renvoie à l'accueil", async ({ page }) => {
    await page.goto("/solutions");
    await mainNav(page)
      .getByRole("link", { name: /retour à l'accueil/i })
      .click();
    await expect(page).toHaveURL("/");
  });

  test("footer - copyright Climsystem", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText(/© \d{4} Climsystem Distribution Atlantique/i),
    ).toBeVisible();
  });

  test("footer - email de contact", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("footer").getByRole("link", { name: /contact44@climsystem.com/i }),
    ).toBeVisible();
  });

  test("footer - liens solutions avec ancres", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: /Chauffage/i })).toHaveAttribute(
      "href",
      "/solutions#chauffage",
    );
    await expect(footer.getByRole("link", { name: /Climatisation/i })).toHaveAttribute(
      "href",
      "/solutions#climatisation",
    );
  });

  test("footer - liste des 4 agences", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    for (const city of ["Les Sorinières", "Châtillon", "Chambray", "Aubagne"]) {
      await expect(footer.getByText(new RegExp(city, "i")).first()).toBeVisible();
    }
  });
});
