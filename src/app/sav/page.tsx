import type { Metadata } from "next";
import {
  Wrench,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlyerLightbox } from "@/components/sav/FlyerLightbox";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { getSavContent } from "@/lib/cms/loaders";
import { getContents } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Service Après-Vente",
  description:
    "Service Après-Vente toutes marques de Climsystem Distribution Atlantique. Réponse sous 24/48h. Contact dédié : Alexis Colas, 06 31 95 16 94, a.colas@climsystem.com",
  alternates: { canonical: "/sav" },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: "/" },
  { name: "Service Après-Vente", url: "/sav" },
]);

const KEYS = [
  "page.sav.hero_badge",
  "page.sav.hero_h1_before",
  "page.sav.hero_strong",
  "page.sav.hero_h1_after",
  "page.sav.hero_intro",
  "page.sav.f1.title",
  "page.sav.f1.desc",
  "page.sav.f2.title",
  "page.sav.f2.desc",
  "page.sav.f3.title",
  "page.sav.f3.desc",
  "page.sav.section_flyer.eyebrow",
  "page.sav.section_flyer.title",
  "page.sav.section_flyer.desc",
  "page.sav.cta_bottom.eyebrow",
  "page.sav.cta_bottom.title_line1",
  "page.sav.cta_bottom.title_gradient",
  "page.sav.cta_bottom.intro",
  "page.sav.cta_bottom.btn_intervention",
  "page.sav.cta_bottom.btn_agency",
  "page.sav.sidebar.badge",
  "page.sav.sidebar.name",
  "page.sav.sidebar.role",
  "page.sav.sidebar.phone",
  "page.sav.sidebar.phone_href",
  "page.sav.sidebar.email",
  "page.sav.sidebar.response_line",
  "page.sav.a11y_features_heading",
] as const;

const featureIcons = [ShieldCheck, Clock, Phone] as const;

export default async function SavPage() {
  const sav = await getSavContent();
  const flyerPdf = sav.flyerPdf?.trim();
  const c = await getContents([...KEYS]);

  const featureTriples = [
    { titleKey: "page.sav.f1.title" as const, descKey: "page.sav.f1.desc" as const },
    { titleKey: "page.sav.f2.title" as const, descKey: "page.sav.f2.desc" as const },
    { titleKey: "page.sav.f3.title" as const, descKey: "page.sav.f3.desc" as const },
  ];

  return (
    <>
      <JsonLd id="ld-breadcrumb" data={breadcrumbSchema} />
      <section
        aria-labelledby="sav-page-title"
        className="bg-gradient-to-br from-clim-red-600 via-clim-red-500 to-clim-blue-700 py-20 text-white sm:py-28"
      >
        <Container>
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur">
              <Wrench size={14} aria-hidden="true" />
              {c["page.sav.hero_badge"]}
            </span>
            <h1
              id="sav-page-title"
              className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {c["page.sav.hero_h1_before"]}
              <strong className="font-extrabold text-white">
                {c["page.sav.hero_strong"]}
              </strong>
              {c["page.sav.hero_h1_after"]}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/90">
              {c["page.sav.hero_intro"]}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section
        aria-labelledby="sav-features"
        className="bg-white py-20 sm:py-24"
      >
        <Container>
          <h2 id="sav-features" className="sr-only">
            {c["page.sav.a11y_features_heading"]}
          </h2>
          <ul role="list" className="grid gap-6 sm:grid-cols-3">
            {featureTriples.map((row, idx) => {
              const Icon = featureIcons[idx];
              return (
                <FadeIn as="li" key={row.titleKey} delay={idx * 0.1}>
                  <div className="rounded-2xl border border-clim-blue-100 bg-clim-bg p-6 h-full">
                    <div
                      className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-clim-red-500 to-clim-red-600 text-white"
                      aria-hidden="true"
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-semibold text-clim-ink">
                      {c[row.titleKey]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-clim-muted">
                      {c[row.descKey]}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="sav-flyer-title"
        className="bg-clim-bg py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            as="h2"
            eyebrow={c["page.sav.section_flyer.eyebrow"]}
            title={c["page.sav.section_flyer.title"]}
            description={c["page.sav.section_flyer.desc"]}
            align="center"
            className="mb-10"
          />
          <FlyerLightbox
            flyerImage={sav.flyerImage}
            imageAlt={sav.imageAlt?.trim()}
            flyerPdf={flyerPdf}
          />
        </Container>
      </section>

      <section
        aria-labelledby="sav-contact-title"
        className="relative overflow-hidden bg-clim-blue-900 py-20 text-white sm:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
        >
          <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-clim-red-500 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-clim-blue-400 blur-3xl" />
        </div>
        <Container className="relative">
          <FadeIn className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-clim-red-400">
                {c["page.sav.cta_bottom.eyebrow"]}
              </p>
              <h2
                id="sav-contact-title"
                className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
              >
                {c["page.sav.cta_bottom.title_line1"]}
                <br />
                <span className="bg-gradient-to-r from-clim-red-400 to-white bg-clip-text text-transparent">
                  {c["page.sav.cta_bottom.title_gradient"]}
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-clim-blue-100">
                {c["page.sav.cta_bottom.intro"]}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact?sujet=SAV" variant="primary" size="lg">
                  <Wrench size={18} aria-hidden="true" />
                  {c["page.sav.cta_bottom.btn_intervention"]}
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
                <Button
                  href="/agences"
                  variant="outline"
                  size="lg"
                  className="!border-white !text-white hover:!bg-white/10"
                >
                  {c["page.sav.cta_bottom.btn_agency"]}
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-clim-red-400">
                {c["page.sav.sidebar.badge"]}
              </p>
              <p className="mt-2 text-2xl font-bold sm:text-3xl">
                {c["page.sav.sidebar.name"]}
              </p>
              <p className="text-sm text-clim-blue-100">
                {c["page.sav.sidebar.role"]}
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone
                    size={18}
                    className="mt-0.5 shrink-0 text-clim-red-400"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${c["page.sav.sidebar.phone_href"]}`}
                    className="text-clim-blue-50 hover:text-white"
                  >
                    {c["page.sav.sidebar.phone"]}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail
                    size={18}
                    className="mt-0.5 shrink-0 text-clim-red-400"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${c["page.sav.sidebar.email"]}`}
                    className="break-all text-clim-blue-50 hover:text-white"
                  >
                    {c["page.sav.sidebar.email"]}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock
                    size={18}
                    className="mt-0.5 shrink-0 text-clim-red-400"
                    aria-hidden="true"
                  />
                  <span className="text-clim-blue-50">
                    {c["page.sav.sidebar.response_line"]}
                  </span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
