// pages/api/checkout.js

import { createCheckout } from "@/lib/shopify/checkout/CreateCheckout";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("post");
  try {
    const { cartItems } = await req.json();

    // Call createCheckout to create a checkout
    const checkoutResponse = await createCheckout(
      cartItems,
      process.env.SHOPURL!,
      process.env.STOREFRONTACCESSTOKEN!
    );

    // Return the checkout response
    return NextResponse.json(checkoutResponse, { status: 200 });
  } catch (error) {
    console.error("Error during checkout:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
