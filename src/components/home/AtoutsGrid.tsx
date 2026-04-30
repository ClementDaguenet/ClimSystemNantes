"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { atouts } from "@/data/atouts";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/animations";

type AtoutsGridProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function AtoutsGrid({ eyebrow, title, description }: AtoutsGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="atouts-title"
      className="bg-white py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mb-14"
        />
        <motion.ul
          role="list"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {atouts.map((atout) => {
            const Icon = atout.icon;
            return (
              <motion.li
                key={atout.id}
                variants={prefersReducedMotion ? undefined : fadeInUp}
                className="group relative flex flex-col rounded-2xl border border-clim-blue-100 bg-clim-bg p-6 transition-all duration-300 hover:border-clim-blue-300 hover:shadow-card hover:-translate-y-1"
              >
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-clim-blue-500 to-clim-blue-700 text-white transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-clim-ink">
                  {atout.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-clim-muted">
                  {atout.description}
                </p>
                {/* Accent rouge en bas */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-6 right-6 h-1 origin-left scale-x-0 rounded-full bg-clim-red-500 transition-transform duration-300 group-hover:scale-x-100"
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
