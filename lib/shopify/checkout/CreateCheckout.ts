const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

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

export async function createCheckout(
  lineItems: LineItem[],
  storeDomain: string,
  accessToken: string
): Promise<CheckoutResponse> {
  const url = `${storeDomain}/checkouts.json`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": accessToken!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkout: { line_items: lineItems } }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    return await response.json();
  } catch (error) {
    // Handle error appropriately, like logging or rethrowing
    console.error("Error creating checkout:", error);
    throw error;
  }
}
