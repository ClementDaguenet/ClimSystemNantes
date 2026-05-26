import { describe, it, expect } from "vitest";
import { contactApiSchema, contactSchema } from "@/lib/contact/schema";
import { validContactPayload } from "../../../fixtures/contact";

describe("lib/contact/schema", () => {
  describe("contactSchema", () => {
    it("accepte un payload valide complet", () => {
      const result = contactSchema.safeParse(validContactPayload);
      expect(result.success).toBe(true);
    });

    it("rejette un nom trop court", () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        name: "A",
      });
      expect(result.success).toBe(false);
    });

    it("rejette un nom trop long", () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        name: "x".repeat(81),
      });
      expect(result.success).toBe(false);
    });

    it("rejette un email invalide", () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        email: "pas-email",
      });
      expect(result.success).toBe(false);
    });

    it("rejette un email vide", () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        email: "",
      });
      expect(result.success).toBe(false);
    });

    it("accepte un téléphone français avec espaces", () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        phone: "02 59 16 58 37",
      });
      expect(result.success).toBe(true);
    });

    it("accepte un téléphone international +33", () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        phone: "+33 6 12 34 56 78",
      });
      expect(result.success).toBe(true);
    });

    it("rejette un téléphone invalide", () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        phone: "abc",
      });
      expect(result.success).toBe(false);
    });

    it("rejette un sujet trop court", () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        subject: "x",
      });
      expect(result.success).toBe(false);
    });

    it("rejette un message trop court", () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        message: "court",
      });
      expect(result.success).toBe(false);
    });

    it("rejette un message trop long", () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        message: "x".repeat(2001),
      });
      expect(result.success).toBe(false);
    });

    it("exige consent === true", () => {
      const result = contactSchema.safeParse({
        ...validContactPayload,
        consent: false,
      });
      expect(result.success).toBe(false);
    });

    it("rejette consent absent", () => {
      const { consent: _, ...withoutConsent } = validContactPayload;
      const result = contactSchema.safeParse(withoutConsent);
      expect(result.success).toBe(false);
    });
  });

  describe("contactApiSchema", () => {
    it("accepte website vide (honeypot)", () => {
      const result = contactApiSchema.safeParse(validContactPayload);
      expect(result.success).toBe(true);
    });

    it("accepte website absent", () => {
      const { website: _, ...payload } = validContactPayload;
      const result = contactApiSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });

    it("accepte website rempli (filtré côté route)", () => {
      const result = contactApiSchema.safeParse({
        ...validContactPayload,
        website: "http://spam.com",
      });
      expect(result.success).toBe(true);
    });
  });
});
