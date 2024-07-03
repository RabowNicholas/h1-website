import { storefrontApi } from "../StorefrontApi";
import { cartFields } from "./GetCart";

const gql = String.raw;

export default async function UpdateCartLineItem(
  cartId: string,
  item: UpdateCartLineItem
): Promise<Cart> {
  const mutation = gql`
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
    lines: [
      {
        id: item.lineId,
        quantity: item.quantity,
      },
    ],
  };

  const response = await storefrontApi(mutation, variables);

  return {
    id: response.data.cartLinesUpdate.cart.id,
    totalQuantity: response.data.cartLinesUpdate.cart.totalQuantity,
    checkoutUrl: response.data.cartLinesUpdate.cart.checkoutUrl,
    items: response.data.cartLinesUpdate.cart.lines.edges.map((e: any) => {
      return {
        lineId: e.node.id,
        itemId: e.node.merchandise.id,
        quantity: e.node.quantity,
        costPerItem: e.node.cost.amountPerQuantity,
        subtotalAmount: e.node.cost.subtotalAmount,
        name: e.node.merchandise.product.title,
      };
    }),
    subtotal: response.data.cartLinesUpdate.cart.cost.subtotalAmount.amount,
  };
}
