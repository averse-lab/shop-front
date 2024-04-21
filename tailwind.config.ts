import type { Config } from "tailwindcss";

const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dms)"],
      },
    },
    animation: {
      productPreviewAppearing:
        "productPreviewAppearing 200ms ease-out forwards",
      filterSelectorDesktopAppearing:
        "filterSelectorDesktopAppearing 200ms ease-out forwards",
      unblur: "unblur 100ms ease-out forwards",
    },
    keyframes: {
      productPreviewAppearing: {
        "0%": {
          opacity: "0",
        },
        "100%": {
          opacity: "1",
        },
      },
      filterSelectorDesktopAppearing: {
        "0%": {
          transform: "translateY(-12px)",
          opacity: "0",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
      unblur: {
        "0%": {
          filter: "blur(20px)",
        },
        "100%": {
          filter: "blur(0)",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: { addUtilities: any }) {
      addUtilities(
        Array.from({ length: 12 }, (_, idx) => {
          return (idx + 1) * 100;
        }).reduce<Record<string, Record<string, string>>>((acc, curr) => {
          acc[`.anim-delay-${curr}`] = {
            "animation-delay": `${curr}ms`,
          };

          return acc;
        }, {}),
      );
    }),
  ],
};
export default config;
