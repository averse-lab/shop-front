import { FC } from "react";

import clsx from "clsx";

import { DMSans } from "@lib/fonts";

const NotFound: FC = () => {
  return (
    <html>
      <body
        className={clsx(
          DMSans.variable,
          "font-sans",
          "min-h-screen",
          "flex flex-col",
        )}
      >
        <main>
          <h1>not found</h1>
        </main>
      </body>
    </html>
  );
};

export default NotFound;
