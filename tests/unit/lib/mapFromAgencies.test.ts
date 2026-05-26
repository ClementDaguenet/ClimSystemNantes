import { describe, it, expect } from "vitest";
import { mapViewFromAgencies } from "@/lib/mapFromAgencies";
import { allAgenciesFixture, agencyNantes } from "../../fixtures/agencies";

describe("lib/mapFromAgencies", () => {
  it("retourne le centre par défaut si aucune agence", () => {
    const view = mapViewFromAgencies([]);
    expect(view.center).toEqual([46.6, 1.5]);
    expect(view.zoom).toBe(6);
  });

  it("calcule le centroïde pour une agence", () => {
    const view = mapViewFromAgencies([agencyNantes]);
    expect(view.center[0]).toBeCloseTo(47.148, 3);
    expect(view.center[1]).toBeCloseTo(-1.743, 3);
  });

  it("calcule la moyenne des coordonnées pour plusieurs agences", () => {
    const view = mapViewFromAgencies(allAgenciesFixture);
    const avgLat =
      allAgenciesFixture.reduce((s, a) => s + a.coords[0], 0) /
      allAgenciesFixture.length;
    const avgLng =
      allAgenciesFixture.reduce((s, a) => s + a.coords[1], 0) /
      allAgenciesFixture.length;
    expect(view.center[0]).toBeCloseTo(avgLat, 5);
    expect(view.center[1]).toBeCloseTo(avgLng, 5);
  });

  it("conserve un zoom fixe à 6", () => {
    expect(mapViewFromAgencies(allAgenciesFixture).zoom).toBe(6);
    expect(mapViewFromAgencies([agencyNantes]).zoom).toBe(6);
  });

  it("retourne un tuple [lat, lng]", () => {
    const { center } = mapViewFromAgencies(allAgenciesFixture);
    expect(center).toHaveLength(2);
    expect(typeof center[0]).toBe("number");
    expect(typeof center[1]).toBe("number");
  });
});
