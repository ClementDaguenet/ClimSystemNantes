import Link from "next/link";
import { saveContentGroupAction } from "@/app/admin/actions";
import {
  CONTENT_DEFAULT_BY_KEY,
  CONTENT_SEED_ROWS,
  getContentGroupsInOrder,
} from "@/lib/cms/contentSeed";
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
  searchParams: Promise<{ saved?: string }>;
}) {
  const q = await searchParams;
  const keys = CONTENT_SEED_ROWS.map((r) => r.key);
  const rows = await prisma.contentBlock.findMany({
    where: { key: { in: keys } },
  });
  const fromDb = new Map(rows.map((r) => [r.key, r.value]));
  const groups = getContentGroupsInOrder();

  return (
    <div>
      <Link href="/admin" className="text-sm text-clim-blue-700 hover:underline">
        ← Dashboard
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Textes & contenus éditoriaux
      </h1>
      <p className="mt-2 max-w-3xl text-sm text-slate-600">
        Chaque groupe se sauvegarde indépendamment. Respectez pour « Liste
        partenaires » le format décrit dans les libellés (séparateur{" "}
        <code>|</code>, lignes multiples pour les listes à puces simulées).
      </p>
      {q.saved ? (
        <p className="mt-4 inline-block rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          Groupe enregistré : « {decodeURIComponent(q.saved)} »
        </p>
      ) : null}
      <div className="mt-10 space-y-12">
        {groups.map((group) => (
          <section
            key={group}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="border-b border-slate-100 pb-3 text-lg font-semibold text-slate-900">
              {group}
            </h2>
            <form action={saveContentGroupAction} className="mt-6 space-y-5">
              <input type="hidden" name="group" value={group} />
              {CONTENT_SEED_ROWS.filter((r) => r.group === group).map((row) => (
                <label key={row.key} className="block">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {row.label}
                  </span>
                  <span className="sr-only">{row.key}</span>
                  {row.value.length > 120 || row.value.includes("\n") ? (
                    <textarea
                      name={row.key}
                      rows={
                        Math.min(14, Math.max(3, row.value.split("\n").length + 3))
                      }
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
                  <span className="mt-1 block font-mono text-[10px] text-slate-400">
                    {row.key}
                  </span>
                </label>
              ))}
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
  );
}
