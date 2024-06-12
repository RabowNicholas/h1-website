import { storefront } from "../storefront";

const gql = String.raw;

const productsQuery = gql`
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      images(first: 4) {
        edges {
          node {
            transformedSrc
            altText
          }
        }
      }
      priceRangeV2 {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price
          }
        }
      }
    }
  }
`;

export async function getProductDetails(
  handle: string
): Promise<ProductDetails | null> {
  try {
    const { data } = await storefront(productsQuery, { handle });
    const productData = data.productByHandle;
    if (productData) {
      const firstVariant = productData.variants.edges[0]?.node;
      const images = productData.images.edges.map(
        (edge: any) => edge.node.transformedSrc
      );

      return {
        id: productData.id,
        variantId: firstVariant?.id ?? "",
        title: productData.title,
        description: productData.description,
        media: images,
        price: productData.priceRangeV2.minVariantPrice.amount,
      };
    } else {
      console.error(`Product not found for handle: ${handle}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}
