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
    productImage: metafield(namespace: "custom", key: "product_image") {
      reference {
        ... on MediaImage {
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    hideOnWebsite: metafield(namespace: "custom", key: "hide_on_website") {
      value
    }
    shippingDelays: metafield(namespace: "custom", key: "shipping_delays") {
      value
    }
    darkFeaturedImage: metafield(namespace: "custom", key: "dark_featured_image") {
      value
    }
    macroVideoId: metafield(namespace: "custom", key: "mux_macro_video_id") {
      value
    }
    additionalVideosLayout: metafield(namespace: "custom", key: "additional_mux_videos_layout") {
      value
    }
    additionalDescriptionVideoId: metafield(
      namespace: "custom"
      key: "mux_additional_description_video_id"
    ) {
      value
    }
    additionalDescription: metafield(namespace: "custom", key: "additional_description") {
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
