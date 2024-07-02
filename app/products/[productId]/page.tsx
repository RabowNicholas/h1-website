import { getProductDetails } from "@/app/lib/shopify/get_product_details/GetProductDetails";
import CartButtons from "./_components/CartButtons";
import ImageGallery from "../../(shop)/_components/ImageGallery";

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const productDetails = await getProductDetails(params.productId);

  return (
    <>
      {productDetails ? (
        <div className="p-4 bg-gray-50 min-h-screen">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="relative w-full h-64 mb-6">
              <ImageGallery images={productDetails.media} />
            </div>
            <h1 className="text-3xl font-bold mb-4">{productDetails.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: productDetails.description }}
              className="prose prose-lg mb-6"
            />
            <p className="text-2xl font-semibold text-gray-900 mb-4">
              ${productDetails.price}
            </p>
            <CartButtons product={productDetails} />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-20">Loading...</p>
      )}
    </>
  );
}
