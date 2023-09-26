import gql from "graphql-tag";

import seoFragment from "./seo";

const collectionFragment = gql`
  fragment collection on Collection {
    handle
    title
    description
    seo {
      ...seo
    }
    updatedAt
  }
  ${seoFragment}
`;

export default collectionFragment;
