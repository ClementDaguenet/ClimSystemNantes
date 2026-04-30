"use client";

import dynamic from "next/dynamic";
import type { Agency } from "@/types";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full w-full items-center justify-center bg-clim-blue-50 text-clim-muted"
      role="status"
      aria-live="polite"
    >
      <span className="text-sm">Chargement de la carte…</span>
    </div>
  ),
});

interface AgenciesMapProps {
  agencies: Agency[];
}

export function AgenciesMap({ agencies }: AgenciesMapProps) {
  return (
    <div className="h-[500px] w-full overflow-hidden rounded-2xl border border-clim-blue-100 shadow-soft">
      <LeafletMap agencies={agencies} />
    </div>
  );
}
