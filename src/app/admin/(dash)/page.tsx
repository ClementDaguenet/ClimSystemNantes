import Link from "next/link";
import { MapPin, Settings2, Type } from "lucide-react";

export default function AdminDashboardPage() {
  const cards = [
    {
      href: "/admin/agencies",
      title: "Agences",
      desc: "Créer, modifier ou supprimer des fiches agence (carte et coordonnées).",
      Icon: MapPin,
    },
    {
      href: "/admin/parametres",
      title: "Paramètres",
      desc: "Introduction du pied de page, flyers SAV, URLs ou envoi local des fichiers.",
      Icon: Settings2,
    },
    {
      href: "/admin/textes",
      title: "Textes",
      desc: "Titres et paragraphes des pages d’accueil, Solutions, Contact, Agences, SAV.",
      Icon: Type,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        Vue d’ensemble du back-office
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">
        Les modifications sont écrites en base et reflétées au prochain rendu du
        site (sans redéployer). Sur « Textes », enregistrez{" "}
        <strong>groupe par groupe</strong> avec le bouton dédié.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ href, title, desc, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-clim-blue-300 hover:shadow-card"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-clim-blue-50 text-clim-blue-700">
                <Icon size={22} aria-hidden />
              </span>
              <div>
                <h2 className="font-semibold text-slate-900 group-hover:text-clim-blue-800">
                  {title}
                  <span className="ml-2 text-xs font-normal text-slate-400">
                    →
                  </span>
                </h2>
                <p className="mt-1 text-sm text-slate-600">{desc}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
