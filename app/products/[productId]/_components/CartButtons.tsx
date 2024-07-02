"use client";
import React, { useState } from "react";
import { useCart } from "@/app/_components/common/Cart";

export default function CartButtons({ product }: { product: ProductDetails }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      variantId: product.variantId,
      quantity: quantity,
    });
    setQuantity(1);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg px-4 py-2">
        <button
          onClick={decreaseQuantity}
          className="text-gray-600 hover:text-gray-800 font-bold"
        >
          -
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="text-gray-600 hover:text-gray-800 font-bold"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg uppercase hover:bg-blue-700 transition-colors duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
}
