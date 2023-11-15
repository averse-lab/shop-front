import { MetadataRoute } from "next";

import { I18N_LOCALES } from "@lib/i18n/config";
import { getProducts } from "@lib/shopify";
import {
  generateStaticPagesSitemapItems,
  getSupportedLanguageCodeFromLocale,
} from "@lib/utils";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const allLangProducts = await Promise.all(
    I18N_LOCALES.map((lang) =>
      getProducts({ lang: getSupportedLanguageCodeFromLocale(lang) }),
    ),
  );

  const staticPagesSitemapItems = I18N_LOCALES.reduce<
    MetadataRoute.Sitemap[0][]
  >((staticPages, lang) => {
    const langStaticPages = generateStaticPagesSitemapItems(lang);

    staticPages.push(...langStaticPages);

    return staticPages;
  }, []);

  return allLangProducts.reduce<MetadataRoute.Sitemap>(
    (sitemap, products, idx) => {
      const sitemapItems = products.map<MetadataRoute.Sitemap[0]>((product) => {
        return {
          url: `${process.env.BASE_URL}/${idx === 0 ? "fr" : "en"}/shop/${
            product.productType
          }/${product.handle}`,
          lastModified: product.updatedAt,
          changeFrequency: "monthly",
          priority: 0.8,
        };
      });

      sitemap.push(...sitemapItems);

      return sitemap;
    },
    staticPagesSitemapItems,
  );
};

export default sitemap;
