import Image from "next/image";
import Link from "next/link";
import { Product } from "../types";

export default function ProductTile({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col items-center text-left"
    >
      <div className="relative">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={300}
          height={300}
          className="group-hover:opacity-[99%] transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        <button className="button-primary-solid uppercase absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Add to Cart
        </button>
      </div>
      <div className="w-full mt-2">{product.title}</div>
      <div className="w-full">${product.price}</div>
    </Link>
  );
}
