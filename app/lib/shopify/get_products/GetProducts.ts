import { Product } from "@/app/(shop)/types";
import { storefrontApi } from "../StorefrontApi";

export async function getProducts(): Promise<Product[]> {
  const response = await storefrontApi(productsQuery);
  return response.data.products.edges.map((e: any) => ({
    id: e.node.handle,
    variantId: "",
    imageUrls: e.node.images.edges.map((e: any) => e.node.url),
    title: e.node.title,
    price: e.node.priceRange.minVariantPrice.amount,
  }));
}

const gql = String.raw;

const productsQuery = gql`
  query Products {
    products(first: 3) {
      edges {
        node {
          title
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 3) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;
