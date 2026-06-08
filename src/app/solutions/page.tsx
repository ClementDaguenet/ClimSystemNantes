import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SolutionSection } from "@/components/solutions/SolutionSection";
import { SolutionsNav } from "@/components/solutions/SolutionsNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { solutions } from "@/data/solutions";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { getContents } from "@/lib/cms/content";
import { cmsImageDeliveryUrl } from "@/lib/cms/mediaUrl";

export const metadata: Metadata = {
  title: "Nos solutions techniques",
  description:
    "Découvrez les 6 familles de solutions distribuées par Climsystem : chauffage, climatisation, diffusion d'air, hygrométrie, ventilation et accessoires.",
  alternates: { canonical: "/solutions" },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Accueil", url: "/" },
  { name: "Nos solutions", url: "/solutions" },
]);

const HERO_KEYS = [
  "page.solutions.hero_eyebrow",
  "page.solutions.hero_title",
  "page.solutions.hero_subtitle",
] as const;

function solutionMediaKeys(): string[] {
  return solutions.flatMap((s) => [
    `media.solutions.${s.slug}.image_url`,
    `media.solutions.${s.slug}.image_alt`,
  ]);
}

export default async function SolutionsPage() {
  const c = await getContents([...HERO_KEYS, ...solutionMediaKeys()]);

  return (
    <>
      <JsonLd id="ld-breadcrumb" data={breadcrumbSchema} />
      <section
        aria-labelledby="solutions-page-title"
        className="bg-gradient-to-br from-clim-blue-900 to-clim-blue-700 py-20 text-white sm:py-28"
      >
        <Container>
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-clim-red-400">
              {c["page.solutions.hero_eyebrow"]}
            </p>
            <h1
              id="solutions-page-title"
              className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {c["page.solutions.hero_title"]}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-clim-blue-50/90">
              {c["page.solutions.hero_subtitle"]}
            </p>
          </FadeIn>
        </Container>
      </section>

      <SolutionsNav />

      {solutions.map((sol, idx) => {
        const urlKey = `media.solutions.${sol.slug}.image_url` as const;
        const altKey = `media.solutions.${sol.slug}.image_alt` as const;
        const imageSrc = cmsImageDeliveryUrl(urlKey, c[urlKey]);
        const rawAlt = c[altKey]?.trim() ?? "";
        return (
          <SolutionSection
            key={sol.id}
            slug={sol.slug}
            reverse={idx % 2 === 1}
            imageSrc={imageSrc}
            imageAlt={rawAlt || undefined}
          />
        );
      })}
    </>
  );
}
