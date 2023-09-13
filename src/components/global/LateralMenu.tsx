'use client'
import { FC } from 'react'
import { useMenuContext } from '@averse/context/MenuContext'
import Link from 'next/link'

export const LateralMenu: FC = () => {
  const { opened, setOpened } = useMenuContext()

  const commonClasses = 'fixed bg-black text-white z-50'
  const conditionalClasses = opened
    ? 'transform translate-x-0'
    : 'transform -translate-x-full'
  const mobileClasses = 'w-screen h-screen'
  const desktopClasses = 'md:w-1/4 md:h-1/4 md:top-5 md:left-5'

  return (
    opened && (
      <div
        className={`${commonClasses} ${conditionalClasses} ${mobileClasses} ${desktopClasses}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="21"
          fill="none"
          className="absolute top-4 left-4 cursor-pointer"
          onClick={() => setOpened(!opened)}
        >
          <path
            stroke="#fff"
            strokeWidth="4"
            d="M2.41421 1.58579 20.4142 19.5858m-18.82841 0L19.5858 1.58579"
          />
        </svg>
        <ul className="flex flex-col h-full justify-center uppercase">
          <li className="flex items-center justify-center px-8 py-2 ">
            <Link
              className="text-xl font-bold"
              href={'/'}
              onClick={() => setOpened(!opened)}
            >
              Home
            </Link>
          </li>
          <li className="flex items-center  justify-center px-8 py-2">
            <Link
              className="text-xl font-bold"
              href={'/shop'}
              onClick={() => setOpened(!opened)}
            >
              Shop
            </Link>
          </li>
          <li className="flex items-center justify-center px-8 py-2">
            <Link
              className="text-xl font-bold"
              href={'/about'}
              onClick={() => setOpened(!opened)}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    )
  )
}
