import { describe, it, expect } from "vitest";
import {
  CMS_IMAGE_FORM_KEEP_INLINE,
  cmsImageUploadFieldName,
} from "@/lib/admin/cmsUpload";

describe("lib/admin/cmsUpload", () => {
  describe("cmsImageUploadFieldName", () => {
    it("préfixe cms_upload_", () => {
      expect(cmsImageUploadFieldName("media.hero.image_url")).toBe(
        "cms_upload_media_hero_image_url",
      );
    });

    it("remplace tous les points par des underscores", () => {
      expect(cmsImageUploadFieldName("media.solutions.chauffage.image_url")).toBe(
        "cms_upload_media_solutions_chauffage_image_url",
      );
    });

    it("gère une clé sans point", () => {
      expect(cmsImageUploadFieldName("simple")).toBe("cms_upload_simple");
    });
  });

  describe("CMS_IMAGE_FORM_KEEP_INLINE", () => {
    it("est une constante de préservation data-URL", () => {
      expect(CMS_IMAGE_FORM_KEEP_INLINE).toBe("__CMS_INLINE_PRESERVE__");
    });
  });
});
