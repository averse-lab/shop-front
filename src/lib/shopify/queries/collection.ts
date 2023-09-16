import collectionFragment from "../fragments/collection";
import productFragment from "../fragments/product";
import gql from "graphql-tag";

export const getCollectionQuery = gql`
    query getCollection($handle: String!) {
        collection(handle: $handle) {
            ...collection
        }
    }
    ${collectionFragment}
`;

export const getCollectionsQuery = gql`
    query getCollections {
        collections(first: 100, sortKey: TITLE) {
            edges {
                node {
                    ...collection
                }
            }
        }
    }
    ${collectionFragment}
`;

export const getCollectionProductsQuery = gql`
    query getCollectionProducts(
        $handle: String!
        $sortKey: ProductCollectionSortKeys
        $reverse: Boolean
    ) {
        collection(handle: $handle) {
            products(sortKey: $sortKey, reverse: $reverse, first: 100) {
                edges {
                    node {
                        ...product
                    }
                }
            }
        }
    }
    ${productFragment}
`;
