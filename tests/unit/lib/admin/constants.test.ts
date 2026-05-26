import { describe, it, expect } from "vitest";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/constants";

describe("lib/admin/constants", () => {
  it("expose un nom de cookie admin stable", () => {
    expect(ADMIN_COOKIE_NAME).toBe("clims_admin_session");
  });

  it("utilise un identifiant sans espaces", () => {
    expect(ADMIN_COOKIE_NAME).not.toMatch(/\s/);
  });
});
