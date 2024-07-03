import Head from "next/head";
import { getProducts } from "../lib/shopify/get_products/GetProducts";
import { getProductDetails } from "../lib/shopify/get_product_details/GetProductDetails";
import ImageGallery from "./_components/ImageGallery";
import CartButtons from "../products/[productId]/_components/CartButtons";

export default async function Page() {
  const product = await getProductDetails("soap");

  return (
    <>
      <Head>
        <title>{product ? product.title : "Our Product"}</title>
        <meta name="description" content="Check out our featured product." />
      </Head>

      <header className="bg-dark-black text-warm-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold uppercase tracking-wider">
            Welcome to H1 Hydration
          </h1>
          <p className="mt-4 text-lg uppercase">Live in abundance</p>
        </div>
      </header>

      {product ? (
        <section className="bg-warm-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-4">
                <ImageGallery images={product.media} />
              </div>
              <div className="md:w-1/2 p-4">
                <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
                <p className="text-xl mb-4">{product.description}</p>
                <p className="text-2xl font-bold mb-4">${product.price}</p>
                <CartButtons product={product} />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl font-semibold">Loading...</div>
        </div>
      )}
    </>
  );
}
