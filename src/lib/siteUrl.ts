/** URL publique canonique (sans slash final). Surcharge via NEXT_PUBLIC_SITE_URL sur Vercel. */
export const DEFAULT_SITE_URL = "https://climsystem.com";

/** Origine du site pour SEO, sitemap, JSON-LD et metadataBase. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  try {
    const u = new URL(raw);
    return u.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/** Hôte canonique (ex. climsystem.com). */
export function getSiteHost(): string {
  return new URL(getSiteUrl()).host;
}

/** Domaine apex sans www, si l’URL canonique commence par www. */
export function getApexHost(): string | null {
  const host = getSiteHost();
  if (!host.startsWith("www.")) return null;
  return host.slice(4);
}

/** Variante www (pour rediriger www → apex quand le canonique est sans www). */
export function getWwwHost(): string {
  const host = getSiteHost();
  if (host.startsWith("www.")) return host;
  return `www.${host}`;
}

/** Libellé affiché dans les pages légales (sans https://). */
export function getSiteHostLabel(): string {
  return getSiteHost();
}
