/**
 * Dump de la base pointée par DATABASE_URL vers tmp/prod-dump.json.
 *
 * Usage : npm run db:export-prod
 * Ne pas committer le JSON (images CMS en data-URL).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { PrismaClient } from "@prisma/client";
import { loadEnvFile } from "./load-env";

loadEnvFile();

const prisma = new PrismaClient();

async function main() {
  const [agencies, siteSettings, contentBlocks] = await Promise.all([
    prisma.agency.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.siteSettings.findMany(),
    prisma.contentBlock.findMany({ orderBy: { key: "asc" } }),
  ]);

  const dump = {
    exportedAt: new Date().toISOString(),
    agencies,
    siteSettings,
    contentBlocks,
  };

  const out = join(process.cwd(), "tmp", "prod-dump.json");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(dump), "utf8");

  const inlineImages = contentBlocks.filter((b) =>
    b.value.trim().startsWith("data:"),
  ).length;

  console.log(
    `Export OK → ${out}\n` +
      `  agencies: ${agencies.length}\n` +
      `  site_settings: ${siteSettings.length}\n` +
      `  content_blocks: ${contentBlocks.length} (dont ${inlineImages} image(s) data-URL)`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    void prisma.$disconnect();
    process.exit(1);
  });
