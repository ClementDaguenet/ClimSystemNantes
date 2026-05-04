import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminAgenciesListPage() {
  const agencies = await prisma.agency.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Agences</h1>
          <p className="mt-1 text-sm text-slate-600">
            Ordre affiché = tri personnalisé (sortOrder croissant).
          </p>
        </div>
        <Link
          href="/admin/agencies/new"
          className="rounded-lg bg-clim-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-clim-blue-800"
        >
          Nouvelle agence
        </Link>
      </div>
      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-3">Ville</th>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Mis en avant</th>
              <th className="px-4 py-3">Ordre</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {agencies.map((a) => (
              <tr key={a.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {a.city}
                </td>
                <td className="px-4 py-3 text-slate-600">{a.name}</td>
                <td className="px-4 py-3">
                  {a.isFeatured ? (
                    <span className="rounded-full bg-clim-red-100 px-2 py-0.5 text-xs font-semibold text-clim-red-800">
                      Oui
                    </span>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 tabular-nums text-slate-600">
                  {a.sortOrder}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/agencies/${encodeURIComponent(a.id)}`}
                    className="font-medium text-clim-blue-700 hover:underline"
                  >
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
