import React, { FC } from 'react'
import Image from 'next/image'

export const Logo: FC = () => {
  return (
    <div className={'h-16 w-16 bg-black flex justify-center align-middle'}>
      <Image
        priority
        src={'/images/logo.svg'}
        width={40}
        height={40}
        alt={'Averse logo'}
      />
    </div>
  )
}
