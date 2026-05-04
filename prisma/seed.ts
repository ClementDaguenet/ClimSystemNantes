import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";
import { CONTENT_SEED_ROWS } from "../src/lib/cms/contentSeed";

const prisma = new PrismaClient();

type AgenciesFile = {
  items: Array<{
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
    isFeatured?: boolean;
    tagline?: string;
  }>;
};

type FooterFile = { intro: string };
type SavFile = {
  flyerImage: string;
  flyerPdf?: string;
  imageAlt?: string;
};

function loadJson<T>(filename: string): T {
  const path = join(process.cwd(), "content", "site", filename);
  let raw = readFileSync(path, "utf8");
  if (raw.charCodeAt(0) === 0xfeff) {
    raw = raw.slice(1);
  }
  return JSON.parse(raw) as T;
}

async function seedAgencies() {
  const { items } = loadJson<AgenciesFile>("agencies.json");
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
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
        sortOrder: i,
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
        sortOrder: i,
      },
    });
  }
}

async function seedSiteSettings() {
  const footer = loadJson<FooterFile>("footer.json");
  const sav = loadJson<SavFile>("sav.json");
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      footerIntro: footer.intro,
      savFlyerImage: sav.flyerImage,
      savFlyerPdf: sav.flyerPdf ?? null,
      savImageAlt: sav.imageAlt ?? null,
    },
    update: {
      footerIntro: footer.intro,
      savFlyerImage: sav.flyerImage,
      savFlyerPdf: sav.flyerPdf ?? null,
      savImageAlt: sav.imageAlt ?? null,
    },
  });
}

async function seedContentBlocks() {
  for (const row of CONTENT_SEED_ROWS) {
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
        // valeur non écrasée : préserve les textes édités depuis l’admin
      },
    });
  }
}

async function main() {
  await seedAgencies();
  await seedSiteSettings();
  await seedContentBlocks();
  console.log(
    "Seed OK (agences + site_settings + content_blocks depuis JSON + défauts CMS).",
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    void prisma.$disconnect();
    process.exit(1);
  });
