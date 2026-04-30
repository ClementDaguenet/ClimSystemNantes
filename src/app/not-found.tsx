import { Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div
        className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-clim-blue-50 text-clim-blue-700"
        aria-hidden="true"
      >
        <Compass size={32} />
      </div>
      <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-clim-red-500">
        Erreur 404
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-clim-ink sm:text-4xl">
        Page introuvable
      </h1>
      <p className="mt-3 max-w-lg text-clim-muted">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Button href="/" variant="primary" className="mt-8">
        <Home size={16} aria-hidden="true" />
        Retour à l&apos;accueil
      </Button>
    </Container>
  );
}
