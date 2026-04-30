import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { brands } from "@/data/brands";

type BrandsCarouselProps = {
  title: string;
  subtitle: string;
};

export function BrandsCarousel({ title, subtitle }: BrandsCarouselProps) {
  const items = [...brands, ...brands];
  const animationDuration = `${Math.max(30, brands.length * 2.5)}s`;

  return (
    <section
      aria-labelledby="brands-title"
      className="bg-clim-bg py-14 border-y border-clim-blue-100"
    >
      <Container>
        <h2
          id="brands-title"
          className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-clim-muted"
        >
          {title}
        </h2>
        <p className="mb-8 text-center text-xs text-clim-muted/80">{subtitle}</p>
      </Container>
      <div
        className="group relative overflow-hidden"
        role="region"
        aria-label="Carrousel des marques partenaires"
      >
        {/* Voile dégradé latéral pour fondre le défilement */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-clim-bg to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-clim-bg to-transparent"
          aria-hidden="true"
        />
        {/* Pause au hover pour permettre la lecture / le clic / l'accessibilité */}
        <ul
          role="list"
          className="animate-marquee flex w-max items-center gap-6 px-6 group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
          style={{ animationDuration }}
        >
          {items.map((brand, idx) => {
            const logoSrc = brand.logo ?? `/brands/${brand.id}.png`;
            const isClone = idx >= brands.length;
            return (
              <li
                key={`${brand.id}-${idx}`}
                className="flex h-24 w-44 shrink-0 items-center justify-center rounded-xl border border-clim-blue-100 bg-white p-4 shadow-soft transition-transform duration-300 hover:scale-105"
                aria-hidden={isClone ? "true" : undefined}
              >
                <Image
                  src={logoSrc}
                  alt={isClone ? "" : `Logo ${brand.name}`}
                  width={160}
                  height={64}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
