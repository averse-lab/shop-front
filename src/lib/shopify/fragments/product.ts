import gql from "graphql-tag";

import imageFragment from "./image";
import seoFragment from "./seo";

const productFragment = gql`
  fragment product on Product {
    id
    handle
    availableForSale
    productType
    title
    description
    descriptionHtml
    firstAdditionalVideoID: metafield(
      namespace: "custom"
      key: "additional_mux_video_id_1"
    ) {
      value
    }
    firstAdditionalVideoDescription: metafield(
      namespace: "custom"
      key: "additional_mux_video_description_1"
    ) {
      value
    }
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
  ${imageFragment}
  ${seoFragment}
`;

export default productFragment;
