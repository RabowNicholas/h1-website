const adminApiKey = process.env.SHOPIFY_ADMIN_API_KEY;
const adminPassword = process.env.SHOPIFY_ADMIN_PASSWORD;
const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const apiVersion = process.env.SHOPIFY_API_VERSION;

interface OrderData {
  line_items: Array<{ variant_id: string; quantity: number }>;
}

interface OrderResponse {
  order: {
    id: string;
    name: string;
  };
}

export async function createOrder(
  orderData: OrderData
): Promise<OrderResponse> {
  const response = await fetch(
    `https://${adminApiKey}:${adminPassword}@${storeDomain}/admin/api/${apiVersion}/orders.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order: orderData }),
    }
  );

  return response.json();
}
