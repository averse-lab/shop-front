import { getConsent } from "@lib/consent";

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Checkout and purchase events are sent by Shopify, whose pixel runs on the checkout domain.
type PixelEvent = "PageView" | "ViewContent" | "AddToCart";

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

// _fbp identifies the browser, _fbc holds the ad click as fb.<index>.<timestamp>.<fbclid>.
const PIXEL_COOKIES = ["_fbp", "_fbc"];
const CLICK_ID_COOKIE_PATTERN = /(?:^|; )_fbc=fb\.\d+\.\d+\.([^;]+)/;
// Same lifetime as the cookie the pixel writes itself.
const CLICK_ID_MAX_AGE_IN_SECONDS = 60 * 60 * 24 * 90;

const getLandingClickId = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const clickId = new URLSearchParams(window.location.search).get("fbclid");

  // The value ends up in a cookie, so anything that could alter that cookie is rejected.
  return clickId !== null && /^[\w-]+$/.test(clickId) ? clickId : null;
};

// Read once at load and held in memory only: the pixel reads the click ID from the URL, which
// client-side navigation has usually dropped by the time the visitor accepts cookies.
let pendingClickId = getLandingClickId();

const getStoredClickId = (): string | null =>
  document.cookie.match(CLICK_ID_COOKIE_PATTERN)?.[1] ?? null;

/** Writes the click ID the way the pixel would have, had it been allowed to run on landing. */
const storePendingClickId = () => {
  if (pendingClickId !== null && pendingClickId !== getStoredClickId()) {
    // Meta's format numbers the domain the cookie is set on: 1 for example.com, 2 for www.example.com.
    const domainIndex = window.location.hostname.split(".").length - 1;

    document.cookie = `_fbc=fb.${domainIndex}.${Date.now()}.${pendingClickId}; path=/; max-age=${CLICK_ID_MAX_AGE_IN_SECONDS}; samesite=lax`;
  }

  pendingClickId = null;
};

let consentRevoked = false;

/** Meta's base code: queues calls in a stub until fbevents.js has loaded. */
const loadPixel = (pixelId: string): Fbq => {
  if (window.fbq) {
    return window.fbq;
  }

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  }) as Fbq;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", pixelId);

  return fbq;
};

/** Does nothing unless a pixel is configured and the visitor accepted cookies. */
export const trackPixelEvent = (event: PixelEvent, params?: Record<string, unknown>) => {
  if (!META_PIXEL_ID || getConsent() !== "granted") {
    return;
  }

  storePendingClickId();

  const fbq = loadPixel(META_PIXEL_ID);

  if (consentRevoked) {
    fbq("consent", "grant");
    consentRevoked = false;
  }

  fbq("track", event, params);
};

/** Stops an already loaded pixel and removes its cookies once consent is withdrawn. */
export const revokePixelConsent = () => {
  if (!window.fbq || consentRevoked) {
    return;
  }

  window.fbq("consent", "revoke");
  consentRevoked = true;

  // The pixel sets its cookies on the registrable domain, which cannot be derived reliably
  // here, so every parent domain is cleared, plus the host itself for the click ID stored above.
  const hostnameParts = window.location.hostname.split(".");
  const domainAttributes = [
    "",
    ...hostnameParts.map((_, index) => `; domain=${hostnameParts.slice(index).join(".")}`),
  ];

  domainAttributes.forEach((domainAttribute) => {
    PIXEL_COOKIES.forEach((cookie) => {
      document.cookie = `${cookie}=; path=/; max-age=0${domainAttribute}`;
    });
  });
};

/** Shopify's Meta catalogue identifies items by the numeric part of the global ID. */
export const getPixelContentId = (shopifyGlobalId: string): string =>
  shopifyGlobalId.split("?")[0].split("/").pop() ?? shopifyGlobalId;

/**
 * The checkout lives on Shopify's domain, where our cookies are out of reach: the ad click
 * has to travel in the URL for Shopify's pixel to attribute the purchase to it.
 */
export const withPixelClickId = (url: string): string => {
  const clickId = getConsent() === "granted" ? getStoredClickId() : null;

  if (!META_PIXEL_ID || clickId === null) {
    return url;
  }

  const urlWithClickId = new URL(url);

  urlWithClickId.searchParams.set("fbclid", clickId);

  return urlWithClickId.toString();
};
