"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";
import type { Agency } from "@/types";
import { mapViewFromAgencies } from "@/lib/mapFromAgencies";

/** Marqueurs en SVG (`divIcon`) pour éviter les assets Leaflet par défaut sous Next.js. */
const buildStandardIcon = () =>
  L.divIcon({
    className: "climsystem-marker",
    html: `
      <div style="position:relative;width:36px;height:48px;filter:drop-shadow(0 4px 8px rgba(15,23,42,0.25));">
        <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 0C8.06 0 0 8.06 0 18c0 12 18 30 18 30s18-18 18-30C36 8.06 27.94 0 18 0z" fill="#1e6fd9"/>
          <circle cx="18" cy="18" r="7" fill="#fff"/>
          <circle cx="18" cy="18" r="3.5" fill="#e11d2e"/>
        </svg>
      </div>
    `,
    iconSize: [36, 48],
    iconAnchor: [18, 48],
    popupAnchor: [0, -42],
  });

const buildHQIcon = () =>
  L.divIcon({
    className: "climsystem-marker climsystem-marker--hq",
    html: `
      <div style="position:relative;width:48px;height:62px;filter:drop-shadow(0 6px 12px rgba(225,29,46,0.4));">
        <svg width="48" height="62" viewBox="0 0 48 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 0C10.75 0 0 10.75 0 24c0 16 24 38 24 38s24-22 24-38C48 10.75 37.25 0 24 0z" fill="#e11d2e"/>
          <circle cx="24" cy="24" r="11" fill="#fff"/>
          <path d="M24 16l2.5 5.1 5.6.8-4 3.9 1 5.6L24 28.7l-5.1 2.7 1-5.6-4-3.9 5.6-.8z" fill="#e11d2e"/>
        </svg>
      </div>
    `,
    iconSize: [48, 62],
    iconAnchor: [24, 62],
    popupAnchor: [0, -56],
  });

interface LeafletMapProps {
  agencies: Agency[];
}

export default function LeafletMap({ agencies }: LeafletMapProps) {
  const standardIcon = useMemo(() => buildStandardIcon(), []);
  const hqIcon = useMemo(() => buildHQIcon(), []);
  const { center, zoom } = useMemo(
    () => mapViewFromAgencies(agencies),
    [agencies],
  );

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-full w-full"
      aria-label="Carte interactive des agences Climsystem"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {agencies.map((a) => (
        <Marker
          key={a.id}
          position={a.coords}
          icon={a.isFeatured ? hqIcon : standardIcon}
          zIndexOffset={a.isFeatured ? 1000 : 0}
        >
          <Popup>
            <div className="space-y-1 text-sm">
              {a.isFeatured && (
                <span className="inline-block rounded-full bg-clim-red-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  Nantes
                </span>
              )}
              <p className="font-bold text-clim-ink">{a.name}</p>
              <p className="text-clim-muted">
                {a.address}
                <br />
                {a.postalCode} {a.city}
              </p>
              <a
                href={`tel:${a.phone.replace(/\s/g, "")}`}
                className="block font-medium text-clim-blue-700 hover:underline"
              >
                {a.phone}
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
