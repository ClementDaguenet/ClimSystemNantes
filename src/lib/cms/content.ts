import { prisma } from "@/lib/db";
import { CONTENT_DEFAULT_BY_KEY } from "@/lib/cms/contentSeed";

/**
 * Lecture des textes CMS par clés. Valeur par défaut si absente en base ou si le seed n’a pas été rejoué.
 */
export async function getContents(keys: readonly string[]): Promise<
  Record<string, string>
> {
  const unique = [...new Set(keys)].filter(Boolean);
  if (unique.length === 0) return {};

  const rows = await prisma.contentBlock.findMany({
    where: { key: { in: unique } },
  });
  const fromDb = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return Object.fromEntries(
    unique.map((k) => [
      k,
      fromDb[k] ?? CONTENT_DEFAULT_BY_KEY[k] ?? "",
    ]),
  );
}
