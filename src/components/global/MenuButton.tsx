'use client'
import React from 'react'
import { useMenuContext } from '@averse/context/MenuContext'

export const MenuButton = () => {
  const { setOpened, opened } = useMenuContext()

  return (
    <div className="w-6 h-6 cursor-pointer">
      <svg
        color={'#000'}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
        onClick={() => setOpened(!opened)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  )
}
