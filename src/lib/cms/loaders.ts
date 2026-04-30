import type { Agency } from "@/types";
import { prisma } from "@/lib/db";

export type SavContent = {
  flyerImage: string;
  flyerPdf?: string;
  imageAlt?: string;
};

export type FooterContent = { intro: string };

function toAgency(row: {
  id: string;
  name: string;
  city: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: string;
  latitude: number;
  longitude: number;
  isFeatured: boolean;
  tagline: string | null;
}): Agency {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    address: row.address,
    postalCode: row.postalCode,
    phone: row.phone,
    email: row.email,
    hours: row.hours,
    coords: [row.latitude, row.longitude],
    ...(row.isFeatured ? { isFeatured: true as const } : {}),
    ...(row.tagline ? { tagline: row.tagline } : {}),
  };
}

export async function getAgencies(): Promise<Agency[]> {
  const rows = await prisma.agency.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map(toAgency);
}

export async function getFeaturedAgency(): Promise<Agency> {
  const list = await getAgencies();
  if (list.length === 0) {
    throw new Error(
      "Aucune agence en base. Exécutez `npx prisma migrate deploy` puis `npx prisma db seed`.",
    );
  }
  return list.find((a) => a.isFeatured) ?? list[0];
}

export async function getFooterContent(): Promise<FooterContent> {
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!s) {
    throw new Error(
      "Paramètres site introuvables. Lancez le seed : `npx prisma db seed`.",
    );
  }
  return { intro: s.footerIntro };
}

export async function getSavContent(): Promise<SavContent> {
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!s) {
    throw new Error(
      "Paramètres site introuvables. Lancez le seed : `npx prisma db seed`.",
    );
  }
  return {
    flyerImage: s.savFlyerImage,
    ...(s.savFlyerPdf ? { flyerPdf: s.savFlyerPdf } : {}),
    ...(s.savImageAlt ? { imageAlt: s.savImageAlt } : {}),
  };
}
