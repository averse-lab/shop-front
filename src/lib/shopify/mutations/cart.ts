import gql from "graphql-tag";

// Each response encodes the consent it was asked with into `checkoutUrl`: it is not stored on the cart.
import cartFragment from "../fragments/cart";

export const addToCartMutation = gql`
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!, $visitorConsent: VisitorConsent)
  @inContext(visitorConsent: $visitorConsent) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const createCartMutation = gql`
  mutation createCart($lineItems: [CartLineInput!], $visitorConsent: VisitorConsent)
  @inContext(visitorConsent: $visitorConsent) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const editCartItemsMutation = gql`
  mutation editCartItems(
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
    $visitorConsent: VisitorConsent
  ) @inContext(visitorConsent: $visitorConsent) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = gql`
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!, $visitorConsent: VisitorConsent)
  @inContext(visitorConsent: $visitorConsent) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;
