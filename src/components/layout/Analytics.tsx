"use client";

import { useEffect } from "react";
import { getGaMeasurementId, hasAnalyticsConsent } from "@/lib/analytics/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadGaScript(measurementId: string) {
  if (document.querySelector(`script[data-ga-id="${measurementId}"]`)) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.dataset.gaId = measurementId;
  document.head.appendChild(script);
}

/** Charge Google Analytics 4 uniquement si consentement accordé et ID configuré. */
export function Analytics() {
  useEffect(() => {
    const measurementId = getGaMeasurementId();
    if (!measurementId) return;

    const maybeLoad = () => {
      if (hasAnalyticsConsent()) loadGaScript(measurementId);
    };

    maybeLoad();
    window.addEventListener("clims:consent", maybeLoad);
    return () => window.removeEventListener("clims:consent", maybeLoad);
  }, []);

  return null;
}
