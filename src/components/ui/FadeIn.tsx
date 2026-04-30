"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp, defaultViewport } from "@/lib/animations";

interface FadeInProps {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "li" | "ul";
}

export function FadeIn({
  children,
  variants = fadeInUp,
  delay = 0,
  className,
  as = "div",
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
