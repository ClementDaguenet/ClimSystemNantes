import Link from "next/link";
import { requireAdminSession } from "@/lib/admin/session";
import { adminLogoutAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession();

  const nav = [
    { href: "/admin", label: "Vue d’ensemble" },
    { href: "/admin/agencies", label: "Agences" },
    { href: "/admin/parametres", label: "Paramètres site" },
    { href: "/admin/textes", label: "Textes & contenus" },
  ];

  return (
    <div className="flex min-h-[calc(100vh-0px)]">
      <aside className="flex w-60 shrink-0 flex-col gap-8 border-r border-slate-800 bg-slate-950 p-6 text-slate-200">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-clim-red-400">
            Climsystem
          </p>
          <p className="mt-1 text-lg font-bold text-white">Administration</p>
        </div>
        <nav className="flex flex-col gap-1 text-sm font-medium">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={adminLogoutAction} className="mt-auto">
          <button
            type="submit"
            className="w-full rounded-lg border border-slate-600 px-3 py-2 text-left text-sm text-slate-300 transition hover:border-clim-red-500 hover:text-white"
          >
            Déconnexion
          </button>
        </form>
      </aside>
      <main className="min-h-full flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
