"use client";

import { useEffect, useState, useTransition } from "react";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

import LoadingDots from "@averse/components/loading-dots";
import { ProductVariant } from "@averse/lib/shopify/types";

import { addItem } from "./actions";

export function AddToCart({
  variants,
  availableForSale,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const variant = variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option: { value: string | null; name: string }) =>
          option.value === searchParams.get(option.name.toLowerCase()),
      ),
    );

    if (variant) {
      setSelectedVariantId(variant.id);
    }
  }, [searchParams, variants, setSelectedVariantId]);

  return (
    <button
      aria-label='Add item to cart'
      disabled={isPending}
      onClick={() => {
        if (!availableForSale) return;
        startTransition(async () => {
          const error = await addItem(selectedVariantId);

          if (error) {
            alert(error);
            return;
          }

          router.refresh();
        });
      }}
      className={clsx(
        "relative flex w-full items-center justify-center  bg-black p-4 tracking-wide text-white hover:opacity-90",
        {
          "cursor-not-allowed opacity-60": !availableForSale,
          "cursor-not-allowed": isPending,
        },
      )}
    >
      <div className='absolute left-0 ml-4'>
        {!isPending ? (
          <PlusIcon className='h-5' />
        ) : (
          <LoadingDots className='mb-3 bg-white' />
        )}
      </div>
      <span>{availableForSale ? "Add to bag" : "Out Of Stock"}</span>
    </button>
  );
}
