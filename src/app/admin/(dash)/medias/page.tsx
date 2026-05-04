import Link from "next/link";
import { saveContentGroupAction } from "@/app/admin/actions";
import { AdminCmsMediaUrlField } from "@/components/admin/AdminCmsMediaUrlField";
import {
  TextesDeveloperModeButton,
  TextesDevKeysProvider,
  TextesVisibleKey,
} from "@/components/admin/TextesDeveloperMode";
import {
  CONTENT_DEFAULT_BY_KEY,
  CONTENT_SEED_ROWS,
  getMediaContentGroupsInOrder,
} from "@/lib/cms/contentSeed";
import { cmsImageUploadFieldName } from "@/lib/admin/cmsUpload";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function valueForKey(
  key: string,
  fromDb: Map<string, string>,
): string {
  return fromDb.get(key) ?? CONTENT_DEFAULT_BY_KEY[key] ?? "";
}

function isCmsPublicImageUrlKey(key: string) {
  return key.endsWith(".image_url");
}

export default async function AdminMediasPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; err?: string }>;
}) {
  const q = await searchParams;
  const keys = CONTENT_SEED_ROWS.map((r) => r.key);
  const rows = await prisma.contentBlock.findMany({
    where: { key: { in: keys } },
  });
  const fromDb = new Map(rows.map((r) => [r.key, r.value]));
  const mediaGroups = getMediaContentGroupsInOrder();

  return (
    <TextesDevKeysProvider>
      <div>
        <Link href="/admin" className="text-sm text-clim-blue-700 hover:underline">
          ← Dashboard
        </Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4 gap-y-2">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-slate-900">
              Photos &amp; médias
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Renseignez chaque groupe puis cliquez sur{" "}
              <strong>Enregistrer ce groupe</strong>. Pour une image, utilisez à
              la fois le sélecteur de fichier (<strong>télécharger</strong>) -
              aucun logiciel ou dossier technique n’est nécessaire - ou bien
              collez une adresse / chemin. L&apos;
              <strong>aperçu réseaux sociaux</strong> (premier bloc) demande une
              adresse <code className="text-xs">https://…</code> vers une image déjà en ligne ;
              Hero et Solutions peuvent passer par téléchargement. Le flyer SAV
              sous{" "}
              <Link
                href="/admin/parametres"
                className="font-medium text-clim-blue-700 underline hover:no-underline"
              >
                Paramètres site
              </Link>
              .
            </p>
          </div>
          <TextesDeveloperModeButton />
        </div>
        {q.saved ? (
          <p className="mt-4 inline-block rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
            Groupe enregistré : « {decodeURIComponent(q.saved)} »
          </p>
        ) : null}
        {q.err ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm leading-relaxed text-red-950">
            {decodeURIComponent(q.err)}
          </p>
        ) : null}
        <div className="mt-10 space-y-12">
          {mediaGroups.map((group) => (
            <section
              key={group}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="border-b border-slate-100 pb-3 text-lg font-semibold text-slate-900">
                {group}
              </h2>
              <form action={saveContentGroupAction} className="mt-6 space-y-5">
                <input type="hidden" name="group" value={group} />
                <input type="hidden" name="adminReturnTo" value="medias" />
                {CONTENT_SEED_ROWS.filter((r) => r.group === group).map(
                  (row) => (
                    <div key={row.key} className="block space-y-0">
                      {isCmsPublicImageUrlKey(row.key) ? (
                        <>
                          <span className="sr-only">{row.key}</span>
                          <AdminCmsMediaUrlField
                            key={`${row.key}-${valueForKey(row.key, fromDb).length}`}
                            name={row.key}
                            label={row.label}
                            defaultValue={valueForKey(row.key, fromDb)}
                            mode={
                              row.key === "media.og.image_url"
                                ? "openGraph"
                                : "default"
                            }
                            {...(row.key !== "media.og.image_url"
                              ? {
                                  uploadFieldName:
                                    cmsImageUploadFieldName(row.key),
                                }
                              : {})}
                          />
                          <TextesVisibleKey>{row.key}</TextesVisibleKey>
                        </>
                      ) : (
                        <label className="block">
                          <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {row.label}
                          </span>
                          <span className="sr-only">{row.key}</span>
                          <textarea
                            name={row.key}
                            rows={Math.min(
                              4,
                              Math.max(2, row.value.split("\n").length + 1),
                            )}
                            defaultValue={valueForKey(row.key, fromDb)}
                            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                          />
                          <TextesVisibleKey>{row.key}</TextesVisibleKey>
                        </label>
                      )}
                    </div>
                  ),
                )}
                <button
                  type="submit"
                  className="rounded-lg bg-clim-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-clim-blue-800"
                >
                  Enregistrer ce groupe
                </button>
              </form>
            </section>
          ))}
        </div>
      </div>
    </TextesDevKeysProvider>
  );
}
