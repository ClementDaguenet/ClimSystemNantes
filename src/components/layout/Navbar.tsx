"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [previousPathname, setPreviousPathname] = useState(pathname);

  // Fermeture menu mobile au changement de route (évite useEffect ici).
  if (previousPathname !== pathname) {
    setPreviousPathname(pathname);
    if (isOpen) setIsOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-200 backdrop-blur-md",
        isScrolled
          ? "bg-white/95 border-clim-blue-100 shadow-soft"
          : "bg-white/85 border-transparent",
      )}
    >
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex h-16 w-full max-w-[84rem] items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="flex items-center"
          aria-label="Climsystem Distribution Atlantique - retour à l'accueil"
        >
          <Logo height={40} priority />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-md",
                  isActive(link.href)
                    ? "text-clim-blue-700"
                    : "text-clim-ink hover:text-clim-blue-600",
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-clim-red-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex">
          <Button href="/contact" variant="primary" size="sm">
            <Phone size={16} aria-hidden="true" />
            Nous contacter
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-clim-ink md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-clim-blue-100 bg-white overflow-hidden"
          >
            <ul className="flex flex-col px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-3 text-base font-medium",
                      isActive(link.href)
                        ? "bg-clim-blue-50 text-clim-blue-700"
                        : "text-clim-ink hover:bg-clim-blue-50",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  <Phone size={16} aria-hidden="true" />
                  Nous contacter
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
