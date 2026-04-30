import type { Agency } from "@/types";

const DEFAULT_CENTER: [number, number] = [46.6, 1.5];
const DEFAULT_ZOOM = 6;

export function mapViewFromAgencies(agencies: Agency[]): {
  center: [number, number];
  zoom: number;
} {
  if (agencies.length === 0) {
    return { center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM };
  }
  const lat =
    agencies.reduce((sum, a) => sum + a.coords[0], 0) / agencies.length;
  const lng =
    agencies.reduce((sum, a) => sum + a.coords[1], 0) / agencies.length;
  return { center: [lat, lng], zoom: DEFAULT_ZOOM };
}
