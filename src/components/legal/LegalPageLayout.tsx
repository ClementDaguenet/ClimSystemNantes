import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  description?: string;
  lastUpdated?: string;
  children: ReactNode;
}

export function LegalPageLayout({
  eyebrow,
  title,
  description,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      <section
        aria-labelledby="legal-page-title"
        className="bg-gradient-to-br from-clim-blue-900 to-clim-blue-700 py-16 text-white sm:py-20"
      >
        <Container size="xl">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-clim-red-400">
              {eyebrow}
            </p>
            <h1
              id="legal-page-title"
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-2xl text-base text-clim-blue-50/90 sm:text-lg">
                {description}
              </p>
            )}
            {lastUpdated && (
              <p className="mt-4 text-xs uppercase tracking-widest text-clim-blue-200">
                Dernière mise à jour : {lastUpdated}
              </p>
            )}
          </FadeIn>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container size="lg">
          <article className="legal-prose">{children}</article>
        </Container>
      </section>
    </>
  );
}
