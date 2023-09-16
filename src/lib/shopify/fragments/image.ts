import gql from "graphql-tag";

const imageFragment = gql`
    fragment image on Image {
        url
        altText
        width
        height
    }
`;

export default imageFragment;
