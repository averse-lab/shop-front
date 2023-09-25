import { FC } from "react";

import { RedirectType } from "next/dist/client/components/redirect";
import { notFound, redirect } from "next/navigation";

import { SECTIONS } from "@averse/app/[lang]/_internal/HomePage.constants";
import { SectionsKey } from "@averse/app/[lang]/_internal/HomePage.types";

import { Locale } from "@lib/i18n/types";

import { CATEGORIES } from "./_internal/ShopPage.constants";
import { CategoriesKey } from "./_internal/ShopPage.types";

type IProps = {
  params: { lang: Locale };
};

const ShopPage: FC<IProps> = (props) => {
  const { params } = props;
  const { lang } = params;

  const allProductsCategory = CATEGORIES.get(CategoriesKey.ALL_PRODUCTS);
  const shopSection = SECTIONS.get(SectionsKey.SHOP);

  if (allProductsCategory === undefined || shopSection === undefined) {
    return notFound();
  }

  redirect(
    `/${lang}/${shopSection.url}/${allProductsCategory.url}`,
    RedirectType.replace,
  );
};

export default ShopPage;
