"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { solutions } from "@/data/solutions";
import { slideInLeft, slideInRight, defaultViewport } from "@/lib/animations";
import { cn } from "@/lib/cn";

interface SolutionSectionProps {
  slug: string;
  reverse?: boolean;
}

/** Résolution par `slug` côté client (icônes Lucide non sérialisables depuis le serveur). */
export function SolutionSection({ slug, reverse = false }: SolutionSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return null;
  const Icon = solution.icon;
  const textVariants = reverse ? slideInRight : slideInLeft;
  const imgVariants = reverse ? slideInLeft : slideInRight;

  return (
    <section
      id={solution.slug}
      aria-labelledby={`${solution.slug}-title`}
      className={cn(
        "scroll-mt-24 py-20 sm:py-24",
        reverse ? "bg-clim-bg" : "bg-white",
      )}
    >
      <Container>
        <div
          className={cn(
            "grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center",
            reverse && "lg:[&>*:first-child]:order-2",
          )}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={prefersReducedMotion ? undefined : textVariants}
          >
            <div
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-clim-blue-500 to-clim-blue-700 text-white shadow-soft"
              aria-hidden="true"
            >
              <Icon size={26} />
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-clim-red-500">
              {solution.tagline}
            </p>
            <h2
              id={`${solution.slug}-title`}
              className="mt-2 text-3xl font-bold tracking-tight text-clim-ink sm:text-4xl"
            >
              {solution.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-clim-muted sm:text-lg">
              {solution.description}
            </p>
            <ul role="list" className="mt-6 space-y-3">
              {solution.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-clim-ink"
                >
                  <span
                    className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-clim-blue-50 text-clim-blue-700"
                    aria-hidden="true"
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-base">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={prefersReducedMotion ? undefined : imgVariants}
            className="relative"
          >
            {/* Placeholder visuel : carte décorative à remplacer par une photo produit. */}
            <div
              role="img"
              aria-label={solution.imageAlt}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-clim-blue-100 bg-gradient-to-br from-clim-blue-50 via-white to-clim-blue-100 shadow-card"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-50"
              >
                <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-clim-blue-200 blur-3xl" />
                <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-clim-red-100 blur-3xl" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-clim-blue-700/60">
                  <Icon size={120} strokeWidth={1.2} />
                  <span className="text-xs uppercase tracking-widest">
                    Image produit à venir
                  </span>
                </div>
              </div>
            </div>
            {/* Badge accent rouge */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 h-20 w-20 rounded-2xl bg-clim-red-500 opacity-90 sm:h-24 sm:w-24"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
