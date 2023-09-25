"use client";

import { Fragment } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ProductOption, ProductVariant } from "@averse/lib/shopify/types";
import { createUrl } from "@averse/lib/utils";

type ParamsMap = {
  [key: string]: string;
};

type OptimizedVariant = {
  id: string;
  availableForSale: boolean;
  params: URLSearchParams;
  [key: string]: string | boolean | URLSearchParams;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const pathname = usePathname();
  const currentParams = useSearchParams();
  const router = useRouter();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const paramsMap: ParamsMap = Object.fromEntries(
    Array.from(currentParams.entries()).filter(([key, value]) =>
      options.find(
        (option) =>
          option.name.toLowerCase() === key && option.values.includes(value),
      ),
    ),
  );

  const optimizedVariants: OptimizedVariant[] = variants.map((variant) => {
    const optimized: OptimizedVariant = {
      id: variant.id,
      availableForSale: variant.availableForSale,
      params: new URLSearchParams(),
    };

    variant.selectedOptions.forEach((selectedOption) => {
      const name = selectedOption.name.toLowerCase();
      const value = selectedOption.value;

      optimized[name] = value;
      optimized.params.set(name, value);
    });

    return optimized;
  });

  const selectedVariant: OptimizedVariant | undefined =
    optimizedVariants.find(
      (variant) =>
        variant.availableForSale &&
        Object.entries(paramsMap).every(
          ([key, value]) => variant[key] === value,
        ),
    ) || optimizedVariants.find((variant) => variant.availableForSale);

  const selectedVariantParams = new URLSearchParams(selectedVariant?.params);
  const currentUrl = createUrl(pathname, currentParams);
  const selectedVariantUrl = createUrl(pathname, selectedVariantParams);

  if (currentUrl !== selectedVariantUrl) {
    router.replace(selectedVariantUrl);
  }

  return options.map((option) => (
    <div className='mb-8' key={option.id}>
      <Listbox value='Select size'>
        <div className='relative mt-1'>
          <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
            <span className='block truncate'>
              {`Size ${selectedVariant?.[option.name.toLowerCase()]}` ||
                "Select size"}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50'>
              {option.values.map((value, valueIdx) => {
                const optionParams = new URLSearchParams(selectedVariantParams);
                optionParams.set(option.name.toLowerCase(), value);

                const optionUrl = createUrl(pathname, optionParams);

                const isActive =
                  selectedVariantParams.get(option.name.toLowerCase()) ===
                  value;

                const isAvailableForSale = optimizedVariants.find((a) =>
                  Array.from(optionParams.entries()).every(
                    ([key, value]) => a[key] === value,
                  ),
                )?.availableForSale;

                const DynamicTag = isAvailableForSale ? Link : "p";
                const dynamicProps = {
                  ...(isAvailableForSale && { scroll: false }),
                };

                return (
                  <DynamicTag
                    key={`${option.name}-${valueIdx}`}
                    href={optionUrl}
                    title={`${option.name} ${value}${
                      !isAvailableForSale ? " (Out of Stock)" : ""
                    }`}
                    aria-disabled={!isAvailableForSale}
                    {...dynamicProps}
                  >
                    <Listbox.Option
                      key={valueIdx}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={value}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {value}
                          </span>
                          {isActive ? (
                            <span className='absolute inset-y-0 left-0 flex items-center pl-3 '>
                              <CheckIcon
                                className='h-5 w-5 text-gray-600'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  </DynamicTag>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  ));
}
