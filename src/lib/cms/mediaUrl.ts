import { createHash } from "node:crypto";

/**
 * Convertit une valeur d'image CMS (stockée en base) en URL livrable au navigateur.
 *
 * - data-URL  -> route `/media/<clé>/<hash>` : le binaire est servi séparément
 *   (cacheable, optimisable par next/image) au lieu d'être inliné en base64 dans le HTML.
 *   C'est ce qui évite des documents de plusieurs Mo et un LCP catastrophique.
 * - http(s)   -> renvoyée telle quelle (image externe).
 * - chemin /… -> renvoyée telle quelle (fichier `public/` versionné).
 * - vide      -> `undefined` (le composant affiche son visuel de repli).
 *
 * Le segment `<hash>` change dès que l'image change : l'URL devient ainsi immuable
 * et peut être mise en cache agressivement par le navigateur et le CDN. La version
 * est dans le chemin (et non en query string) pour rester optimisable par next/image.
 */
export function cmsImageDeliveryUrl(
  key: string,
  rawValue: string | undefined | null,
): string | undefined {
  const value = rawValue?.trim();
  if (!value) return undefined;

  if (value.startsWith("data:")) {
    const version = createHash("sha1").update(value).digest("hex").slice(0, 12);
    return `/media/${encodeURIComponent(key)}/${version}`;
  }

  return value;
}
