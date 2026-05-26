import { test, expect } from "@playwright/test";
import { contactForm } from "./helpers";

test.describe("Page contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("affiche le formulaire avec tous les champs requis", async ({ page }) => {
    const form = contactForm(page);
    await expect(form.getByLabel(/Nom complet/i)).toBeVisible();
    await expect(form.getByLabel(/^Email/i)).toBeVisible();
    await expect(form.getByLabel(/Téléphone/i)).toBeVisible();
    await expect(form.getByLabel(/Sujet/i)).toBeVisible();
    await expect(form.getByLabel(/Votre message/i)).toBeVisible();
    await expect(form.getByRole("button", { name: /Envoyer/i })).toBeVisible();
  });

  test("affiche des erreurs de validation pour un envoi vide", async ({
    page,
  }) => {
    const form = contactForm(page);
    await form.getByRole("button", { name: /Envoyer/i }).click();
    await expect(form.getByText(/au moins 2 caractères|obligatoire/i).first()).toBeVisible({
      timeout: 5000,
    });
  });

  test("rejette un email invalide", async ({ page }) => {
    let apiCalled = false;
    await page.route("**/api/contact", async (route) => {
      apiCalled = true;
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ error: "Ne devrait pas être appelé" }),
      });
    });

    const form = contactForm(page);
    await expect(form.getByRole("button", { name: /Envoyer/i })).toBeVisible();
    await form.getByLabel(/Nom complet/i).fill("Jean Test");
    const email = form.getByLabel(/^Email/i);
    await email.fill("pas-un-email");
    await form.getByLabel(/Téléphone/i).fill("0612345678");
    await form.getByLabel(/Sujet/i).fill("Test");
    await form
      .getByLabel(/Votre message/i)
      .fill("Message de test assez long pour validation.");
    await form.getByRole("checkbox").check();
    await form.getByRole("button", { name: /Envoyer/i }).click();

    await expect(form.locator("#email-error")).toContainText(
      /Adresse email invalide/i,
      { timeout: 10_000 },
    );
    expect(apiCalled).toBe(false);
  });

  test("pré-remplit le sujet depuis ?sujet=SAV", async ({ page }) => {
    await page.goto("/contact?sujet=SAV", { waitUntil: "networkidle" });
    const form = contactForm(page);
    await expect(form.getByRole("button", { name: /Envoyer/i })).toBeVisible({
      timeout: 15_000,
    });
    await expect(form.getByLabel(/Sujet/i)).toHaveValue("SAV", {
      timeout: 15_000,
    });
  });

  test("lien vers la politique de confidentialité dans le consentement", async ({
    page,
  }) => {
    const form = contactForm(page);
    await expect(
      form.getByRole("link", { name: /politique de confidentialité/i }),
    ).toHaveAttribute("href", "/politique-confidentialite");
  });
});
