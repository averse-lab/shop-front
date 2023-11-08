import "server-only";

import { DocumentNode, print } from "graphql";

import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS,
} from "./constants";
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery,
} from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import { getPageQuery, getPagesQuery } from "./queries/page";
import { getPolicyQuery } from "./queries/policies";
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from "./queries/product";
import { isShopifyError } from "./type-guards";
import {
  Cart,
  Collection,
  Connection,
  ProductCustomMetafields,
  Image,
  Menu,
  Page,
  Policy,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyPolicyOperation,
  ShopifyProduct,
  ShopifyProductCustomMetafields,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
  SupportedLanguageCode,
} from "./types";

const domain = `https://${process.env.SHOPIFY_STORE_DOMAIN!}`;
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function shopifyFetch<T>({
  cache = "force-cache",
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: DocumentNode;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
        // "Accept-Language": "fr",
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query: print(query) }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        status: e.status || 500,
        message: e.message,
        query,
      };
    }

    throw {
      error: e,
      query,
    };
  }
}

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: "USD",
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
};

const reshapeCollection = (
  collection: ShopifyCollection,
): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`,
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
};

const reshapeCustomMetafields = (
  shopifyProductCustomMetafields: ShopifyProductCustomMetafields,
): ProductCustomMetafields => {
  const {
    hideOnWebsite,
    shippingDelays,
    darkFeaturedImage,
    additionalVideosLayout,
    firstAdditionalVideoID,
    firstAdditionalVideoDescription,
    firstAdditionalVideoWidthRatio,
    firstAdditionalVideoHeightRatio,
    secondAdditionalVideoID,
    secondAdditionalVideoDescription,
    secondAdditionalVideoWidthRatio,
    secondAdditionalVideoHeightRatio,
  } = shopifyProductCustomMetafields;

  return {
    hideOnWebsite:
      hideOnWebsite !== null
        ? hideOnWebsite.value === "true"
          ? true
          : hideOnWebsite.value === "false"
          ? false
          : null
        : null,
    shippingDelays: shippingDelays !== null ? shippingDelays.value : null,
    darkFeaturedImage:
      darkFeaturedImage !== null
        ? darkFeaturedImage.value === "true"
          ? true
          : darkFeaturedImage.value === "false"
          ? false
          : null
        : null,
    additionalVideosLayout:
      additionalVideosLayout !== null
        ? additionalVideosLayout.value ===
          "player to the left / description to the right"
          ? "standard"
          : additionalVideosLayout.value ===
            "player to the right / description to the left"
          ? "inversed"
          : null
        : null,
    firstAdditionalVideoID:
      firstAdditionalVideoID !== null ? firstAdditionalVideoID.value : null,
    firstAdditionalVideoDescription:
      firstAdditionalVideoDescription !== null
        ? firstAdditionalVideoDescription.value
        : null,
    firstAdditionalVideoWidthRatio:
      firstAdditionalVideoWidthRatio !== null
        ? Number(firstAdditionalVideoWidthRatio.value)
        : null,
    firstAdditionalVideoHeightRatio:
      firstAdditionalVideoHeightRatio !== null
        ? Number(firstAdditionalVideoHeightRatio.value)
        : null,
    secondAdditionalVideoID:
      secondAdditionalVideoID !== null ? secondAdditionalVideoID.value : null,
    secondAdditionalVideoDescription:
      secondAdditionalVideoDescription !== null
        ? secondAdditionalVideoDescription.value
        : null,
    secondAdditionalVideoWidthRatio:
      secondAdditionalVideoWidthRatio !== null
        ? Number(secondAdditionalVideoWidthRatio.value)
        : null,
    secondAdditionalVideoHeightRatio:
      secondAdditionalVideoHeightRatio !== null
        ? Number(secondAdditionalVideoHeightRatio.value)
        : null,
  };
};

const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true,
): Product | undefined => {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const {
    images,
    variants,
    shippingDelays,
    darkFeaturedImage,
    additionalVideosLayout,
    firstAdditionalVideoID,
    firstAdditionalVideoDescription,
    firstAdditionalVideoHeightRatio,
    firstAdditionalVideoWidthRatio,
    secondAdditionalVideoID,
    secondAdditionalVideoDescription,
    secondAdditionalVideoWidthRatio,
    secondAdditionalVideoHeightRatio,
    hideOnWebsite,
    ...rest
  } = product;

  const shopifyProductCustomMetafields = {
    hideOnWebsite,
    shippingDelays,
    darkFeaturedImage,
    additionalVideosLayout,
    firstAdditionalVideoID,
    firstAdditionalVideoDescription,
    firstAdditionalVideoHeightRatio,
    firstAdditionalVideoWidthRatio,
    secondAdditionalVideoID,
    secondAdditionalVideoDescription,
    secondAdditionalVideoWidthRatio,
    secondAdditionalVideoHeightRatio,
  };

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants),
    customMetafields: reshapeCustomMetafields(shopifyProductCustomMetafields),
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-store",
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    cache: "no-store",
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function getCollection(
  handle: string,
): Promise<Collection | undefined> {
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
    },
  });

  if (!res.body.data.collection) {
    return [];
  }

  return reshapeProducts(
    removeEdgesAndNodes(res.body.data.collection.products),
  );
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections],
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  return [
    {
      handle: "",
      title: "All",
      description: "All products",
      seo: {
        title: "All",
        description: "All products",
      },
      path: "/search",
      updatedAt: new Date().toISOString(),
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith("hidden"),
    ),
  ];
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url
        .replace(domain, "")
        .replace("/collections", "/search")
        .replace("/pages", ""),
    })) || []
  );
}

export async function getPage({
  lang,
  handle,
}: {
  lang: SupportedLanguageCode;
  handle: string;
}): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle, lang },
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery,
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(
  handle: string,
  lang: SupportedLanguageCode,
): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    cache: "no-store",
    variables: {
      handle,
      lang,
    },
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId,
    },
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
  lang,
  cache,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  lang: SupportedLanguageCode;
  cache?: RequestCache;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey,
      lang,
    },
    cache,
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getPrivacyPolicy({
  lang,
}: {
  lang: SupportedLanguageCode;
}): Promise<Policy> {
  const res = await shopifyFetch<ShopifyPolicyOperation<"privacyPolicy">>({
    query: getPolicyQuery("privacyPolicy"),
    variables: {
      lang,
    },
  });

  return res.body.data.shop.privacyPolicy;
}

export async function getTermsOfService({
  lang,
}: {
  lang: SupportedLanguageCode;
}): Promise<Policy> {
  const res = await shopifyFetch<ShopifyPolicyOperation<"termsOfService">>({
    query: getPolicyQuery("termsOfService"),
    variables: {
      lang,
    },
  });

  return res.body.data.shop.termsOfService;
}
