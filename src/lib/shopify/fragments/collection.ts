import seoFragment from "./seo";
import gql from "graphql-tag";

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
