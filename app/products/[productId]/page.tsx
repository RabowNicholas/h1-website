import { getProductDetails } from "@/app/lib/shopify/get_product_details/GetProductDetails";
import CartButtons from "./_components/CartButtons";
import ImageGallery from "./_components/ImageGallery";

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const productDetails = await getProductDetails(params.productId);

  return (
    <>
      {productDetails ? (
        <div className="p-4">
          <div className="max-w-lg mx-auto">
            <div className="relative w-full h-64 mb-4">
              <ImageGallery images={productDetails.media} />
            </div>
            <h1 className="text-2xl font-bold mb-2">{productDetails.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: productDetails.description }}
            />
            <p className="text-xl font-semibold">${productDetails.price}</p>
            <CartButtons product={productDetails} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
