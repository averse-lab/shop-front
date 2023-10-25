import { FC } from "react";

import { RedirectType } from "next/dist/client/components/redirect";
import { notFound, redirect } from "next/navigation";

import { SECTIONS } from "@averse/app/[lang]/_internal/HomePage.constants";

import { Locale } from "@lib/i18n/types";

import { CATEGORIES } from "./_internal/ShopPage.constants";

type IProps = {
  params: { lang: Locale };
};

// TODO : CHECK IF THIS CAN BE DONE VIA THE MIDDLEWARE

const ShopPage: FC<IProps> = (props) => {
  const { params } = props;
  const { lang } = params;

  const allProductsCategory = CATEGORIES.allProducts;
  const shopSection = SECTIONS.shop;

  if (allProductsCategory === undefined || shopSection === undefined) {
    return notFound();
  }

  redirect(
    `/${lang}/${shopSection.url}/${allProductsCategory.url}`,
    RedirectType.replace,
  );
};

export default ShopPage;
