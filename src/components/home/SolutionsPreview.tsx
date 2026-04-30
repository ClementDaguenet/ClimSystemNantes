"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { solutions } from "@/data/solutions";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/animations";

type SolutionsPreviewProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SolutionsPreview({
  eyebrow,
  title,
  description,
}: SolutionsPreviewProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="solutions-preview-title"
      className="bg-clim-bg py-20 sm:py-24"
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
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {solutions.map((sol) => {
            const Icon = sol.icon;
            return (
              <motion.li
                key={sol.id}
                variants={prefersReducedMotion ? undefined : fadeInUp}
              >
                <Link
                  href={`/solutions#${sol.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-clim-blue-100 bg-white p-6 transition-all duration-300 hover:border-clim-blue-500 hover:shadow-card hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-clim-blue-50 text-clim-blue-700 transition-colors group-hover:bg-clim-blue-500 group-hover:text-white"
                      aria-hidden="true"
                    >
                      <Icon size={26} />
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-clim-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-clim-red-500"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-clim-ink">
                    {sol.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-clim-red-500">
                    {sol.tagline}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-clim-muted">
                    {sol.description}
                  </p>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
