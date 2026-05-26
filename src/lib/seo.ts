import type { Agency } from "@/types";
import { officialLogoAbsoluteUrl } from "@/lib/assets";
import { getSiteUrl } from "@/lib/siteUrl";
import { solutions } from "@/data/solutions";

export const SITE_NAME = "Climsystem Distribution Atlantique";

export function siteUrl(): string {
  return getSiteUrl();
}

const siteLogoUrl = () => officialLogoAbsoluteUrl(getSiteUrl());

export function buildOrganizationSchema(
  agencies: Agency[],
  featuredAgency: Agency,
) {
  const base = getSiteUrl();
  const logo = siteLogoUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}#organization`,
    name: SITE_NAME,
    alternateName: "Climsystem",
    url: base,
    logo,
    image: logo,
    description:
      "Distributeur indépendant en génie climatique depuis plus de 25 ans : chauffage, climatisation, ventilation et hygrométrie. Équipe à Nantes ; agences à Châtillon, Tours et Aubagne.",
    foundingDate: "2000",
    slogan: "Le génie climatique, pensé pour les pros.",
    knowsAbout: solutions.map((s) => s.title),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: featuredAgency.phone,
      email: featuredAgency.email,
      contactType: "customer service",
      areaServed: "FR",
      availableLanguage: ["French"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: featuredAgency.address,
      postalCode: featuredAgency.postalCode,
      addressLocality: featuredAgency.city,
      addressCountry: "FR",
    },
    location: agencies.map((a) => ({
      "@type": "Place",
      name: a.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: a.address,
        postalCode: a.postalCode,
        addressLocality: a.city,
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: a.coords[0],
        longitude: a.coords[1],
      },
    })),
  };
}

export function buildLocalBusinessSchemas(agencies: Agency[]) {
  const base = getSiteUrl();
  const logo = siteLogoUrl();
  return agencies.map((a) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base}/agences#${a.id}`,
    name: a.name,
    parentOrganization: { "@id": `${base}#organization` },
    image: logo,
    url: `${base}/agences#${a.id}`,
    telephone: a.phone,
    email: a.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: a.address,
      postalCode: a.postalCode,
      addressLocality: a.city,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: a.coords[0],
      longitude: a.coords[1],
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "14:00",
        closes: "18:00",
      },
    ],
  }));
}

export function websiteSchema() {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}#website`,
    url: base,
    name: SITE_NAME,
    publisher: { "@id": `${base}#organization` },
    inLanguage: "fr-FR",
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${base}${item.url}`,
    })),
  };
}
