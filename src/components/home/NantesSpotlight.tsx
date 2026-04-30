import type { Agency } from "@/types";
import { Star, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

type NantesSpotlightProps = {
  agency: Agency;
  copy: {
    badge: string;
    titleBeforeGradient: string;
    titleGradient: string;
    taglineFallback: string;
    paragraphSecondary: string;
    btnNantes: string;
    btnAll: string;
    cardBadge: string;
  };
};

export function NantesSpotlight({ agency: n, copy }: NantesSpotlightProps) {
  return (
    <section
      aria-labelledby="nantes-spotlight-title"
      className="relative overflow-hidden bg-clim-blue-900 py-20 text-white sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
      >
        <div className="absolute -top-32 left-1/3 h-80 w-80 rounded-full bg-clim-red-500/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-clim-blue-400/40 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-clim-red-500/40 bg-clim-red-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-clim-red-400">
              <Star size={12} aria-hidden="true" fill="currentColor" />
              {copy.badge}
            </span>
            <h2
              id="nantes-spotlight-title"
              className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {copy.titleBeforeGradient}{" "}
              <span className="bg-gradient-to-r from-clim-red-400 to-white bg-clip-text text-transparent">
                {copy.titleGradient}
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-clim-blue-50/90">
              {n.tagline ?? copy.taglineFallback}
            </p>
            <p className="mt-3 max-w-xl text-clim-blue-100">
              {copy.paragraphSecondary}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/agences#nantes" variant="primary" size="lg">
                {copy.btnNantes}
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button
                href="/agences"
                variant="outline"
                size="lg"
                className="!border-white !text-white hover:!bg-white/10"
              >
                {copy.btnAll}
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur sm:p-8">
              <span className="animate-hq-pulse absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-clim-red-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                <Star size={10} aria-hidden="true" fill="currentColor" />
                {copy.cardBadge}
              </span>
              <h3 className="mt-2 text-2xl font-bold">{n.city}</h3>
              <p className="text-sm text-clim-blue-100">{n.name}</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-clim-red-400"
                    aria-hidden="true"
                  />
                  <address className="not-italic text-clim-blue-50">
                    {n.address}
                    <br />
                    {n.postalCode} {n.city}
                  </address>
                </li>
                <li className="flex items-start gap-3">
                  <Phone
                    size={18}
                    className="mt-0.5 shrink-0 text-clim-red-400"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${n.phone.replace(/\s/g, "")}`}
                    className="text-clim-blue-50 hover:text-white"
                  >
                    {n.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail
                    size={18}
                    className="mt-0.5 shrink-0 text-clim-red-400"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${n.email}`}
                    className="break-all text-clim-blue-50 hover:text-white"
                  >
                    {n.email}
                  </a>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
