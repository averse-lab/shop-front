import { useSyncExternalStore } from "react";

export type Consent = "granted" | "denied";

const COOKIE_NAME = "cookieConsent";
// The CNIL recommends asking again after 6 months.
const MAX_AGE_IN_SECONDS = 60 * 60 * 24 * 182;

const listeners = new Set<() => void>();

/** `null` means the visitor has not chosen yet. */
export const getConsent = (): Consent | null => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=(granted|denied)`));

  return match ? (match[1] as Consent) : null;
};

/** Passing `null` forgets the choice, which makes the banner ask again. */
export const setConsent = (consent: Consent | null) => {
  const maxAge = consent === null ? 0 : MAX_AGE_IN_SECONDS;

  document.cookie = `${COOKIE_NAME}=${consent ?? ""}; path=/; max-age=${maxAge}; samesite=lax`;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const getServerSnapshot = () => undefined;

/** `undefined` while rendering on the server and hydrating, when the choice cannot be read. */
export const useConsent = (): Consent | null | undefined =>
  useSyncExternalStore(subscribe, getConsent, getServerSnapshot);
