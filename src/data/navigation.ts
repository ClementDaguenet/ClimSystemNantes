export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/solutions", label: "Solutions" },
  { href: "/agences", label: "Agences" },
  { href: "/sav", label: "SAV" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
