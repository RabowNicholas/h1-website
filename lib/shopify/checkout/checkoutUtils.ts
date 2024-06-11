interface LineItem {
  variant_id: string;
  quantity: number;
}

interface CheckoutResponse {
  checkout: {
    id: string;
    web_url: string;
  };
  userErrors: Array<{ field: string; message: string }>;
}
