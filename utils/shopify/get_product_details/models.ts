interface Image {
  transformedSrc: string;
  altText: string | null;
}

interface VariantNode {
  id: string;
  title: string;
  price: string;
}

interface ShopifyProductDetails {
  id: string;
  title: string;
  description: string;
  images: {
    edges: Array<{
      node: Image;
    }>;
  };
  priceRangeV2: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: VariantNode;
    }>;
  };
}

interface ProductDetailsResponse {
  data: {
    productByHandle: ShopifyProductDetails | null;
  };
}
