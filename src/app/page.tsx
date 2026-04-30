import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Presentation } from "@/components/home/Presentation";
import { AtoutsGrid } from "@/components/home/AtoutsGrid";
import { SolutionsPreview } from "@/components/home/SolutionsPreview";
import { BrandsCarousel } from "@/components/home/BrandsCarousel";
import { CtaBanner } from "@/components/home/CtaBanner";
import { NantesSpotlight } from "@/components/home/NantesSpotlight";
import { getContents } from "@/lib/cms/content";
import { getAgencies, getFeaturedAgency } from "@/lib/cms/loaders";
import { HOME_CONTENT_KEYS } from "@/lib/cms/homeContentKeys";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const agencies = await getAgencies();
  const featured = await getFeaturedAgency();

  const c = await getContents([...HOME_CONTENT_KEYS]);

  return (
    <>
      <Hero
        implantationCount={agencies.length}
        copy={{
          badge: c["hero.badge"],
          h1Lead: c["hero.h1_lead"],
          h1Highlight: c["hero.h1_highlight"],
          subtitle: c["hero.subtitle"],
          ctaPrimary: c["hero.cta_primary"],
          ctaSecondary: c["hero.cta_secondary"],
          statYearsLabel: c["hero.stat_years"],
          statImplantsLabel: c["hero.stat_implants"],
          statBrandsLabel: c["hero.stat_brands"],
        }}
      />
      <Presentation
        copy={{
          eyebrow: c["presentation.eyebrow"],
          title: c["presentation.title"],
          p1: c["presentation.p1"],
          p2: c["presentation.p2"],
          p3: c["presentation.p3"],
          statCaption: c["presentation.stat_caption"],
          partnersHeading: c["presentation.partners_heading"],
          partnersPipe: c["presentation.partners"],
          expertiseHeading: c["presentation.expertise_heading"],
          expertiseText: c["presentation.expertise"],
        }}
      />
      <NantesSpotlight
        agency={featured}
        copy={{
          badge: c["home.nantes.badge"],
          titleBeforeGradient: c["home.nantes.title_before_gradient"],
          titleGradient: c["home.nantes.title_gradient"],
          taglineFallback: c["home.nantes.tagline_fallback"],
          paragraphSecondary: c["home.nantes.paragraph_secondary"],
          btnNantes: c["home.nantes.btn_nantes"],
          btnAll: c["home.nantes.btn_all"],
          cardBadge: c["home.nantes.card_badge"],
        }}
      />
      <AtoutsGrid
        eyebrow={c["home.atouts.eyebrow"]}
        title={c["home.atouts.title"]}
        description={c["home.atouts.desc"]}
      />
      <SolutionsPreview
        eyebrow={c["home.solutions_preview.eyebrow"]}
        title={c["home.solutions_preview.title"]}
        description={c["home.solutions_preview.desc"]}
      />
      <CtaBanner
        title={c["home.cta.title"]}
        subtitle={c["home.cta.subtitle"]}
        btnAgencies={c["home.cta.btn_agencies"]}
        btnContact={c["home.cta.btn_contact"]}
      />
      <BrandsCarousel
        title={c["home.brands.title"]}
        subtitle={c["home.brands.subtitle"]}
      />
    </>
  );
}
