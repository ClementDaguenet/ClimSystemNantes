/**
 * Informations légales publiques du groupe Climsystem.
 * Source : registre du commerce (SIREN 437 990 252, données 2025-2026).
 * Le site « Climsystem Distribution Atlantique » est l'enseigne de l'agence Ouest ;
 * l'éditeur juridique est la société CLIMSYSTEM (siège à Châtillon).
 */
export const LEGAL_ENTITY = {
  denomination: "CLIMSYSTEM",
  commercialName: "Climsystem Distribution Atlantique",
  legalForm: "SAS, société par actions simplifiée",
  capitalSocial: "38 120",
  headquarters: "5 Rue Courtois, 92320 Châtillon",
  siren: "437 990 252",
  siretSiege: "437 990 252 00037",
  rcs: "437 990 252 R.C.S. Nanterre",
  tva: "FR38437990252",
  naf: "46.69B - Commerce de gros de fournitures et équipements industriels divers",
  activity:
    "Vente et location de matériels de traitement et régulation d'air, chauffage et climatisation.",
  publicationDirector: "Le représentant légal de la société CLIMSYSTEM",
} as const;

export const HOSTING = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  website: "https://vercel.com",
} as const;

export const DATABASE_HOSTING = {
  name: "OVHcloud (PostgreSQL)",
  website: "https://www.ovhcloud.com",
  purpose: "Base de données du CMS et des contenus éditables",
} as const;

export const EMAIL_PROVIDER = {
  name: "Resend Inc.",
  website: "https://resend.com",
  purpose: "Transmission des messages du formulaire de contact",
} as const;

export const ANALYTICS_PROVIDER = {
  name: "Google Analytics (Google Ireland Limited)",
  website: "https://analytics.google.com",
  purpose: "Mesure d'audience anonymisée, uniquement après consentement",
} as const;

export const CLARITY_PROVIDER = {
  name: "Microsoft Clarity (Microsoft Ireland Operations Limited)",
  website: "https://clarity.microsoft.com",
  purpose:
    "Analyse du comportement des visiteurs (heatmaps, sessions), uniquement après consentement",
} as const;
