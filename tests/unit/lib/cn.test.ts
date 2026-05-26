import { describe, it, expect } from "vitest";
import { cn } from "@/lib/cn";

describe("lib/cn", () => {
  it("joint les classes truthy", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("ignore null, undefined et false", () => {
    expect(cn("a", null, undefined, false, "b")).toBe("a b");
  });

  it("retourne une chaîne vide sans argument", () => {
    expect(cn()).toBe("");
  });

  it("accepte des nombres", () => {
    expect(cn("col", 3)).toBe("col 3");
  });

  it("gère les conditions ternaires", () => {
    const active = true;
    expect(cn("btn", active && "btn-active")).toBe("btn btn-active");
  });
});
