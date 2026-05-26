import { describe, it, expect } from "vitest";
import {
  defaultViewport,
  fadeIn,
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from "@/lib/animations";

describe("lib/animations", () => {
  describe("fadeIn", () => {
    it("démarre invisible", () => {
      expect(fadeIn.hidden).toMatchObject({ opacity: 0 });
    });

    it("termine visible", () => {
      expect(fadeIn.visible).toMatchObject({ opacity: 1 });
    });

    it("a une transition de 0.6s", () => {
      const visible = fadeIn.visible as { transition: { duration: number } };
      expect(visible.transition.duration).toBe(0.6);
    });
  });

  describe("fadeInUp", () => {
    it("translate verticalement depuis y=24", () => {
      expect(fadeInUp.hidden).toMatchObject({ opacity: 0, y: 24 });
      expect(fadeInUp.visible).toMatchObject({ opacity: 1, y: 0 });
    });
  });

  describe("slideInLeft", () => {
    it("translate horizontalement depuis x=-32", () => {
      expect(slideInLeft.hidden).toMatchObject({ opacity: 0, x: -32 });
      expect(slideInLeft.visible).toMatchObject({ opacity: 1, x: 0 });
    });
  });

  describe("slideInRight", () => {
    it("translate horizontalement depuis x=32", () => {
      expect(slideInRight.hidden).toMatchObject({ opacity: 0, x: 32 });
      expect(slideInRight.visible).toMatchObject({ opacity: 1, x: 0 });
    });
  });

  describe("staggerContainer", () => {
    it("stagger les enfants avec 0.12s d'écart", () => {
      const visible = staggerContainer.visible as {
        transition: { staggerChildren: number; delayChildren: number };
      };
      expect(visible.transition.staggerChildren).toBe(0.12);
      expect(visible.transition.delayChildren).toBe(0.05);
    });
  });

  describe("defaultViewport", () => {
    it("anime une seule fois", () => {
      expect(defaultViewport.once).toBe(true);
    });

    it("déclenche avant l'entrée viewport (-80px)", () => {
      expect(defaultViewport.margin).toBe("-80px");
    });
  });
});
