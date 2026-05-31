export const CONSENT_STORAGE_KEY = "clims_cookie_consent";

export type CookieConsentValue = "accepted" | "rejected";

export function readConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (raw === "accepted" || raw === "rejected") return raw;
  return null;
}

export function writeConsent(value: CookieConsentValue): void {
  localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent("clims:consent", { detail: value }));
}

export function hasAnalyticsConsent(): boolean {
  return readConsent() === "accepted";
}

export function getGaMeasurementId(): string | null {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return id && id.startsWith("G-") ? id : null;
}

export function getClarityProjectId(): string | null {
  const id = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();
  return id || null;
}
