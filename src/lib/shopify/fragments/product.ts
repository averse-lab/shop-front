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
    shippingDelays: metafield(namespace: "custom", key: "shipping_delays") {
      value
    }
    darkFeaturedImage: metafield(
      namespace: "custom"
      key: "dark_featured_image"
    ) {
      value
    }
    additionalVideosLayout: metafield(
      namespace: "custom"
      key: "additional_mux_videos_layout"
    ) {
      value
    }
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
    firstAdditionalVideoWidthRatio: metafield(
      namespace: "custom"
      key: "additional_mux_video_width_ratio_1"
    ) {
      value
    }
    firstAdditionalVideoHeightRatio: metafield(
      namespace: "custom"
      key: "additional_mux_video_height_ratio_1"
    ) {
      value
    }
    secondAdditionalVideoID: metafield(
      namespace: "custom"
      key: "additional_mux_video_id_2"
    ) {
      value
    }
    secondAdditionalVideoDescription: metafield(
      namespace: "custom"
      key: "additional_mux_video_description_2"
    ) {
      value
    }
    secondAdditionalVideoWidthRatio: metafield(
      namespace: "custom"
      key: "additional_mux_video_width_ratio_2"
    ) {
      value
    }
    secondAdditionalVideoHeightRatio: metafield(
      namespace: "custom"
      key: "additional_mux_video_height_ratio_2"
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
          currentlyNotInStock
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
