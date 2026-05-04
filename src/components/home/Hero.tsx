"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export type HeroCopy = {
  badge: string;
  h1Lead: string;
  h1Highlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  statYearsLabel: string;
  statImplantsLabel: string;
  statBrandsLabel: string;
};

type HeroProps = {
  implantationCount: number;
  copy: HeroCopy;
  /** Chemin /public/… ou URL HTTPS - si absent, affiche le visuel géométrique par défaut */
  heroImageSrc?: string;
  heroImageAlt?: string;
};

export function Hero({
  implantationCount,
  copy,
  heroImageSrc,
  heroImageAlt,
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const blobY3 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const fade = (delay = 0) => ({
    initial: prefersReducedMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-br from-clim-blue-900 via-clim-blue-700 to-clim-blue-500 text-white"
    >
      {/* Décor : bulles lumineuses avec parallax doux */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { y: blobY1 }}
          className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-clim-blue-400 blur-3xl"
        />
        <motion.div
          style={prefersReducedMotion ? undefined : { y: blobY2 }}
          className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-clim-red-500/40 blur-3xl"
        />
        <motion.div
          style={prefersReducedMotion ? undefined : { y: blobY3 }}
          className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-clim-blue-300/30 blur-3xl"
        />
      </div>

      <Container className="relative py-20 sm:py-28 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.span
              {...fade(0)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur"
            >
              <Sparkles size={14} aria-hidden="true" className="text-clim-red-400" />
              {copy.badge}
            </motion.span>

            <motion.h1
              id="hero-title"
              {...fade(0.1)}
              className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              {copy.h1Lead}{" "}
              <span className="animate-hero-shimmer bg-gradient-to-r from-clim-red-400 via-white to-clim-red-400 bg-clip-text text-transparent">
                {copy.h1Highlight}
              </span>
            </motion.h1>

            <motion.p
              {...fade(0.2)}
              className="mt-6 max-w-xl text-lg text-clim-blue-50/90 sm:text-xl"
            >
              {copy.subtitle}
            </motion.p>

            <motion.div
              {...fade(0.3)}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="/solutions" variant="primary" size="lg">
                {copy.ctaPrimary}
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="!border-white !text-white hover:!bg-white/10"
              >
                {copy.ctaSecondary}
              </Button>
            </motion.div>

            <motion.dl
              {...fade(0.4)}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-white/20 pt-8"
            >
              {[
                { value: 25, suffix: "+", label: copy.statYearsLabel },
                {
                  value: implantationCount,
                  suffix: "",
                  label: copy.statImplantsLabel,
                },
                {
                  value: 33,
                  suffix: "+",
                  label: copy.statBrandsLabel,
                },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-2xl font-bold tabular-nums sm:text-3xl">
                    <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                  </dt>
                  <dd className="mt-1 text-xs text-clim-blue-100 sm:text-sm">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            {...fade(0.3)}
            className="relative hidden lg:block"
            aria-hidden="true"
          >
            <div className="relative ml-auto aspect-square w-full max-w-lg">
              {heroImageSrc ? (
                <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-3xl border border-white/30 shadow-xl">
                  <Image
                    src={heroImageSrc}
                    alt={heroImageAlt?.trim() || ""}
                    fill
                    sizes="(max-width: 1024px) 0vw, 36vw"
                    className="object-cover"
                    priority
                    unoptimized={
                      /^https?:\/\//i.test(heroImageSrc) ||
                      heroImageSrc.startsWith("data:image/")
                    }
                  />
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30" />
                  <div className="absolute inset-6 rounded-2xl bg-gradient-to-br from-clim-blue-300/30 to-clim-red-500/20 border border-white/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="180"
                      height="180"
                      viewBox="0 0 180 180"
                      fill="none"
                      className="text-white/90"
                      aria-hidden="true"
                    >
                      <circle
                        cx="90"
                        cy="90"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity="0.3"
                      />
                      <circle
                        cx="90"
                        cy="90"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity="0.5"
                      />
                      <g
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      >
                        <line x1="90" y1="40" x2="90" y2="60" />
                        <line x1="90" y1="120" x2="90" y2="140" />
                        <line x1="40" y1="90" x2="60" y2="90" />
                        <line x1="120" y1="90" x2="140" y2="90" />
                        <line x1="55" y1="55" x2="68" y2="68" />
                        <line x1="112" y1="112" x2="125" y2="125" />
                        <line x1="125" y1="55" x2="112" y2="68" />
                        <line x1="68" y1="112" x2="55" y2="125" />
                      </g>
                      <circle cx="90" cy="90" r="8" fill="currentColor" />
                    </svg>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
