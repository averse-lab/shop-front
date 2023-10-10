import gql from "graphql-tag";

import productFragment from "../fragments/product";

export const getProductQuery = gql`
  query getProduct($handle: String!, $lang: LanguageCode!)
  @inContext(language: $lang) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = gql`
  query getProducts(
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
    $lang: LanguageCode!
  ) @inContext(language: $lang) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = gql`
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;
