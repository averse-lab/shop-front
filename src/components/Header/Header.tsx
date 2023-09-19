import { FC, Suspense } from "react";
import { BurgerMenu } from "./_internal/components";
import Link from "next/link";
import { Logo } from "@averse/components/icons";
import { Cart } from "./_internal/components";
import { NavItem } from "./_internal/components/BurgerMenu";
import { SECTIONS } from "@averse/app/_internal/constants";
import { Dictionnary } from "@averse/lib/i18n/types";
import { CartHint } from "./_internal/components/Cart/_internal/components";

interface IProps {
  transparent?: boolean;
  dictionary: Dictionnary;
  lang: string;
}

export const Header: FC<IProps> = (props) => {
  const { dictionary, lang } = props;

  const nav: NavItem[] = Array.from(SECTIONS, ([_, { url, i18nKey }]) => ({
    url,
    display: dictionary.menu[i18nKey],
  }));

  return (
    <header className='grid grid-cols-3 items-center px-6 py-4'>
      <BurgerMenu nav={nav} lang={lang} />
      <Link className='justify-self-center' href='/'>
        <Logo className='h-10 w-10 md:w-16 md:h-16' />
      </Link>
      {/* To refacto / improve component structure  */}
      <Suspense fallback={<CartHint className='justify-self-end' />}>
        <Cart />
      </Suspense>
    </header>
  );
};
