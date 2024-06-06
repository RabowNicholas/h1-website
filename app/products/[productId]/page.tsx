import Head from "next/head";
import Image from "next/image";
import CartButtons from "./_components/CartButtons";

interface ProductDetails {
  id: string;
  variantId: string;
  title: string;
  description: string;
  media: string[];
  price: number;
}

async function getProductDetails(
  productId: string
): Promise<ProductDetails | undefined> {
  const url = `${process.env.SHOPURL}/products/${productId}.json`;
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
    const productDetails: ProductDetails = {
      id: data.product.id,
      variantId: data.product.variants[0].id,
      title: data.product.title,
      description: data.product.body_html,
      media: data.product.images.map((i: any) => i.src),
      price: data.product.variants[0].price,
    };

    return productDetails;
  } catch (error: any) {
    console.error("Fetch Error:", error);
  }
}

interface PageProps {
  params: { productId: string };
}

const Page = async ({ params }: PageProps) => {
  const productDetails = await getProductDetails(params.productId);

  return (
    <>
      <Head>
        <title>{productDetails?.title}</title>
        <meta name="description" content={productDetails?.description} />
      </Head>
      {productDetails ? (
        <div className="p-4">
          <div className="max-w-lg mx-auto">
            <div className="relative w-full h-64 mb-4">
              <Image
                src={productDetails.media[0]}
                alt={productDetails.title}
                layout="fill"
                objectFit="cover"
              />
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
};

export default Page;
