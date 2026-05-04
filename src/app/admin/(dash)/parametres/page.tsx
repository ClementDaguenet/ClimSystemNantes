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
        Aucune ligne <code>site_settings</code>. Exécutez le seed contre la base
        PostgreSQL (voir README, commande <code>prisma db seed</code>).
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin" className="text-sm text-clim-blue-700 hover:underline">
        ← Dashboard
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Paramètres du site public
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Texte sous le pied de page et médias du flyer SAV. Indiquez des{" "}
        <strong>chemins</strong> vers des fichiers présents dans le dépôt sous{" "}
        <code className="text-xs">public/</code> (ex.{" "}
        <code className="text-xs">/sav-flyer.png</code>) ou des{" "}
        <strong>adresses HTTPS</strong> vers des fichiers hébergés en ligne.
      </p>
      <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
        Pas d’envoi de fichier ici : ajoutez les visuels dans Git sous{" "}
        <code className="text-xs">public/</code> puis mettez à jour les champs,
        ou utilisez une URL. Pour modifier les grandes photos de page, passez
        par{" "}
        <Link
          href="/admin/medias"
          className="font-medium text-clim-blue-700 underline hover:no-underline"
        >
          Photos &amp; médias
        </Link>
        .
      </p>
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
              Chemin sous <code className="text-xs">public/</code> ou URL HTTPS
              du visuel (ex. <code className="text-xs">/sav-flyer.webp</code>)
            </span>
            <input
              name="savFlyerImage"
              defaultValue={s.savFlyerImage}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-sm text-slate-700">
              Chemin ou URL HTTPS du PDF (optionnel)
            </span>
            <input
              name="savFlyerPdf"
              defaultValue={s.savFlyerPdf ?? ""}
              placeholder="optionnel"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-sm text-slate-700">
              Texte alternatif du visuel (accessibilité)
            </span>
            <input
              name="savImageAlt"
              defaultValue={s.savImageAlt ?? ""}
              placeholder="optionnel"
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
