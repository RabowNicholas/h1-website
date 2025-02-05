"use client";
import React, { useState } from "react";
import { useCart } from "@/app/_components/common/Cart";

export default function CartButtons({
  product,
  className,
}: {
  product: ProductDetails;
  className?: string;
}) {
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
    <div className={className}>
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-2 border-2 border-graphite-gray rounded-lg px-4 py-2">
          <button
            onClick={decreaseQuantity}
            className="text-slate-gray hover:text-emerald-green font-bold"
          >
            -
          </button>
          <span className="text-lg text-charcoal-gray">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="text-slate-gray hover:text-emerald-green font-bold"
          >
            +
          </button>
        </div>
        <button onClick={handleAddToCart} className="primary-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
