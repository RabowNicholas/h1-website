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
    <div className="flex items-center gap-4">
      <div className="flex gap-4 border-2 rounded-xl px-4 py-2">
        <button onClick={decreaseQuantity} className="">
          -
        </button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity} className="">
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="button-primary-solid uppercase"
      >
        Add to Cart
      </button>
    </div>
  );
}
