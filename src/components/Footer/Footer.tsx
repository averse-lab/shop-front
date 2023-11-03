import { FC } from "react";

import { MinusIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import Link from "next/link";

import { Instagram } from "@components/icons/Instagram/Instagram";
import { WeAreStudio99 } from "@components/icons/WeAreStudio99/WeAreStudio99";

import { Dictionary, Locale } from "@lib/i18n/types";
import { LinkDetail } from "@lib/routing/types";

import { FOOTER_NAV } from "./_internal/Footer.constants";

type IProps = {
  dictionary: Dictionary;
  lang: Locale;
};

export const Footer: FC<IProps> = (props) => {
  const { dictionary, lang } = props;
  const { averseInstaAriaLabel, weAreStudio99AriaLabel } = dictionary.footer;

  const nav: LinkDetail[] = Object.values(FOOTER_NAV).map(
    ({ url, i18nKey }) => ({
      href: `/${lang}/${url}`,
      display: dictionary.pages[i18nKey],
    }),
  );

  return (
    <footer
      className={clsx(
        "fixed bottom-0 left-0 -z-20",
        "w-full px-6 py-4 lg:pb-6",
        "flex flex-col gap-6",
        "bg-black",
        "text-white",
      )}
    >
      <MinusIcon className={clsx("self-center", "h-6 w-6")} />
      <div
        className={clsx(
          "mb-2",
          "flex items-center justify-between lg:flex-col lg:gap-4",
        )}
      >
        <nav className={clsx("flex flex-col gap-2 lg:flex-row lg:gap-6")}>
          {nav.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.display}
            </Link>
          ))}
        </nav>
        <Link
          aria-label={averseInstaAriaLabel}
          href='https://instagram.com/averseparis'
        >
          <Instagram
            className={clsx(
              "transition-all duration-200 ease-out lg:hover:scale-105 lg:hover:stroke-2",
            )}
          />
        </Link>
      </div>
      <div
        className={clsx("flex items-center gap-[6px] self-center", "text-sm")}
      >
        <p>Website by</p>
        <Link
          aria-label={weAreStudio99AriaLabel}
          href='https://instagram.com/wearestudio99'
        >
          <WeAreStudio99
            className={clsx(
              "h-4",
              "transition-all duration-200 ease-out lg:hover:scale-105",
            )}
          />
        </Link>
      </div>
    </footer>
  );
};
