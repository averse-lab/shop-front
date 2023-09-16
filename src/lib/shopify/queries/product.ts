import productFragment from "../fragments/product";
import gql from "graphql-tag";

export const getProductQuery = gql`
    query getProduct($handle: String!) {
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
    ) {
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
