import Head from "next/head";
import ProductTile from "./_components/ProductTile";
import { Product } from "./types";
import { getProducts } from "../lib/shopify/get_products/GetProducts";

export default async function Page() {
  const products = await getProducts();

  return (
    <>
      <Head>
        <title>Product List</title>
        <meta name="description" content="Browse our selection of products." />
      </Head>
      {products !== undefined ? (
        <div className="flex justify-center">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 mt-4">
            {products.map((p: Product) => (
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
