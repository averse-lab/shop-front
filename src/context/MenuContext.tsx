'use client'
import { createContext, FC, ReactNode, useContext, useState } from 'react'

const MenuContext = createContext<IProps>({
  opened: false,
  setOpened: () => null,
})

interface IProps {
  opened: boolean
  setOpened: (opened: boolean) => void
}

export const MenuContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [opened, setOpened] = useState(false)

  return (
    <MenuContext.Provider value={{ opened, setOpened }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenuContext = () => {
  const context = useContext(MenuContext)

  if (context === undefined) {
    throw new Error('useMenuContext must be used within a MenuContextProvider')
  }

  return context
}
