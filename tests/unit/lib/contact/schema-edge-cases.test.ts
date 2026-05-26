import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/contact/schema";
import { validContactPayload } from "../../../fixtures/contact";

describe("lib/contact/schema - cas limites", () => {
  const emailsInvalides = [
    "",
    "   ",
    "sans-arobase",
    "@domaine.fr",
    "user@",
    "user@domaine",
    "user@@domaine.fr",
    "user@domaine..fr",
    ".user@domaine.fr",
  ];

  for (const email of emailsInvalides) {
    it(`rejette l'email « ${email || "(vide)"} »`, () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        email,
      });
      expect(result.success).toBe(false);
    });
  }

  const emailsValides = [
    "a@b.co",
    "jean.dupont@entreprise.fr",
    "contact+tag@climsystem.com",
    "user_name@sub.domain.fr",
  ];

  for (const email of emailsValides) {
    it(`accepte l'email « ${email} »`, () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        email,
      });
      expect(result.success).toBe(true);
    });
  }

  const telephonesValides = [
    "0612345678",
    "06 12 34 56 78",
    "02-59-16-58-37",
    "+33 6 12 34 56 78",
    "+33612345678",
  ];

  for (const phone of telephonesValides) {
    it(`accepte le téléphone « ${phone} »`, () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        phone,
      });
      expect(result.success).toBe(true);
    });
  }

  it("rejette un message de exactement 9 caractères", () => {
    const result = contactSchema.safeParse({
      ...validContactPayload,
      message: "123456789",
    });
    expect(result.success).toBe(false);
  });

  it("accepte un message de exactement 10 caractères", () => {
    const result = contactSchema.safeParse({
      ...validContactPayload,
      message: "1234567890",
    });
    expect(result.success).toBe(true);
  });

  it("accepte un sujet de 200 caractères", () => {
    const result = contactSchema.safeParse({
      ...validContactPayload,
      subject: "x".repeat(200),
    });
    expect(result.success).toBe(true);
  });

  it("rejette un sujet de 201 caractères", () => {
    const result = contactSchema.safeParse({
      ...validContactPayload,
      subject: "x".repeat(201),
    });
    expect(result.success).toBe(false);
  });
});
