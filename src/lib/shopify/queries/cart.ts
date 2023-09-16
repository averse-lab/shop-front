import cartFragment from "../fragments/cart";
import gql from "graphql-tag";

export const getCartQuery = gql`
    query getCart($cartId: ID!) {
        cart(id: $cartId) {
            ...cart
        }
    }
    ${cartFragment}
`;
