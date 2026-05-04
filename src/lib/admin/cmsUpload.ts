/**
 * Valeur postée à la place d’une data-URL (trop lourde pour le corps de la requête).
 * Le serveur reprend alors la valeur déjà enregistrée en base pour cette clé.
 */
export const CMS_IMAGE_FORM_KEEP_INLINE = "__CMS_INLINE_PRESERVE__";

/** Nom du champ FormData pour l’upload associé à une clé CMS `*.image_url`. */
export function cmsImageUploadFieldName(contentKey: string): string {
  return `cms_upload_${contentKey.replace(/\./g, "_")}`;
}
