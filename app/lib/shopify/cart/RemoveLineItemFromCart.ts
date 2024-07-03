import { storefrontApi } from "../StorefrontApi";
import { cartFields } from "./GetCart";

const gql = String.raw;

export default async function RemoveItemsFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const mutation = gql`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ${cartFields}
      }
      userErrors {
        field
        message
      }
    }
  }
  `;

  const variables = {
    cartId: cartId,
    lineIds: lineIds,
  };

  const response = await storefrontApi(mutation, variables);

  return {
    id: response.data.cartLinesRemove.cart.id,
    totalQuantity: response.data.cartLinesRemove.cart.totalQuantity,
    checkoutUrl: response.data.cartLinesRemove.cart.checkoutUrl,
    items: response.data.cartLinesRemove.cart.lines.edges.map((e: any) => {
      return {
        lineId: e.node.id,
        itemId: e.node.merchandise.id,
        quantity: e.node.quantity,
        costPerItem: e.node.cost.amountPerQuantity,
        subtotalAmount: e.node.cost.subtotalAmount,
        name: e.node.merchandise.product.title,
      };
    }),
    subtotal: response.data.cartLinesRemove.cart.cost.subtotalAmount.amount,
  };
}
