import { storefrontApi } from "../StorefrontApi";
import { cartFields } from "./GetCart";

const gql = String.raw;

export default async function AddItemToCart(
  cartId: string,
  item: AddCartLineItem
): Promise<Cart> {
  const mutation = gql`
    mutation AddItemToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ${cartFields}
        }
      }
    }
  `;

  const variables = {
    cartId: cartId,
    lines: [
      {
        merchandiseId: item.variantId,
        quantity: item.quantity,
      },
    ],
  };

  const response = await storefrontApi(mutation, variables);

  return {
    id: response.data.cartLinesAdd.cart.id,
    totalQuantity: response.data.cartLinesAdd.cart.totalQuantity,
    checkoutUrl: response.data.cartLinesAdd.cart.checkoutUrl,
    items: response.data.cartLinesAdd.cart.lines.edges.map((e: any) => {
      return {
        lineId: e.node.id,
        itemId: e.node.merchandise.id,
        quantity: e.node.quantity,
        costPerItem: e.node.cost.amountPerQuantity,
        subtotalAmount: e.node.cost.subtotalAmount,
        name: e.node.merchandise.product.title,
      };
    }),
    subtotal: response.data.cartLinesAdd.cart.cost.subtotalAmount.amount,
  };
}
