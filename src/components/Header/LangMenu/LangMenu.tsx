"use client";

import { FC, useState } from "react";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { LangButton } from "@components/Header/LangMenu/LangButton/LangButton";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import { Dictionary, Locale } from "@lib/i18n/types";

interface IProps {
  lang: Locale;
  className?: string;
  dictionary: Dictionary;
}

type Checked = DropdownMenuCheckboxItemProps["checked"];

export const LangMenu: FC<IProps> = (props) => {
  const { dictionary, lang, className } = props;

  const [menuOpen, setMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setMenuOpen(true);
  // };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <LangButton ariaLabel='Language' onClick={() => {}} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>Français</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>English</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
