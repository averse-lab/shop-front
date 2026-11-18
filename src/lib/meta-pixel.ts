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

  // The pixel sets its cookies on the registrable domain, which cannot be derived reliably here.
  const hostnameParts = window.location.hostname.split(".");

  hostnameParts.forEach((_, index) => {
    const domain = hostnameParts.slice(index).join(".");

    PIXEL_COOKIES.forEach((cookie) => {
      document.cookie = `${cookie}=; path=/; max-age=0; domain=${domain}`;
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
  const clickId = getConsent() === "granted" && document.cookie.match(CLICK_ID_COOKIE_PATTERN);

  if (!META_PIXEL_ID || !clickId) {
    return url;
  }

  const urlWithClickId = new URL(url);

  urlWithClickId.searchParams.set("fbclid", clickId[1]);

  return urlWithClickId.toString();
};
