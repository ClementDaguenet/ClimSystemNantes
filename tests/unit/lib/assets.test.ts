import { describe, it, expect } from "vitest";
import {
  OFFICIAL_LOGO_PATH,
  OFFICIAL_LOGO_ASPECT,
  officialLogoAbsoluteUrl,
} from "@/lib/assets";

describe("lib/assets", () => {
  describe("officialLogoAbsoluteUrl", () => {
    it("construit une URL absolue vers logo.png", () => {
      const url = officialLogoAbsoluteUrl(
        "https://climsystem.com",
      );
      expect(url).toBe(
        "https://climsystem.com/logo.png",
      );
    });

    it("supprime le slash final du siteUrl", () => {
      const url = officialLogoAbsoluteUrl(
        "https://climsystem.com/",
      );
      expect(url).toContain("/logo.png");
      expect(url).not.toContain("//logo");
    });

    it("fonctionne avec un domaine local", () => {
      expect(officialLogoAbsoluteUrl("http://localhost:3000")).toBe(
        "http://localhost:3000/logo.png",
      );
    });
  });

  describe("constantes logo", () => {
    it("OFFICIAL_LOGO_PATH pointe vers /logo.png", () => {
      expect(OFFICIAL_LOGO_PATH).toBe("/logo.png");
    });

    it("OFFICIAL_LOGO_ASPECT est un ratio width/height cohérent", () => {
      expect(OFFICIAL_LOGO_ASPECT).toBeGreaterThan(1);
      expect(OFFICIAL_LOGO_ASPECT).toBeLessThan(10);
    });
  });
});
