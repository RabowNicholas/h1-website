interface ShopifyPrice {
  amount: string;
}

interface ShopifyImage {
  transformedSrc: string;
  altText: string | null;
}

interface ShopifyProduct {
  title: string;
  handle: string;
  tags: string[];
  priceRangeV2: {
    minVariantPrice: ShopifyPrice;
  };
  images: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
}

interface ProductsResponse {
  data: {
    products: {
      edges: Array<{
        node: ShopifyProduct;
      }>;
    };
  };
}
