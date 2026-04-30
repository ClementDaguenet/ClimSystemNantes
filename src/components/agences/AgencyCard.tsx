import { Mail, MapPin, Phone, Clock, Star } from "lucide-react";
import type { Agency } from "@/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface AgencyCardProps {
  agency: Agency;
  featured?: boolean;
}

export function AgencyCard({ agency, featured = false }: AgencyCardProps) {
  const isAccent = agency.isFeatured || featured;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${agency.address}, ${agency.postalCode} ${agency.city}`,
  )}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-300",
        isAccent
          ? "border-clim-red-500 shadow-card ring-1 ring-clim-red-500/20"
          : "border-clim-blue-100 hover:border-clim-blue-300 hover:shadow-card",
      )}
    >
      {isAccent && (
        <span
          className="animate-hq-pulse absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-clim-red-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-soft"
          aria-label="Agence mise en avant sur ce site"
        >
          <Star size={12} aria-hidden="true" fill="currentColor" />
          Agence de référence
        </span>
      )}

      <header className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-widest",
              isAccent ? "text-clim-red-500" : "text-clim-red-500",
            )}
          >
            {isAccent ? "Votre équipe locale" : "Agence"}
          </p>
          <h2
            className={cn(
              "mt-1 font-bold text-clim-ink",
              isAccent ? "text-2xl" : "text-xl",
            )}
          >
            {agency.city}
          </h2>
        </div>
        <span
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
            isAccent
              ? "bg-clim-red-500 text-white"
              : "bg-clim-blue-50 text-clim-blue-700 group-hover:bg-clim-blue-500 group-hover:text-white",
          )}
          aria-hidden="true"
        >
          <MapPin size={22} />
        </span>
      </header>

      {isAccent && agency.tagline && (
        <p className="mb-5 text-sm leading-relaxed text-clim-muted">
          {agency.tagline}
        </p>
      )}

      <ul className="space-y-3 text-sm text-clim-ink">
        <li className="flex items-start gap-3">
          <MapPin
            size={16}
            className="mt-0.5 shrink-0 text-clim-blue-500"
            aria-hidden="true"
          />
          <address className="not-italic leading-relaxed text-clim-muted">
            {agency.address}
            <br />
            {agency.postalCode} {agency.city}
          </address>
        </li>
        <li className="flex items-start gap-3">
          <Phone
            size={16}
            className="mt-0.5 shrink-0 text-clim-blue-500"
            aria-hidden="true"
          />
          <a
            href={`tel:${agency.phone.replace(/\s/g, "")}`}
            className="text-clim-muted hover:text-clim-blue-700"
          >
            {agency.phone}
          </a>
        </li>
        <li className="flex items-start gap-3">
          <Mail
            size={16}
            className="mt-0.5 shrink-0 text-clim-blue-500"
            aria-hidden="true"
          />
          <a
            href={`mailto:${agency.email}`}
            className="break-all text-clim-muted hover:text-clim-blue-700"
          >
            {agency.email}
          </a>
        </li>
        <li className="flex items-start gap-3">
          <Clock
            size={16}
            className="mt-0.5 shrink-0 text-clim-blue-500"
            aria-hidden="true"
          />
          <span className="text-clim-muted">{agency.hours}</span>
        </li>
      </ul>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button
          href={mapsUrl}
          variant="outline"
          size="sm"
          className="flex-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Itinéraire
        </Button>
        <Button href="/contact" variant="primary" size="sm" className="flex-1">
          Contacter
        </Button>
      </div>
    </article>
  );
}
