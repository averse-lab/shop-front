import gql from "graphql-tag";

const seoFragment = gql`
  fragment seo on SEO {
    description
    title
  }
`;

export default seoFragment;
