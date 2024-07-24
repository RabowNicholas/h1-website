import { getProductDetails } from "@/app/lib/shopify/get_product_details/GetProductDetails";
import CartButtons from "./_components/CartButtons";
import ImageGallery from "../../(shop)/_components/ImageGallery";
import Product from "./_components/Product";

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const productDetails = await getProductDetails(params.productId);

  return <Product product={productDetails} />;
}
