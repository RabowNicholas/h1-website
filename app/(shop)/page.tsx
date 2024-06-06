import Head from "next/head";
import ProductTile from "./_components/ProductTile";
import { Product } from "./types";

async function getData() {
  const url = `${process.env.SHOPURL}/products.json`;
  const accessToken = process.env.STOREFRONTACCESSTOKEN;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken!,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const products: Product[] = data.products.map((p: any) => ({
      id: p.id,
      title: p.title,
      imageUrl: p.image.src,
      price: p.variants[0].price,
    }));

    return products;
  } catch (error: any) {
    console.error("Fetch Error:", error);
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <Head>
        <title>Product List</title>
        <meta name="description" content="Browse our selection of products." />
      </Head>
      {data !== undefined ? (
        <div className="flex justify-center">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 mt-4">
            {data.map((p) => (
              <ProductTile key={p.id} product={p} />
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
