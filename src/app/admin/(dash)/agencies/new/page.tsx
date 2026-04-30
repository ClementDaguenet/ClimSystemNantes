import Link from "next/link";
import { createAgencyAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function NewAgencyPage({
  searchParams,
}: {
  searchParams: Promise<{ err?: string }>;
}) {
  const q = await searchParams;

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/agencies"
        className="text-sm font-medium text-clim-blue-700 hover:underline"
      >
        ← Retour à la liste
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Nouvelle agence
      </h1>
      {q.err ? (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {decodeURIComponent(q.err)}
        </p>
      ) : null}
      <form action={createAgencyAction} className="mt-8 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              Identifiant technique (slug, ex. nantes)
            </span>
            <input
              name="id"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="nantes"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Ville</span>
            <input
              name="city"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Nom affiché
            </span>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Adresse</span>
            <input
              name="address"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Code postal</span>
            <input
              name="postalCode"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Ordre (tri)
            </span>
            <input
              name="sortOrder"
              type="number"
              defaultValue={0}
              min={0}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Téléphone</span>
            <input
              name="phone"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Horaires</span>
            <textarea
              name="hours"
              required
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Latitude (WGS84)
            </span>
            <input
              name="latitude"
              type="number"
              step="any"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Longitude</span>
            <input
              name="longitude"
              type="number"
              step="any"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              Baseline (optionnel, carte Nantes)
            </span>
            <textarea
              name="tagline"
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="isFeatured" />
          Mettre en avant (agence principale · Nantes)
        </label>
        <button
          type="submit"
          className="rounded-lg bg-clim-blue-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-clim-blue-800"
        >
          Créer l’agence
        </button>
      </form>
    </div>
  );
}
