import Link from "next/link";
import { saveContentGroupAction } from "@/app/admin/actions";
import {
  TextesDeveloperModeButton,
  TextesDevKeysProvider,
  TextesVisibleKey,
} from "@/components/admin/TextesDeveloperMode";
import {
  CONTENT_DEFAULT_BY_KEY,
  CONTENT_SEED_ROWS,
  getContentPagesInOrder,
  getMediaContentGroupsInOrder,
} from "@/lib/cms/contentSeed";
import { cn } from "@/lib/cn";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function valueForKey(
  key: string,
  fromDb: Map<string, string>,
): string {
  return fromDb.get(key) ?? CONTENT_DEFAULT_BY_KEY[key] ?? "";
}

export default async function AdminTextesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; page?: string; err?: string }>;
}) {
  const q = await searchParams;
  const keys = CONTENT_SEED_ROWS.map((r) => r.key);
  const rows = await prisma.contentBlock.findMany({
    where: { key: { in: keys } },
  });
  const fromDb = new Map(rows.map((r) => [r.key, r.value]));

  const mediaGroupSet = new Set(getMediaContentGroupsInOrder());
  const pagesForTextAdmin = getContentPagesInOrder()
    .map((page) => ({
      ...page,
      groups: page.groups.filter((g) => !mediaGroupSet.has(g)),
    }))
    .filter((p) => p.groups.length > 0);

  const validPageIds = new Set(pagesForTextAdmin.map((p) => p.id));
  const pageParam = q.page?.trim();
  const pageFilter =
    pageParam && validPageIds.has(pageParam) ? pageParam : "all";

  const displayedPages =
    pageFilter === "all"
      ? pagesForTextAdmin
      : pagesForTextAdmin.filter((p) => p.id === pageFilter);

  return (
    <TextesDevKeysProvider>
      <div>
        <Link href="/admin" className="text-sm text-clim-blue-700 hover:underline">
          ← Dashboard
        </Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4 gap-y-2">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-slate-900">
              Textes & contenus éditoriaux
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Contenu regroupé par page puis par rubrique (enregistrement{" "}
              <strong>par groupe</strong>). Pour « Liste partenaires », respectez
              le séparateur <code>|</code>.
            </p>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Visuels : utilisez{" "}
              <Link
                href="/admin/medias"
                className="font-medium text-clim-blue-700 underline hover:no-underline"
              >
                Photos &amp; médias
              </Link>{" "}
              (téléchargement depuis l’ordinateur ou lien).
            </p>
          </div>
          <TextesDeveloperModeButton />
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <li>
            <Link
              href="/admin/textes"
              scroll={false}
              className={cn(
                "flex h-full flex-col rounded-2xl border p-4 shadow-sm transition",
                pageFilter === "all"
                  ? "border-clim-blue-500 bg-clim-blue-50/80 ring-1 ring-clim-blue-200"
                  : "border-slate-200 bg-white hover:border-clim-blue-200 hover:shadow-card",
              )}
            >
              <span className="text-sm font-semibold text-slate-900">
                Toutes les pages
              </span>
              <span className="mt-1 text-xs text-slate-500">
                Afficher tout le texte du site
              </span>
            </Link>
          </li>
          {pagesForTextAdmin.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/textes?page=${encodeURIComponent(p.id)}`}
                scroll={false}
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-4 shadow-sm transition",
                  pageFilter === p.id
                    ? "border-clim-blue-500 bg-clim-blue-50/80 ring-1 ring-clim-blue-200"
                    : "border-slate-200 bg-white hover:border-clim-blue-200 hover:shadow-card",
                )}
              >
                <span className="text-sm font-semibold text-slate-900">
                  {p.title}
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  {p.groups.length} rubrique
                  {p.groups.length > 1 ? "s" : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {q.saved ? (
          <p className="mt-6 inline-block rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
            Groupe enregistré : « {decodeURIComponent(q.saved)} »
          </p>
        ) : null}
        {q.err ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm leading-relaxed text-red-950">
            {decodeURIComponent(q.err)}
          </p>
        ) : null}
        <div className="mt-10 space-y-16">
          {displayedPages.map((page) => (
            <section
              key={page.id}
              id={`admin-text-page-${page.id}`}
              className="scroll-mt-6"
            >
              <h2 className="mb-6 border-b border-slate-300 pb-2 text-xl font-bold text-slate-900">
                {page.title}
              </h2>
              <div className="space-y-12">
                {page.groups.map((group) => (
                  <section
                    key={group}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="border-b border-slate-100 pb-3 text-lg font-semibold text-slate-900">
                      {group}
                    </h3>
                    <form
                      action={saveContentGroupAction}
                      className="mt-6 space-y-5"
                    >
                      <input type="hidden" name="group" value={group} />
                      <input type="hidden" name="adminReturnTo" value="textes" />
                      {pageFilter !== "all" ? (
                        <input
                          type="hidden"
                          name="adminPageFilter"
                          value={pageFilter}
                        />
                      ) : null}
                      {CONTENT_SEED_ROWS.filter((r) => r.group === group).map(
                        (row) => (
                          <label key={row.key} className="block">
                            <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                              {row.label}
                            </span>
                            <span className="sr-only">{row.key}</span>
                            {row.value.length > 120 ||
                            row.value.includes("\n") ? (
                              <textarea
                                name={row.key}
                                rows={Math.min(
                                  14,
                                  Math.max(3, row.value.split("\n").length + 3),
                                )}
                                defaultValue={valueForKey(row.key, fromDb)}
                                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
                              />
                            ) : (
                              <input
                                name={row.key}
                                defaultValue={valueForKey(row.key, fromDb)}
                                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                              />
                            )}
                            <TextesVisibleKey>{row.key}</TextesVisibleKey>
                          </label>
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
            </section>
          ))}
        </div>
      </div>
    </TextesDevKeysProvider>
  );
}
