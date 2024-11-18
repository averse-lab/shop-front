import { FC } from "react";

import clsx from "clsx";

import { Dictionary } from "@lib/i18n/types";

type Props = {
  inStock: boolean;
  dictionary: Dictionary;
  shippingDelays: string | null;
};

export const AvailabilityIndicator: FC<Props> = (props) => {
  const { inStock, dictionary, shippingDelays } = props;

  return (
    <div className={clsx("mt-5", "flex items-center gap-4")}>
      <div
        className={clsx("h-3 w-3", "flex-shrink-0", inStock ? "bg-neutral-400" : "bg-green-600")}
      ></div>
      <p className={clsx("italic")}>
        {inStock
          ? `${dictionary.product.madeToOrder} ${
              shippingDelays
                ? `${dictionary.product.notInStockCustom} ${shippingDelays}`
                : dictionary.product.notInStock
            }`
          : dictionary.product.inStock}
      </p>
    </div>
  );
};
