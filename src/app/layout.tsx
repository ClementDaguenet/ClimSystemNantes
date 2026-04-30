import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildOrganizationSchema,
  websiteSchema,
} from "@/lib/seo";
import { getAgencies } from "@/lib/cms/loaders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.climsystem.fr"),
  title: {
    default: "Climsystem Distribution Atlantique — Génie climatique à Nantes",
    template: "%s | Climsystem Distribution Atlantique",
  },
  description:
    "Climsystem Distribution Atlantique, distributeur indépendant en génie climatique. Équipe et dépôt à Nantes ; agences relais à Châtillon, Tours et Aubagne. Chauffage, climatisation, ventilation et hygrométrie pour les professionnels.",
  keywords: [
    "génie climatique",
    "chauffage",
    "climatisation",
    "ventilation",
    "VMC",
    "pompe à chaleur",
    "Nantes",
    "Châtillon",
    "Tours",
    "Aubagne",
    "distributeur frigoriste",
    "Climsystem",
    "Distribution Atlantique",
  ],
  authors: [{ name: "Climsystem Distribution Atlantique" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Climsystem Distribution Atlantique",
    title: "Climsystem Distribution Atlantique — Génie climatique à Nantes",
    description:
      "Distributeur indépendant en génie climatique. Première équipe à Nantes, relais à Châtillon, Tours et Aubagne.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Climsystem Distribution Atlantique",
    description:
      "Distributeur indépendant en génie climatique. Équipe à Nantes, réseau national.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#1e6fd9",
  width: "device-width",
  initialScale: 1,
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const agencies = await getAgencies();
  const organizationJsonLd =
    agencies.length > 0
      ? buildOrganizationSchema(
          agencies,
          agencies.find((a) => a.isFeatured) ?? agencies[0],
        )
      : null;

  return (
    <html lang="fr" className={`${geistSans.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-clim-bg text-clim-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-clim-blue-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu principal
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        {organizationJsonLd ? (
          <JsonLd id="ld-organization" data={organizationJsonLd} />
        ) : null}
        <JsonLd id="ld-website" data={websiteSchema} />
      </body>
    </html>
  );
}
