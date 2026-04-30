import type { Agency } from "@/types";
import { officialLogoAbsoluteUrl } from "@/lib/assets";
import { solutions } from "@/data/solutions";

export const SITE_URL = "https://www.climsystem.fr";
export const SITE_NAME = "Climsystem Distribution Atlantique";

const SITE_LOGO_URL = officialLogoAbsoluteUrl(SITE_URL);

export function buildOrganizationSchema(
  agencies: Agency[],
  featuredAgency: Agency,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    alternateName: "Climsystem",
    url: SITE_URL,
    logo: SITE_LOGO_URL,
    image: SITE_LOGO_URL,
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
  return agencies.map((a) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/agences#${a.id}`,
    name: a.name,
    parentOrganization: { "@id": `${SITE_URL}#organization` },
    image: SITE_LOGO_URL,
    url: `${SITE_URL}/agences#${a.id}`,
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

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: "fr-FR",
};

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
