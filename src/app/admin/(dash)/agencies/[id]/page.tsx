import Link from "next/link";
import { notFound } from "next/navigation";
import {
  deleteAgencyAction,
  updateAgencyAction,
} from "@/app/admin/actions";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EditAgencyPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ err?: string }>;
}) {
  const { id } = await params;
  const q = await searchParams;

  const agency = await prisma.agency.findUnique({ where: { id } });
  if (!agency) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/agencies"
        className="text-sm font-medium text-clim-blue-700 hover:underline"
      >
        ← Retour à la liste
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Modifier · {agency.city}
      </h1>
      <p className="mt-1 text-xs text-slate-500">Identifiant : {agency.id}</p>
      {q.err ? (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {decodeURIComponent(q.err)}
        </p>
      ) : null}
      <form
        action={updateAgencyAction.bind(null, agency.id)}
        className="mt-8 space-y-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Ville</span>
            <input
              name="city"
              required
              defaultValue={agency.city}
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
              defaultValue={agency.name}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Adresse</span>
            <input
              name="address"
              required
              defaultValue={agency.address}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Code postal</span>
            <input
              name="postalCode"
              required
              defaultValue={agency.postalCode}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Ordre (tri)</span>
            <input
              name="sortOrder"
              type="number"
              defaultValue={agency.sortOrder}
              min={0}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Téléphone</span>
            <input
              name="phone"
              required
              defaultValue={agency.phone}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              name="email"
              type="email"
              required
              defaultValue={agency.email}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Horaires</span>
            <textarea
              name="hours"
              required
              rows={2}
              defaultValue={agency.hours}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Latitude</span>
            <input
              name="latitude"
              type="number"
              step="any"
              required
              defaultValue={agency.latitude}
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
              defaultValue={agency.longitude}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Baseline</span>
            <textarea
              name="tagline"
              rows={2}
              defaultValue={agency.tagline ?? ""}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={agency.isFeatured}
          />
          Mettre en avant (agence principale)
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-lg bg-clim-blue-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-clim-blue-800"
          >
            Enregistrer
          </button>
        </div>
      </form>
      <form
        action={deleteAgencyAction.bind(null, agency.id)}
        className="mt-10 border-t border-slate-200 pt-8"
      >
        <p className="text-sm font-medium text-slate-700">Zone de danger</p>
        <p className="mt-1 text-xs text-slate-500">
          La suppression est définitive. Impossible s&apos;il ne reste qu&apos;une
          agence.
        </p>
        <button
          type="submit"
          className="mt-3 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-100"
        >
          Supprimer cette agence
        </button>
      </form>
    </div>
  );
}
