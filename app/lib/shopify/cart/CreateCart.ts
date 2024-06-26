import { storefrontApi } from "../StorefrontApi";

const gql = String.raw;

const cartCreateMutation = gql`
  mutation cartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        id
      }
    }
  }
`;

export default async function CreateCart(): Promise<string> {
  const { data } = await storefrontApi(cartCreateMutation);
  return data.cartCreate.cart.id;
}
