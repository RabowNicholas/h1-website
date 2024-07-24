import { useEffect, useState } from "react";
import { Product } from "@/app/(shop)/types";
import CartButtons from "@/app/products/[productId]/_components/CartButtons";
import { getProducts } from "@/app/lib/shopify/get_products/GetProducts";
import ImageGallery from "./ImageGallery";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();
      setProducts(products);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <section id="products-section" className="bg-warm-white py-16">
      <div className=" mx-auto px-4 sm:px-2 md:px-4 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white shadow-lg p-4 rounded-lg">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <ImageGallery images={product.imageUrls} />
                    <h3 className="text-2xl font-bold mt-4">{product.title}</h3>
                    <p className="text-xl font-semibold mt-2">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
