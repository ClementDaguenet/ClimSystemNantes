import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AgencyCard } from "@/components/agences/AgencyCard";
import { AgenciesMap } from "@/components/agences/AgenciesMap";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAgencies } from "@/lib/cms/loaders";
import { getContents } from "@/lib/cms/content";
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchemas,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Nos agences",
  description:
    "Climsystem Distribution Atlantique : forte présence à Nantes, agences à Châtillon, Tours et Aubagne. Coordonnées, horaires et carte.",
  alternates: { canonical: "/agences" },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: "/" },
  { name: "Nos agences", url: "/agences" },
]);

const KEYS = [
  "page.agences.hero_eyebrow",
  "page.agences.hero_title_before",
  "page.agences.hero_title_accent",
  "page.agences.hero_subtitle",
  "page.agences.nantes.section_eyebrow",
  "page.agences.nantes.section_title",
  "page.agences.nantes.section_description",
  "page.agences.satellites.section_eyebrow",
  "page.agences.satellites.section_title",
  "page.agences.satellites.section_description",
  "page.agences.map.section_eyebrow",
  "page.agences.map.section_title",
  "page.agences.map.section_description",
] as const;

export default async function AgenciesPage() {
  const agencies = await getAgencies();
  const featuredAgency =
    agencies.find((a) => a.isFeatured) ?? agencies[0] ?? null;
  const satelliteAgencies = agencies.filter((a) => !a.isFeatured);
  const localBusinessSchemas = buildLocalBusinessSchemas(agencies);
  const c = await getContents([...KEYS]);

  return (
    <>
      <JsonLd id="ld-breadcrumb" data={breadcrumbSchema} />
      {localBusinessSchemas.map((schema, idx) => (
        <JsonLd
          key={agencies[idx].id}
          id={`ld-agency-${agencies[idx].id}`}
          data={schema}
        />
      ))}
      <section
        aria-labelledby="agencies-page-title"
        className="bg-gradient-to-br from-clim-blue-900 to-clim-blue-700 py-20 text-white sm:py-28"
      >
        <Container>
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-clim-red-400">
              {c["page.agences.hero_eyebrow"]}
            </p>
            <h1
              id="agencies-page-title"
              className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {c["page.agences.hero_title_before"]}{" "}
              <span className="text-clim-red-400">
                {c["page.agences.hero_title_accent"]}
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-clim-blue-50/90">
              {c["page.agences.hero_subtitle"]}
            </p>
          </FadeIn>
        </Container>
      </section>

      {featuredAgency ? (
        <section
          id="nantes"
          aria-labelledby="nantes-agency-title"
          className="scroll-mt-24 bg-white py-20 sm:py-24"
        >
          <Container>
            <SectionHeading
              as="h2"
              eyebrow={c["page.agences.nantes.section_eyebrow"]}
              title={c["page.agences.nantes.section_title"]}
              description={c["page.agences.nantes.section_description"]}
              className="mb-12"
            />
            <div className="max-w-3xl">
              <AgencyCard agency={featuredAgency} featured />
            </div>
            <p id="nantes-agency-title" className="sr-only">
              Coordonnées de l’agence mise en avant
            </p>
          </Container>
        </section>
      ) : null}

      <section
        aria-labelledby="satellites-title"
        className="bg-clim-bg py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            as="h2"
            eyebrow={c["page.agences.satellites.section_eyebrow"]}
            title={c["page.agences.satellites.section_title"]}
            description={c["page.agences.satellites.section_description"]}
            className="mb-12"
          />
          <ul
            role="list"
            id="satellites-title"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {satelliteAgencies.map((a) => (
              <li key={a.id}>
                <AgencyCard agency={a} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="agencies-map-title"
        className="bg-white py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            as="h2"
            eyebrow={c["page.agences.map.section_eyebrow"]}
            title={c["page.agences.map.section_title"]}
            description={c["page.agences.map.section_description"]}
            className="mb-10"
          />
          <FadeIn>
            <AgenciesMap agencies={agencies} />
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
