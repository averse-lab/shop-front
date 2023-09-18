import { SectionsKey } from "@averse/app/_internal/types";
import { RedirectType } from "next/dist/client/components/redirect";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";
import { CATEGORIES } from "./_internal/constants";
import { CategoriesKey } from "./_internal/types";
import { SECTIONS } from "@averse/app/_internal/constants";
import { Locale } from "@averse/lib/i18n/types";

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
