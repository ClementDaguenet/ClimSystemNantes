"use client";

import { useState } from "react";

import { CMS_IMAGE_FORM_KEEP_INLINE } from "@/lib/admin/cmsUpload";

export type AdminCmsMediaFieldMode = "default" | "openGraph";

type AdminCmsMediaUrlFieldProps = {
  name: string;
  /** Ignoré en mode Open Graph */
  uploadFieldName?: string;
  label: string;
  defaultValue: string;
  mode?: AdminCmsMediaFieldMode;
};

/** Champ URL contrôlé + téléversement fichier + aperçu pour l’admin « Photos ». */
export function AdminCmsMediaUrlField({
  name,
  uploadFieldName,
  label,
  defaultValue,
  mode = "default",
}: AdminCmsMediaUrlFieldProps) {
  const ogMode = mode === "openGraph";

  /** Data-URLs sont trop volumineuses en POST : on ne les renvoie pas dans le formulaire. */
  const inlineStored = defaultValue.trim().startsWith("data:image/");

  const [value, setValue] = useState(defaultValue);
  const [replacementUrl, setReplacementUrl] = useState("");
  const [explicitClear, setExplicitClear] = useState(false);

  const hiddenSubmitValue = inlineStored
    ? explicitClear
      ? ""
      : replacementUrl.trim() !== ""
        ? replacementUrl.trim()
        : CMS_IMAGE_FORM_KEEP_INLINE
    : null;

  const previewSrc = (() => {
    if (explicitClear) return "";
    if (replacementUrl.trim() !== "") {
      const t = replacementUrl.trim();
      if (
        t.startsWith("/") ||
        /^https?:\/\//i.test(t) ||
        t.startsWith("data:image/")
      ) {
        return t;
      }
    }
    return defaultValue.trim();
  })();

  const showPreview =
    previewSrc.length > 0 &&
    (previewSrc.startsWith("/") ||
      /^https?:\/\//i.test(previewSrc) ||
      previewSrc.startsWith("data:image/"));

  const textFieldSection = inlineStored ? (
    <div>
      <p className="text-xs font-medium text-slate-700">
        {ogMode
          ? "Adresse HTTPS (remplacer l’image enregistrée)"
          : "2 · Remplacer par une URL ou un chemin /public/…"}
      </p>
      <input type="hidden" name={name} value={hiddenSubmitValue!} />
      <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
        L’image déjà enregistrée reste en base : seul un court code est envoyé
        avec le formulaire, ce qui évite un blocage quand plusieurs photos sont
        dans le même groupe.
      </p>
      <label className="mt-2 block">
        <span className="sr-only">URL ou chemin pour {label}</span>
        <input
          type="text"
          value={replacementUrl}
          onChange={(e) => {
            setReplacementUrl(e.target.value);
            if (e.target.value.trim() !== "") setExplicitClear(false);
          }}
          placeholder={
            ogMode
              ? "https://…"
              : "Laisser vide pour conserver l’image actuelle après enregistrement"
          }
          spellCheck={false}
          autoComplete="off"
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
        />
      </label>
      <button
        type="button"
        onClick={() => {
          setExplicitClear(true);
          setReplacementUrl("");
        }}
        className="mt-2 text-xs font-medium text-red-700 underline hover:no-underline"
      >
        {ogMode
          ? "Effacer l’image enregistrée pour ne garder qu’une adresse HTTPS"
          : "Retirer l’image du site (cet emplacement sera vide après enregistrement)"}
      </button>
      {!ogMode ? (
        <p className="mt-2 text-[11px] text-slate-400">
          Si vous choisissez un fichier ci-dessus, il remplace toute adresse ou chemin
          saisi ici lors de l’enregistrement.
        </p>
      ) : null}
    </div>
  ) : (
    <div>
      <p className="text-xs font-medium text-slate-700">
        {ogMode ? "Adresse HTTPS de l’image" : "2 · Ou coller une adresse / chemin"}
      </p>
      <label className="mt-2 block">
        <span className="sr-only">URL ou chemin pour {label}</span>
        <input
          name={name}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            ogMode
              ? "https://exemple.fr/images/apercu-og.jpg"
              : "/dossier/fichier.webp ou https://…"
          }
          spellCheck={false}
          autoComplete="off"
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
        />
      </label>
      {!ogMode ? (
        <p className="mt-1 text-[11px] text-slate-400">
          Si vous avez choisi un fichier à l&apos;étape 1, il prend le pas sur ce
          champ lors de l’enregistrement.
        </p>
      ) : null}
    </div>
  );

  return (
    <div className="space-y-2">
      <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>

      {ogMode ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50/90 p-4">
          <p className="text-xs font-semibold text-amber-900">
            Réseaux sociaux uniquement - adresse HTTPS
          </p>
          <p className="mt-2 text-xs leading-relaxed text-amber-900/85">
            Facebook, WhatsApp ou LinkedIn exigent un{" "}
            <strong>lien https://</strong> vers une image déjà accessible sur le web.
            Déposez l&apos;image sur un espace entreprise ou un CDN, puis collez son
            adresse ci-dessous. Le téléversement depuis cet écran ne s&apos;applique
            pas à ce champ.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
          <p className="text-xs font-medium text-slate-700">
            1 · Télécharger une image depuis l’ordinateur
          </p>
          {uploadFieldName ? (
            <input
              name={uploadFieldName}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-clim-blue-900 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-clim-blue-800"
            />
          ) : (
            <p className="mt-2 text-xs text-red-600">
              Configuration : nom de champ d’upload manquant (signaler au
              développeur).
            </p>
          )}
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            Après enregistrement du groupe, l’image est conservée avec le site dans
            la base (jusqu’à environ 2 Mo, de préférence JPG ou WebP).
          </p>
        </div>
      )}

      {textFieldSection}

      {showPreview ? (
        <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Aperçu
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewSrc}
            alt=""
            className="mt-2 max-h-40 w-auto max-w-full rounded-md object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}
