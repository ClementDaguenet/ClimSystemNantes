import Link from "next/link";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/data/navigation";
import { solutions } from "@/data/solutions";
import {
  getAgencies,
  getFooterContent,
} from "@/lib/cms/loaders";

export async function Footer() {
  const year = new Date().getFullYear();
  const [agencies, footer] = await Promise.all([
    getAgencies(),
    getFooterContent(),
  ]);
  const featured =
    agencies.find((a) => a.isFeatured) ?? agencies[0] ?? null;

  return (
    <footer className="mt-auto bg-clim-blue-900 text-clim-blue-50">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="white" height={48} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-clim-blue-100">
              {footer.intro}
            </p>
          </div>

          <nav aria-label="Plan du site">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h2>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-clim-blue-100 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Solutions">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Solutions
            </h2>
            <ul className="space-y-2 text-sm">
              {solutions.map((sol) => (
                <li key={sol.id}>
                  <Link
                    href={`/solutions#${sol.slug}`}
                    className="text-clim-blue-100 transition-colors hover:text-white"
                  >
                    {sol.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Nos agences
            </h2>
            <ul className="space-y-3 text-sm">
              {agencies.map((a) => (
                <li
                  key={a.id}
                  className="flex items-start gap-2 text-clim-blue-100"
                >
                  {a.isFeatured ? (
                    <Star
                      size={16}
                      className="mt-0.5 shrink-0 text-clim-red-400"
                      aria-hidden="true"
                      fill="currentColor"
                    />
                  ) : (
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-clim-blue-300"
                      aria-hidden="true"
                    />
                  )}
                  <span>
                    <span className="font-semibold text-white">
                      {a.city}
                    </span>
                    <br />
                    <a
                      href={`tel:${a.phone.replace(/\s/g, "")}`}
                      className="hover:text-white"
                    >
                      {a.phone}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
            {featured ? (
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <a
                  href={`mailto:${featured.email}`}
                  className="inline-flex items-center gap-2 text-clim-blue-100 hover:text-white"
                >
                  <Mail size={14} aria-hidden="true" />
                  {featured.email}
                </a>
                <a
                  href={`tel:${featured.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-clim-blue-100 hover:text-white"
                >
                  <Phone size={14} aria-hidden="true" />
                  {featured.phone}
                </a>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-clim-blue-700/60 pt-6 text-xs text-clim-blue-200 sm:flex-row sm:items-center">
          <p>© {year} Climsystem Distribution Atlantique. Tous droits réservés.</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link
                href="/mentions-legales"
                className="hover:text-white"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/politique-confidentialite"
                className="hover:text-white"
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-white">
                Plan du site
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
