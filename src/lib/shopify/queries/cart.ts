import gql from "graphql-tag";

import cartFragment from "../fragments/cart";

export const getCartQuery = gql`
  query getCart($cartId: ID!, $visitorConsent: VisitorConsent)
  @inContext(visitorConsent: $visitorConsent) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${cartFragment}
`;
