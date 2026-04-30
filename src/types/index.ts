import type { LucideIcon } from "lucide-react";

export interface Agency {
  id: string;
  name: string;
  city: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: string;
  coords: [number, number];
  isFeatured?: boolean;
  tagline?: string;
}

export interface SolutionCategory {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
  imageAlt: string;
}

export interface Atout {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
}
