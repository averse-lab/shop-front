import Image from 'next/image'
import { getProducts } from '@averse/lib/shopify'
import Link from 'next/link'
import { Animation } from '@averse/components/product/animation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Averse - Shop',
  description: 'Shop for products in the store.',
}

export default async function Page() {
  const products = await getProducts({ query: '' })

  const animations = [
    {
      name: 'Bounce',
      url: '',
      playbackId: 'Su26DLxRkc1MJJ5D1wBtqtcImwsXcaCw9855EGlu3k4',
      index: 1,
    },
    {
      name: 'Bounce',
      url: '',
      playbackId: 'Su26DLxRkc1MJJ5D1wBtqtcImwsXcaCw9855EGlu3k4',
      index: 8,
    },
    {
      name: 'Bounce',
      url: '',
      playbackId: 'Su26DLxRkc1MJJ5D1wBtqtcImwsXcaCw9855EGlu3k4',
      index: 9,
    },
    {
      name: 'Bounce',
      url: '',
      playbackId: 'Su26DLxRkc1MJJ5D1wBtqtcImwsXcaCw9855EGlu3k4',
      index: 10,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {products.map((item, index) => (
        <>
          <div
            key={item.id}
            className="relative border-t border-l border-black overflow-hidden"
            style={{ outline: '1px solid black', outlineOffset: '-1px' }}
          >
            <Link href={`/shop/${item.handle}`}>
              {item.images[0] && (
                <Image
                  src={item.images[0]?.url}
                  alt={item.title}
                  width={2200}
                  height={2200}
                  className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110 cursor-pointer"
                />
              )}
              <div className="absolute bottom-0 left-0 p-2 text-black">
                <h2 className={'uppercase font-sans'}>{item.title}</h2>
                <p className={'font-sans'}>
                  {item.priceRange.maxVariantPrice.amount}{' '}
                  {item.priceRange.maxVariantPrice.currencyCode}
                </p>
              </div>
            </Link>
          </div>
          {animations.map((animation) => {
            if (animation.index === index + 1) {
              return (
                <Animation
                  animation={animation}
                  key={`${animation.index}-${animation.playbackId}`}
                />
              )
            }
          })}
        </>
      ))}
    </div>
  )
}
