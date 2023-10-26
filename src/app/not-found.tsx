import { FC } from "react";

import clsx from "clsx";

import { DMSans } from "@lib/fonts";

const NotFound: FC = () => {
  return (
    <html>
      <body
        className={clsx(
          DMSans.variable,
          "min-h-screen",
          "flex flex-col",
          "font-sans",
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
