import { FC } from "react";

import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

import { Locale } from "@lib/i18n/types";
import { PAGES } from "@lib/routing/constants";

import { CATEGORIES } from "./_internal/ShopPage.constants";

type IProps = {
  params: { lang: Locale };
};

// TODO : CHECK IF THIS CAN BE DONE VIA THE MIDDLEWARE

const ShopPage: FC<IProps> = (props) => {
  const { params } = props;
  const { lang } = params;

  redirect(
    `/${lang}/${PAGES.shop.url}/${CATEGORIES.allProducts.url}`,
    RedirectType.replace,
  );
};

export default ShopPage;
