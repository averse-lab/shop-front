import { VariantSelector } from './variant-selector'
import React from 'react'
import { AddToCart } from '@averse/components/cart/add-to-cart'
import Prose from '@averse/components/prose'
import Price from '@averse/components/price'
import { Product } from '@averse/lib/shopify/types'

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col  pb-6  w-2/3">
        <div className={'mb-5'}>
          <h1 className="mb-2 text-5xl font-medium uppercase">
            {product.title}
          </h1>
          <div className="text-black text-2xl">
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </div>
        </div>
        <VariantSelector
          options={product.options}
          variants={product.variants}
        />

        <AddToCart
          variants={product.variants}
          availableForSale={product.availableForSale}
        />
        {/*{product.descriptionHtml ? (*/}
        {/*  <Prose*/}
        {/*    className="mb-6 text-sm leading-tight text-black"*/}
        {/*    html={product.descriptionHtml}*/}
        {/*  />*/}
        {/*) : null}*/}
      </div>
      <div className="mb-6 flex flex-col  pb-6 dark:border-neutral-700 w-full">
        {/*{product.descriptionHtml ? (*/}
        {/*  <Prose*/}
        {/*    className="mb-6 text-sm leading-tight text-black"*/}
        {/*    html={product.descriptionHtml}*/}
        {/*  />*/}
        {/*) : null}*/}
      </div>
    </>
  )
}
