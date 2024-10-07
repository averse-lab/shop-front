import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

import { I18N_CONFIG, I18N_LOCALES } from "@lib/i18n/config";
import { CATEGORIES, PAGES, PUBLIC_PATHS } from "@lib/routing/constants";

import type { NextRequest } from "next/server";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = I18N_CONFIG.locales;

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales as unknown as string[],
  );

  return matchLocale(languages, locales, "en");
}

export async function middleware(request: NextRequest) {
  const nextReq = request.nextUrl;
  const pathname = nextReq.pathname;
  const origin = nextReq.origin;
  const locale = getLocale(request);

  const isInMaintenanceMode = process.env.IS_IN_MAINTENANCE === "true";

  const pathnameIsPublicPath: boolean = PUBLIC_PATHS.reduce(
    (pathnameIsPublicPath, publicPath) => {
      if (pathname.startsWith(publicPath)) {
        pathnameIsPublicPath = true;
      }

      return pathnameIsPublicPath;
    },
    false,
  );

  const pathnameIsMissingLocale = I18N_LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}`),
  );

  if (isInMaintenanceMode) {
    request.nextUrl.pathname = `/${locale}/${PAGES.maintenance.url}`;

    return NextResponse.rewrite(request.nextUrl);
  }

  if (pathnameIsMissingLocale && !pathnameIsPublicPath) {
    return NextResponse.redirect(new URL(`/${locale}`, origin));
  }

  const shopRegExp = new RegExp(`\/(fr|en)\/${PAGES.shop.url}$`, "g");

  if (pathname.match(shopRegExp)) {
    return NextResponse.redirect(
      new URL(
        `/${locale}/${PAGES.shop.url}/${CATEGORIES.allProducts.url}`,
        origin,
      ),
    );
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|manual).*)"],
};
