import { storefrontApi } from "../StorefrontApi";

export async function GetCart(cartId: string): Promise<Cart> {
  const data = await storefrontApi(cartQuery, { cartId: cartId });
  return {
    id: data.data.cart.id,
    totalQuantity: data.data.cart.totalQuantity,
    checkoutUrl: data.data.cart.checkoutUrl,
    items: data.data.cart.lines.edges.map((e: any) => {
      return {
        lineId: e.node.id,
        itemId: e.node.merchandise.id,
        quantity: e.node.quantity,
        costPerItem: e.node.cost.amountPerQuantity,
        subtotalAmount: e.node.cost.subtotalAmount,
      };
    }),
  };
}

const gql = String.raw;

export const cartFields = `id
totalQuantity
checkoutUrl
lines(first: 10) {
  edges {
    node {
        id
      merchandise {
        ... on ProductVariant {
          id
        }
      }
      cost {
        amountPerQuantity {
          amount
        }
        subtotalAmount {
          amount
        }
      }
      quantity
    }
  }}`;

const cartQuery = gql`
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ${cartFields}
      
    }
  }
`;
