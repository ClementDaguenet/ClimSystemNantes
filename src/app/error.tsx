"use client";

import { useEffect } from "react";
import { AlertOctagon, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div
        className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-clim-red-50 text-clim-red-500"
        aria-hidden="true"
      >
        <AlertOctagon size={32} />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-clim-ink sm:text-4xl">
        Une erreur est survenue
      </h1>
      <p className="mt-3 max-w-lg text-clim-muted">
        Désolé, quelque chose s&apos;est mal passé. Vous pouvez réessayer ou
        revenir à l&apos;accueil. Si le problème persiste, contactez-nous.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-clim-muted">
          Code : {error.digest}
        </p>
      )}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset} variant="primary">
          <RefreshCw size={16} aria-hidden="true" />
          Réessayer
        </Button>
        <Button href="/" variant="outline">
          <Home size={16} aria-hidden="true" />
          Retour à l&apos;accueil
        </Button>
      </div>
    </Container>
  );
}
