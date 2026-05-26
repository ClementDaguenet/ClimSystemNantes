import type { Page } from "@playwright/test";

/** Réinitialise le consentement cookies avant chaque scénario bandeau. */
export async function resetCookieConsent(page: Page) {
  await page.goto("/");
  await page.evaluate(() => localStorage.removeItem("clims_cookie_consent"));
  await page.reload({ waitUntil: "networkidle" });
}

/** Formulaire de contact (hors sidebar). */
export function contactForm(page: Page) {
  return page.locator("form").filter({
    has: page.getByRole("button", { name: /Envoyer ma demande/i }),
  });
}

/** Nav principale (header, pas footer). */
export function mainNav(page: Page) {
  return page.getByRole("navigation", { name: "Navigation principale" });
}
