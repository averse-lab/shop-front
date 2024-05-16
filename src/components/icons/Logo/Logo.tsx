"use client";

import { FC, use, useEffect, useRef } from "react";

import { clsx } from "clsx";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

import s from "./_internal/Logo.module.scss";

interface IProps {
  className?: string;
}

export const Logo: FC<IProps> = (props) => {
  const { className } = props;

  const logoRef = useRef<HTMLDivElement>(null);
  const { setLogoRef, logoVisible } = use(HeaderContext);

  useEffect(() => {
    if (setLogoRef === undefined) {
      return;
    }

    setLogoRef(logoRef);
  }, [setLogoRef]);

  return logoVisible !== undefined ? (
    <div
      className={clsx(
        className,
        "relative",
        "animate-appear overflow-hidden rounded-sm transition-all duration-200 ease-out",
        logoVisible ? "opacity-100" : "opacity-0",
      )}
      ref={logoRef}
    >
      <svg
        className={clsx("relative z-10", "h-full w-full")}
        viewBox='0 0 40 40'
        xmlns='http://www.w3.org/2000/svg'
      >
        <polygon
          className={clsx("fill-black")}
          points='16.38 20.45 20.36 20.45 18.42 15.92 16.38 20.45'
        />
        <path
          className={clsx("fill-black")}
          d='m0,0v40h40V0H0Zm30,29.48h-9.01v-.92h.31c.81,0,1.37-.1,1.66-.31.21-.14.32-.34.32-.61,0-.17-.04-.36-.11-.59-.07-.23-.32-.83-.74-1.82l-.89-2.07h-6.36l-.47,1.05c-.45,1-.72,1.68-.82,2.02-.11.33-.15.63-.15.87,0,.28.08.53.22.74.14.21.36.37.65.49.4.16.93.24,1.58.24v.92h-6.17v-.92c.69-.11,1.3-.48,1.82-1.1.39-.46.97-1.55,1.74-3.26l.47-1.05h-4.03v-2.71h5.26l4.47-9.93h1.06l4.29,9.93h4.91v2.71h-3.74l.71,1.63c.77,1.8,1.29,2.86,1.56,3.18.26.31.76.51,1.49.59v.92Z'
        />
      </svg>
      <div
        className={clsx("absolute left-0 top-0 z-0", "h-full w-full", "bg-white/10 backdrop-blur")}
      ></div>
    </div>
  ) : null;
};
