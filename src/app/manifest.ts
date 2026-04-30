import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Climsystem Distribution Atlantique",
    short_name: "Climsystem",
    description:
      "Distributeur indépendant en génie climatique. Équipe à Nantes, relais à Châtillon, Tours et Aubagne.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e6fd9",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    lang: "fr",
  };
}
