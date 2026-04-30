import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

type CtaBannerProps = {
  title: string;
  subtitle: string;
  btnAgencies: string;
  btnContact: string;
};

export function CtaBanner({
  title,
  subtitle,
  btnAgencies,
  btnContact,
}: CtaBannerProps) {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-clim-blue-700 py-16 text-white sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
      >
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-clim-red-500 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-clim-blue-300 blur-3xl" />
      </div>
      <Container className="relative">
        <FadeIn className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="cta-title" className="text-3xl font-bold sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-clim-blue-50/90">{subtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button href="/agences" variant="outline" size="lg" className="!border-white !text-white hover:!bg-white/10">
              <MapPin size={18} aria-hidden="true" />
              {btnAgencies}
            </Button>
            <Button href="/contact" variant="primary" size="lg">
              {btnContact}
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
