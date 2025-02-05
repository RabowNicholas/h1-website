import { getProductDetails } from "@/app/lib/shopify/get_product_details/GetProductDetails";
import ImageGallery from "../../../(shop)/_components/ImageGallery";
import CartButtons from "@/app/products/[productId]/_components/CartButtons";

export default async function Product({
  product,
}: {
  product: ProductDetails | null;
}) {
  return (
    <>
      {product ? (
        <section id="product-section" className="bg-warm-white py-16">
          <div className=" mx-auto px-4 sm:px-2 md:px-4 lg:px-8">
            <div className="flex flex-col md:flex-row  justify-center ">
              <div className="w-full max-w-[600px] p-4 sm:px-2">
                <ImageGallery images={product.media} />
                <div className="mt-4 text-sm text-center text-slate-gray">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="flex items-center gap-2">
                      <img
                        src="/icons/secure-payment.svg"
                        alt="Secure Payment"
                        className="h-6"
                      />
                      <p className="text-xs">Secure Payment</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="/icons/ssl.svg"
                        alt="SSL Encrypted"
                        className="h-6"
                      />
                      <p className="text-xs">SSL Encrypted</p>
                    </div>
                  </div>
                  <p className="mt-2">100% Satisfaction Guaranteed</p>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-1/2 p-4 sm:px-2">
                <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
                <p className="text-xl mb-4">{product.description}</p>
                <p className="text-2xl font-bold mb-4">${product.price}</p>
                <CartButtons
                  className="sm:self-center lg:self-start"
                  product={product}
                />
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
