/**
 * Importe tmp/prod-dump.json dans la PostgreSQL pointée par DATABASE_URL.
 * Écrase agences, paramètres et blocs CMS avec les valeurs de prod.
 *
 * Prérequis : `npx prisma migrate deploy` sur la base OVH.
 * Usage : npm run db:import-prod
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";
import { loadEnvFile } from "./load-env";

loadEnvFile();

type Dump = {
  exportedAt?: string;
  agencies: Array<{
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
    sortOrder: number;
  }>;
  siteSettings: Array<{
    id: number;
    footerIntro: string;
    savFlyerImage: string;
    savFlyerPdf: string | null;
    savImageAlt: string | null;
  }>;
  contentBlocks: Array<{
    key: string;
    label: string;
    group: string;
    value: string;
    updatedAt?: string;
  }>;
};

const prisma = new PrismaClient();

async function main() {
  const path = join(process.cwd(), "tmp", "prod-dump.json");
  const dump = JSON.parse(readFileSync(path, "utf8")) as Dump;

  if (!Array.isArray(dump.agencies) || !Array.isArray(dump.contentBlocks)) {
    throw new Error("Dump invalide : agencies / contentBlocks manquants.");
  }

  for (const it of dump.agencies) {
    await prisma.agency.upsert({
      where: { id: it.id },
      create: {
        id: it.id,
        name: it.name,
        city: it.city,
        address: it.address,
        postalCode: it.postalCode,
        phone: it.phone,
        email: it.email,
        hours: it.hours,
        latitude: it.latitude,
        longitude: it.longitude,
        isFeatured: Boolean(it.isFeatured),
        tagline: it.tagline ?? null,
        sortOrder: it.sortOrder,
      },
      update: {
        name: it.name,
        city: it.city,
        address: it.address,
        postalCode: it.postalCode,
        phone: it.phone,
        email: it.email,
        hours: it.hours,
        latitude: it.latitude,
        longitude: it.longitude,
        isFeatured: Boolean(it.isFeatured),
        tagline: it.tagline ?? null,
        sortOrder: it.sortOrder,
      },
    });
  }

  for (const s of dump.siteSettings ?? []) {
    await prisma.siteSettings.upsert({
      where: { id: s.id },
      create: {
        id: s.id,
        footerIntro: s.footerIntro,
        savFlyerImage: s.savFlyerImage,
        savFlyerPdf: s.savFlyerPdf ?? null,
        savImageAlt: s.savImageAlt ?? null,
      },
      update: {
        footerIntro: s.footerIntro,
        savFlyerImage: s.savFlyerImage,
        savFlyerPdf: s.savFlyerPdf ?? null,
        savImageAlt: s.savImageAlt ?? null,
      },
    });
  }

  for (const row of dump.contentBlocks) {
    await prisma.contentBlock.upsert({
      where: { key: row.key },
      create: {
        key: row.key,
        label: row.label,
        group: row.group,
        value: row.value,
      },
      update: {
        label: row.label,
        group: row.group,
        value: row.value,
      },
    });
  }

  console.log(
    `Import OK depuis ${path}` +
      (dump.exportedAt ? ` (export ${dump.exportedAt})` : "") +
      `\n  agencies: ${dump.agencies.length}` +
      `\n  site_settings: ${(dump.siteSettings ?? []).length}` +
      `\n  content_blocks: ${dump.contentBlocks.length}`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    void prisma.$disconnect();
    process.exit(1);
  });
