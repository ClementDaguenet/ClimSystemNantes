"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X, Download } from "lucide-react";

const DEFAULT_ALT =
  "Flyer SAV Climsystem Distribution Atlantique — SAV toutes marques, réponse sous 24/48h";

export type FlyerLightboxProps = {
  flyerImage: string;
  imageAlt?: string;
  flyerPdf?: string;
};

export function FlyerLightbox({
  flyerImage,
  imageAlt = DEFAULT_ALT,
  flyerPdf,
}: FlyerLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const pdfHref = flyerPdf?.trim();
  const unoptimized =
    flyerImage.startsWith("/uploads") || /^https?:\/\//.test(flyerImage);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Agrandir le flyer SAV"
        className="group relative mx-auto block w-full max-w-2xl overflow-hidden rounded-3xl border border-clim-blue-100 bg-white shadow-card transition-transform duration-300 hover:-translate-y-1"
      >
        <Image
          src={flyerImage}
          alt={imageAlt}
          width={723}
          height={1024}
          sizes="(max-width: 640px) 100vw, 640px"
          className="block h-auto w-full"
          priority={false}
          unoptimized={unoptimized}
        />
        <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-clim-ink shadow-soft backdrop-blur transition-all group-hover:bg-clim-blue-700 group-hover:text-white">
          <Maximize2 size={14} aria-hidden="true" />
          Agrandir
        </span>
      </button>

      {pdfHref ? (
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={pdfHref}
            download="Climsystem-SAV.pdf"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-clim-blue-500 bg-white px-6 py-3 text-sm font-semibold text-clim-blue-700 transition-colors hover:bg-clim-blue-50"
          >
            <Download size={16} aria-hidden="true" />
            Télécharger le flyer (PDF)
          </a>
        </div>
      ) : null}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="flyer-dialog-title"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[95vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="flyer-dialog-title" className="sr-only">
                Flyer SAV Climsystem — vue agrandie
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fermer"
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-clim-ink shadow-card transition-colors hover:bg-clim-red-500 hover:text-white"
              >
                <X size={20} />
              </button>
              <div className="max-h-[95vh] overflow-y-auto">
                <Image
                  src={flyerImage}
                  alt={imageAlt}
                  width={723}
                  height={1024}
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="block h-auto w-full"
                  unoptimized={unoptimized}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
