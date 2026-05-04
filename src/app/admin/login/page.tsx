import Link from "next/link";
import { adminLoginAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ err?: string; next?: string }>;
}) {
  const q = await searchParams;
  const msg =
    q.err === "auth"
      ? "Mot de passe incorrect."
      : q.err === "config"
        ? "Configuration invalide. Veuillez contacter l'administrateur."
        : null;

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-xl font-bold text-slate-900">
          Connexion back-office
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Accès réservé. Veuillez contacter l'administrateur si vous n'avez pas de mot de passe.
        </p>
        {msg ? (
          <p
            className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800"
            role="alert"
          >
            {msg}
          </p>
        ) : null}
        <form action={adminLoginAction} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={q.next ?? "/admin"} />
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Mot de passe
            </span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-clim-blue-600 focus:ring-2 focus:ring-clim-blue-600/30"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-clim-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-clim-blue-800"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-clim-blue-700 hover:underline">
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  );
}
