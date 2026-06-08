import { prisma } from "@/lib/db";

/** Lecture en base à chaque requête ; le cache est porté par l'en-tête HTTP (URL versionnée). */
export const dynamic = "force-dynamic";

const DATA_URL_RE = /^data:([^;,]+)?(;base64)?,([\s\S]*)$/;

/**
 * Sert une image CMS stockée en data-URL dans `content_blocks` sous forme de binaire,
 * pour ne pas l'inliner dans le HTML des pages. Les valeurs http(s) sont redirigées.
 * Le segment `v` (hash de version) sert uniquement à invalider le cache : il est ignoré ici.
 */
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ key: string; v: string }> },
) {
  const { key } = await ctx.params;
  const row = await prisma.contentBlock.findUnique({ where: { key } });
  const value = row?.value?.trim() ?? "";

  if (value.startsWith("data:")) {
    const match = DATA_URL_RE.exec(value);
    if (!match) return new Response("Image invalide", { status: 404 });

    const mime = (match[1] || "application/octet-stream").trim();
    const isBase64 = Boolean(match[2]);
    const payload = match[3] ?? "";
    const buffer = isBase64
      ? Buffer.from(payload, "base64")
      : Buffer.from(decodeURIComponent(payload), "utf8");

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": mime,
        "Content-Length": String(buffer.byteLength),
        // Le segment de version rend ce contenu immuable.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  if (/^https?:\/\//i.test(value)) {
    return Response.redirect(value, 307);
  }

  return new Response("Image introuvable", { status: 404 });
}
