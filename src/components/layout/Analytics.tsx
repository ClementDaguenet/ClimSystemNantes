"use client";

import { useEffect } from "react";
import {
  getClarityProjectId,
  getGaMeasurementId,
  hasAnalyticsConsent,
} from "@/lib/analytics/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

function loadGaScript(measurementId: string) {
  if (document.querySelector(`script[data-ga-id="${measurementId}"]`)) return;

  window.dataLayer = window.dataLayer ?? [];
  // gtag.js attend l'objet `arguments` (et NON un Array) dans dataLayer ; sinon les
  // commandes `config`/`js` ne sont pas interprétées et GA4 ne reçoit aucune donnée.
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  window.gtag = gtag;
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

function loadClarityScript(projectId: string) {
  if (document.querySelector(`script[data-clarity-id="${projectId}"]`)) return;

  window.clarity =
    window.clarity ||
    function clarity(...args: unknown[]) {
      (window.clarity!.q = window.clarity!.q || []).push(args);
    };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${projectId}`;
  script.dataset.clarityId = projectId;
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript?.parentNode?.insertBefore(script, firstScript);
}

/** Charge GA4 et Microsoft Clarity uniquement si consentement accordé. */
export function Analytics() {
  useEffect(() => {
    const measurementId = getGaMeasurementId();
    const clarityId = getClarityProjectId();
    if (!measurementId && !clarityId) return;

    const maybeLoad = () => {
      if (!hasAnalyticsConsent()) return;
      if (measurementId) loadGaScript(measurementId);
      if (clarityId) loadClarityScript(clarityId);
    };

    maybeLoad();
    window.addEventListener("clims:consent", maybeLoad);
    return () => window.removeEventListener("clims:consent", maybeLoad);
  }, []);

  return null;
}
