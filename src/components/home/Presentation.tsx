"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  HardHat,
  PenTool,
  Briefcase,
  Award,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  defaultViewport,
  fadeInUp,
  staggerContainer,
} from "@/lib/animations";

const PARTNER_ICONS = [HardHat, Briefcase, PenTool, Building2] as const;
const DEFAULT_PARTNER_LABELS = [
  "Installateurs",
  "Mainteneurs",
  "Architectes",
  "Bureaux d'études",
];

export type PresentationCopy = {
  eyebrow: string;
  title: string;
  p1: string;
  p2: string;
  p3: string;
  statCaption: string;
  partnersHeading: string;
  partnersPipe: string;
  expertiseHeading: string;
  expertiseText: string;
};

type PresentationProps = {
  copy: PresentationCopy;
};

export function Presentation({ copy }: PresentationProps) {
  const prefersReducedMotion = useReducedMotion();

  const partnerLabels = copy.partnersPipe
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  const partners = PARTNER_ICONS.map((icon, i) => ({
    icon,
    label:
      partnerLabels[i] ?? DEFAULT_PARTNER_LABELS[i] ?? DEFAULT_PARTNER_LABELS[0],
  }));

  const expertise = copy.expertiseText
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section
      aria-labelledby="presentation-title"
      className="bg-white py-20 sm:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[5fr_4fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.title}
              as="h2"
              className="mb-8"
            />

            <motion.div
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={defaultViewport}
              variants={prefersReducedMotion ? undefined : staggerContainer}
              className="space-y-5 text-base leading-relaxed text-clim-muted sm:text-lg"
            >
              <motion.p variants={prefersReducedMotion ? undefined : fadeInUp}>
                {copy.p1}
              </motion.p>
              <motion.p variants={prefersReducedMotion ? undefined : fadeInUp}>
                {copy.p2}
              </motion.p>
              <motion.p variants={prefersReducedMotion ? undefined : fadeInUp}>
                {copy.p3}
              </motion.p>
            </motion.div>
          </div>

          <motion.aside
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={defaultViewport}
            variants={prefersReducedMotion ? undefined : staggerContainer}
            className="space-y-6"
          >
            {/* Carte stats : 25 ans */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeInUp}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-clim-blue-700 via-clim-blue-600 to-clim-blue-500 p-8 text-white shadow-card"
            >
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-clim-red-500/40 blur-3xl"
              />
              <div className="relative flex items-start gap-4">
                <span
                  className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur"
                  aria-hidden="true"
                >
                  <Award size={26} />
                </span>
                <div>
                  <p className="text-5xl font-bold leading-none tabular-nums sm:text-6xl">
                    <AnimatedCounter to={25} duration={1.8} />
                    <span className="text-clim-red-300">+</span>
                  </p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-clim-blue-100">
                    {copy.statCaption}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Partenaires */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeInUp}
              className="rounded-3xl border border-clim-blue-100 bg-clim-bg p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-clim-red-500">
                {copy.partnersHeading}
              </p>
              <ul role="list" className="mt-4 grid grid-cols-2 gap-3">
                {partners.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li
                      key={p.label}
                      className="flex items-center gap-2 rounded-xl border border-clim-blue-100 bg-white px-3 py-2.5 text-sm font-medium text-clim-ink"
                    >
                      <Icon
                        size={16}
                        className="shrink-0 text-clim-blue-500"
                        aria-hidden="true"
                      />
                      {p.label}
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Domaines d'expertise */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeInUp}
              className="rounded-3xl border border-clim-blue-100 bg-clim-bg p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-clim-red-500">
                {copy.expertiseHeading}
              </p>
              <ul role="list" className="mt-4 flex flex-wrap gap-2">
                {expertise.map((e) => (
                  <li
                    key={e}
                    className="rounded-full border border-clim-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-clim-blue-700"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}
