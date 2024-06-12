import { Product } from "@/app/(shop)/types";
import { storefront } from "../storefront";

export async function getProducts(): Promise<Product[]> {
  const { data } = await storefront<ProductsResponse>(productsQuery);
  return data.products.edges.map((e: any) => ({
    id: e.node.handle,
    variantId: "",
    imageUrl: e.node.images.edges[0].node.transformedSrc,
    title: e.node.title,
    price: e.node.priceRangeV2.minVariantPrice.amount,
  }));
}

const gql = String.raw;

const productsQuery = gql`
  query Products {
    products(first: 2) {
      edges {
        node {
          title
          handle
          tags
          priceRangeV2 {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                transformedSrc
                altText
              }
            }
          }
        }
      }
    }
  }
`;
