"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import {
  readConsent,
  writeConsent,
  type CookieConsentValue,
} from "@/lib/analytics/consent";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("clims:consent", onStoreChange);
  return () => window.removeEventListener("clims:consent", onStoreChange);
}

function getSnapshot(): boolean {
  return readConsent() === null;
}

function getServerSnapshot(): boolean {
  return false;
}

export function CookieConsent() {
  const visible = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const choose = (value: CookieConsentValue) => {
    writeConsent(value);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-clim-blue-200 bg-white/95 p-4 shadow-[0_-8px_32px_-8px_rgba(15,23,42,0.15)] backdrop-blur-sm sm:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3 sm:max-w-3xl">
          <Cookie
            size={22}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-clim-blue-600"
          />
          <div>
            <p
              id="cookie-consent-title"
              className="font-semibold text-clim-ink"
            >
              Cookies et mesure d&apos;audience
            </p>
            <p
              id="cookie-consent-desc"
              className="mt-1 text-sm text-clim-muted"
            >
              Nous utilisons des cookies strictement nécessaires au fonctionnement
              du site. Avec votre accord, Google Analytics mesure la fréquentation
              de façon anonymisée. Refuser n&apos;empêche pas la navigation.{" "}
              <Link
                href="/politique-confidentialite"
                className="font-medium text-clim-blue-700 underline hover:text-clim-blue-800"
              >
                En savoir plus
              </Link>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="rounded-full border border-clim-blue-200 px-5 py-2.5 text-sm font-semibold text-clim-ink transition hover:bg-clim-blue-50"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-full bg-clim-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-clim-blue-700"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
