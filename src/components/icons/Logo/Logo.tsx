"use client";

import { FC, use, useEffect, useRef } from "react";

import { clsx } from "clsx";

import { HeaderContext } from "@contexts/HeaderContext/HeaderContext";

interface IProps {
  className?: string;
}

export const Logo: FC<IProps> = (props) => {
  const { className } = props;

  const logoRef = useRef<HTMLDivElement>(null);
  const { setLogoRef, logoVisible, logoType, logoColor } = use(HeaderContext);

  useEffect(() => {
    if (setLogoRef === undefined) {
      return;
    }

    setLogoRef(logoRef);
  }, [setLogoRef]);

  const contextInit = logoVisible !== undefined;

  return (
    <div
      className={clsx(
        className,
        "relative",
        "overflow-hidden transition-all delay-75 duration-500 ease-out",
        contextInit && logoVisible ? "opacity-100" : "opacity-0",
      )}
      ref={logoRef}
    >
      {logoType === "plain" ? (
        <>
          <svg
            className={clsx("relative z-10", "h-full w-full")}
            viewBox='0 0 40 40'
            xmlns='http://www.w3.org/2000/svg'
          >
            <polygon
              className={clsx(logoColor === "white" ? "fill-white" : "fill-black")}
              points='16.38 20.45 20.36 20.45 18.42 15.92 16.38 20.45'
            />
            <path
              className={clsx(logoColor === "white" ? "fill-white" : "fill-black")}
              d='m0,0v40h40V0H0Zm30,29.48h-9.01v-.92h.31c.81,0,1.37-.1,1.66-.31.21-.14.32-.34.32-.61,0-.17-.04-.36-.11-.59-.07-.23-.32-.83-.74-1.82l-.89-2.07h-6.36l-.47,1.05c-.45,1-.72,1.68-.82,2.02-.11.33-.15.63-.15.87,0,.28.08.53.22.74.14.21.36.37.65.49.4.16.93.24,1.58.24v.92h-6.17v-.92c.69-.11,1.3-.48,1.82-1.1.39-.46.97-1.55,1.74-3.26l.47-1.05h-4.03v-2.71h5.26l4.47-9.93h1.06l4.29,9.93h4.91v2.71h-3.74l.71,1.63c.77,1.8,1.29,2.86,1.56,3.18.26.31.76.51,1.49.59v.92Z'
            />
          </svg>
          <div
            className={clsx(
              "absolute left-0 top-0 z-0",
              "h-full w-full",
              "bg-white/10 backdrop-blur",
            )}
          ></div>
        </>
      ) : (
        <svg
          className={clsx("relative z-10", "h-full w-9")}
          viewBox='0 0 20.94 19.86'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            className={clsx(logoColor === "white" ? "fill-white" : "fill-black")}
            d='M0 10.4h20.94v2.84H0z'
          />
          <path
            className={clsx(logoColor === "white" ? "fill-white" : "fill-black")}
            d='M11.3 0h-1.11L3.73 14.34c-.8 1.79-1.41 2.93-1.82 3.41C1.36 18.4.72 18.78 0 18.9v.96h6.46v-.96c-.69 0-1.24-.08-1.66-.25-.3-.12-.53-.29-.68-.51-.15-.22-.23-.48-.23-.77 0-.25.05-.56.16-.91.11-.36.39-1.07.86-2.12l3.91-8.68L13 15.41c.45 1.04.71 1.67.78 1.91.08.24.12.44.12.62 0 .28-.11.49-.33.64-.31.21-.89.32-1.74.32h-.32v.96h9.44v-.96c-.76-.09-1.29-.3-1.56-.62-.28-.33-.82-1.44-1.63-3.33L11.3 0Z'
          />
        </svg>
      )}
    </div>
  );
};
