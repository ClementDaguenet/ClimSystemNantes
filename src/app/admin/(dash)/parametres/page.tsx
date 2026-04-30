import Link from "next/link";
import { updateSiteSettingsAction } from "@/app/admin/actions";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminParametresPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; err?: string }>;
}) {
  const q = await searchParams;
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!s) {
    return (
      <p className="text-red-600">
        Aucune ligne <code>site_settings</code> — exécutez{" "}
        <code>npx prisma migrate deploy</code> puis{" "}
        <code>npx prisma db seed</code>.
      </p>
    );
  }

  const onNetlify = process.env.NETLIFY === "true";

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin" className="text-sm text-clim-blue-700 hover:underline">
        ← Dashboard
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Paramètres du site public
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Texte libre sous le pied de page, médias du flyer SAV. En local vous
        pouvez envoyer des fichiers vers <code>/public/uploads</code> ; sur
        Netlify, indiquez uniquement des <strong>URLs</strong> vers des
        fichiers déjà hébergés (le disque serveur y est en lecture seule).
      </p>
      {onNetlify ? (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
          Déploiement Netlify détecté : les champs d’envoi de fichier sont
          désactivés. Utilisez une URL absolue ou un chemin dans{" "}
          <code>public/</code> présent dans le dépôt Git.
        </p>
      ) : null}
      {q.ok === "1" ? (
        <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          Enregistrement réussi.
        </p>
      ) : null}
      {q.err ? (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {decodeURIComponent(q.err)}
        </p>
      ) : null}
      <form action={updateSiteSettingsAction} className="mt-8 space-y-6">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Introduction pied de page
          </span>
          <textarea
            name="footerIntro"
            rows={6}
            defaultValue={s.footerIntro}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Flyer SAV (image + PDF optionnel)
          </h2>
          <label className="mt-3 block">
            <span className="text-sm text-slate-700">
              Chemin ou URL du visuel (ex.{" "}
              <code>/sav/notre-visuel.webp</code> ou URL absolue)
            </span>
            <input
              name="savFlyerImage"
              defaultValue={s.savFlyerImage}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          {!onNetlify ? (
            <label className="mt-3 block">
              <span className="text-sm text-slate-700">
                Remplacer par un fichier image
              </span>
              <input
                name="savFlyerImageFile"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="mt-1 w-full text-sm"
              />
            </label>
          ) : null}
          <label className="mt-4 block">
            <span className="text-sm text-slate-700">
              URL du PDF ou chemin sous <code>/public</code>
            </span>
            <input
              name="savFlyerPdf"
              defaultValue={s.savFlyerPdf ?? ""}
              placeholder="optionnel"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          {!onNetlify ? (
            <label className="mt-3 block">
              <span className="text-sm text-slate-700">Remplacer par un PDF</span>
              <input
                name="savFlyerPdfFile"
                type="file"
                accept="application/pdf"
                className="mt-1 w-full text-sm"
              />
            </label>
          ) : null}
          <label className="mt-4 block">
            <span className="text-sm text-slate-700">
              Texte alternatif du visuel
            </span>
            <input
              name="savImageAlt"
              defaultValue={s.savImageAlt ?? ""}
              placeholder="optionnel — accessibilité"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-clim-blue-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-clim-blue-800"
        >
          Enregistrer les paramètres
        </button>
      </form>
    </div>
  );
}
