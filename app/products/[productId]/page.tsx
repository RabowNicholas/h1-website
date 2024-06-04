"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const params = useParams<{ productId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.SHOPURL}/products/${params.productId}.json`;
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
        setProductDetails({
          id: data.product.id,
          title: data.product.title,
          description: data.product.body_html,
          media: data.product.images.map((i: any) => i.src),
          price: data.product.variants[0].price,
        });
      } catch (error: any) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
  }, [params.productId]);

  return (
    <div className="p-4">
      {productDetails ? (
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
          <p className="mb-4">{productDetails.description}</p>
          <p className="text-xl font-semibold">${productDetails.price}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
