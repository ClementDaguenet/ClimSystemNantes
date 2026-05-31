// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  CONSENT_STORAGE_KEY,
  getClarityProjectId,
  getGaMeasurementId,
  hasAnalyticsConsent,
  readConsent,
  writeConsent,
} from "@/lib/analytics/consent";

describe("lib/analytics/consent", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.unstubAllEnvs();
  });

  describe("readConsent / writeConsent", () => {
    it("retourne null sans préférence", () => {
      expect(readConsent()).toBeNull();
    });

    it("persiste accepted", () => {
      writeConsent("accepted");
      expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("accepted");
      expect(readConsent()).toBe("accepted");
    });

    it("persiste rejected", () => {
      writeConsent("rejected");
      expect(readConsent()).toBe("rejected");
    });

    it("ignore une valeur corrompue", () => {
      localStorage.setItem(CONSENT_STORAGE_KEY, "invalid");
      expect(readConsent()).toBeNull();
    });

    it("émet un événement clims:consent", () => {
      const handler = vi.fn();
      window.addEventListener("clims:consent", handler);
      writeConsent("accepted");
      expect(handler).toHaveBeenCalled();
    });
  });

  describe("hasAnalyticsConsent", () => {
    it("false sans consentement", () => {
      expect(hasAnalyticsConsent()).toBe(false);
    });

    it("true si accepted", () => {
      writeConsent("accepted");
      expect(hasAnalyticsConsent()).toBe(true);
    });

    it("false si rejected", () => {
      writeConsent("rejected");
      expect(hasAnalyticsConsent()).toBe(false);
    });
  });

  describe("getGaMeasurementId", () => {
    it("retourne null sans variable env", () => {
      expect(getGaMeasurementId()).toBeNull();
    });

    it("retourne l'ID si format G-", () => {
      vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-ABC123XYZ");
      expect(getGaMeasurementId()).toBe("G-ABC123XYZ");
    });

    it("trim les espaces autour de l'ID GA4", () => {
      vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "  G-TRIM123  ");
      expect(getGaMeasurementId()).toBe("G-TRIM123");
    });
  });

  describe("getClarityProjectId", () => {
    it("retourne null sans variable env", () => {
      expect(getClarityProjectId()).toBeNull();
    });

    it("retourne l'ID Clarity configuré", () => {
      vi.stubEnv("NEXT_PUBLIC_CLARITY_PROJECT_ID", "wx9l5uefvg");
      expect(getClarityProjectId()).toBe("wx9l5uefvg");
    });

    it("trim les espaces autour de l'ID", () => {
      vi.stubEnv("NEXT_PUBLIC_CLARITY_PROJECT_ID", "  abc123  ");
      expect(getClarityProjectId()).toBe("abc123");
    });
  });
});
