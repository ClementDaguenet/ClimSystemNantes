import { Suspense } from "react";
import type { Metadata } from "next";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAgencies, getFeaturedAgency } from "@/lib/cms/loaders";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { getContents } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Climsystem pour vos demandes de devis, informations techniques ou interventions SAV. Une équipe à votre écoute dans nos 4 agences.",
  alternates: { canonical: "/contact" },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: "/" },
  { name: "Contact", url: "/contact" },
]);

const KEYS = [
  "page.contact.hero_eyebrow",
  "page.contact.hero_title",
  "page.contact.hero_subtitle",
  "page.contact.sidebar_title",
  "page.contact.sidebar_intro",
  "page.contact.featured_badge",
  "page.contact.other_heading",
  "page.contact.form_heading",
  "page.contact.form_fallback",
] as const;

export default async function ContactPage() {
  const agencies = await getAgencies();
  const featuredAgency = await getFeaturedAgency();
  const c = await getContents([...KEYS]);

  return (
    <>
      <JsonLd id="ld-breadcrumb" data={breadcrumbSchema} />
      <section
        aria-labelledby="contact-page-title"
        className="bg-gradient-to-br from-clim-blue-900 to-clim-blue-700 py-20 text-white sm:py-28"
      >
        <Container>
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-clim-red-400">
              {c["page.contact.hero_eyebrow"]}
            </p>
            <h1
              id="contact-page-title"
              className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {c["page.contact.hero_title"]}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-clim-blue-50/90">
              {c["page.contact.hero_subtitle"]}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section
        aria-labelledby="contact-form-title"
        className="bg-clim-bg py-20 sm:py-24"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
            <aside aria-labelledby="contact-info-title">
              <h2
                id="contact-info-title"
                className="text-2xl font-bold tracking-tight text-clim-ink"
              >
                {c["page.contact.sidebar_title"]}
              </h2>
              <p className="mt-3 text-clim-muted">
                {c["page.contact.sidebar_intro"]}
              </p>

              <div className="mt-8 rounded-2xl border-2 border-clim-red-500/30 bg-white p-5 shadow-soft">
                <p className="inline-flex items-center gap-1.5 rounded-full bg-clim-red-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  <Star size={10} aria-hidden="true" fill="currentColor" />
                  {c["page.contact.featured_badge"]}
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <Phone
                      size={16}
                      className="mt-0.5 shrink-0 text-clim-red-500"
                      aria-hidden="true"
                    />
                    <a
                      href={`tel:${featuredAgency.phone.replace(/\s/g, "")}`}
                      className="font-semibold text-clim-ink hover:text-clim-blue-700"
                    >
                      {featuredAgency.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail
                      size={16}
                      className="mt-0.5 shrink-0 text-clim-red-500"
                      aria-hidden="true"
                    />
                    <a
                      href={`mailto:${featuredAgency.email}`}
                      className="break-all text-clim-muted hover:text-clim-blue-700"
                    >
                      {featuredAgency.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-6 rounded-2xl border border-clim-blue-100 bg-white p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-clim-ink">
                  <MapPin size={16} className="text-clim-blue-500" aria-hidden="true" />
                  {c["page.contact.other_heading"]}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-clim-muted">
                  {agencies
                    .filter((a) => !a.isFeatured)
                    .map((a) => (
                      <li key={a.id}>
                        <span className="font-medium text-clim-ink">
                          {a.city}
                        </span>{" "}
                        -{" "}
                        <a
                          href={`tel:${a.phone.replace(/\s/g, "")}`}
                          className="hover:text-clim-blue-700"
                        >
                          {a.phone}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </aside>

            <div>
              <h2
                id="contact-form-title"
                className="mb-6 text-2xl font-bold tracking-tight text-clim-ink"
              >
                {c["page.contact.form_heading"]}
              </h2>
              <Suspense
                fallback={
                  <div
                    className="rounded-3xl border border-clim-blue-100 bg-white p-10 shadow-soft text-center text-clim-muted"
                    role="status"
                    aria-live="polite"
                  >
                    {c["page.contact.form_fallback"]}
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
