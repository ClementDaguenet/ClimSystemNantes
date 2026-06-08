import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Analytics } from "@/components/layout/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildOrganizationSchema,
  websiteSchema,
} from "@/lib/seo";
import { getSiteUrl } from "@/lib/siteUrl";
import { getAgencies } from "@/lib/cms/loaders";
import { getContents } from "@/lib/cms/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

/** Métadonnées de base ; l’image Open Graph peut être surchargée depuis le CMS (`media.og.image_url`). */
export const SITE_METADATA_STATIC: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Climsystem Distribution Atlantique - Génie climatique à Nantes",
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
    title: "Climsystem Distribution Atlantique - Génie climatique à Nantes",
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
    icon: [{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getContents(["media.og.image_url"]);
  const ogUrl = cms["media.og.image_url"]?.trim();
  /** Les data-URL ne sont pas des aperçus valables pour OG / crawlers réseaux sociaux */
  if (!ogUrl || ogUrl.startsWith("data:")) return SITE_METADATA_STATIC;

  const baseOg = SITE_METADATA_STATIC.openGraph;
  const baseTw = SITE_METADATA_STATIC.twitter;

  return {
    ...SITE_METADATA_STATIC,
    openGraph: baseOg ? { ...baseOg, images: [{ url: ogUrl }] } : undefined,
    twitter:
      typeof baseTw === "object"
        ? { ...baseTw, images: [ogUrl] }
        : baseTw,
  };
}

export const viewport: Viewport = {
  themeColor: "#1e6fd9",
  width: "device-width",
  initialScale: 1,
};

/**
 * Rendu statique + revalidation à la demande : les pages publiques sont mises en cache
 * (TTFB quasi instantané, plus de requête DB par visite). Les modifications du back-office
 * rafraîchissent le cache via `revalidatePath(...)` dans `src/app/admin/actions.ts`.
 * Le segment `/admin` reste dynamique grâce à son propre `force-dynamic`.
 */
export const revalidate = 3600;

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
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
        {organizationJsonLd ? (
          <JsonLd id="ld-organization" data={organizationJsonLd} />
        ) : null}
        <JsonLd id="ld-website" data={websiteSchema()} />
      </body>
    </html>
  );
}
