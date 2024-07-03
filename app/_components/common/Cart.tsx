"use client";

import AddItemToCart from "@/app/lib/shopify/cart/AddLineItemToCart";
import CreateCart from "@/app/lib/shopify/cart/CreateCart";
import { GetCart } from "@/app/lib/shopify/cart/GetCart";
import RemoveItemsFromCart from "@/app/lib/shopify/cart/RemoveLineItemFromCart";
import UpdateItemQuantity from "@/app/lib/shopify/cart/UpdateItemQuantity";
import { ShoppingCart } from "@mui/icons-material";
import Link from "next/link";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";

interface CartContextType {
  cart: Cart | undefined;
  addToCart: (product: AddCartLineItem) => void;
  removeFromCart: (productId: string) => void;
  updateItemQuantity: (line: UpdateCartLineItem) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const cartId = await getCartId();
      try {
        const cart = await GetCart(cartId);
        setCart(cart);
      } catch (error) {
        await clearCartId();
        const cartId = await getCartId();
        const cart = await GetCart(cartId);
        setCart(cart);
      }
    };

    fetchData();
  }, []);

  const getCartId = async () => {
    let cartId = localStorage.getItem("cartId");

    if (!cartId) {
      const cartId = await CreateCart();
      localStorage.setItem("cartId", cartId!);
    }
    return cartId!;
  };

  const clearCartId = async () => {
    localStorage.removeItem("cartId");
  };

  const addToCart = async (product: AddCartLineItem) => {
    const cartId = await getCartId();
    const cart = await AddItemToCart(cartId, product);
    setCart(cart);
  };

  const removeFromCart = async (productId: string) => {
    const cartId = await getCartId();
    const cart = await RemoveItemsFromCart(cartId, [productId]);
    setCart(cart);
  };

  const updateItemQuantity = async (line: UpdateCartLineItem) => {
    const cartId = await getCartId();
    const cart = await UpdateItemQuantity(cartId, line);
    setCart(cart);
  };

  const clearCart = async () => {
    const cartId = await getCartId();
    const currentCart = await GetCart(cartId);
    const cart = await RemoveItemsFromCart(
      cartId,
      currentCart.items.map((item) => item.lineId)
    );
    setCart(cart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateItemQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const Cart = () => {
  const { cart, updateItemQuantity, removeFromCart } = useCart();
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleCartIconClick = () => {
    setShowOverlay(!showOverlay);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      overlayRef.current &&
      !overlayRef.current.contains(event.target as Node)
    ) {
      setShowOverlay(false);
    }
  };

  useEffect(() => {
    if (showOverlay) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOverlay]);

  const handleQuantityChange = (lineId: string, newQuantity: number) => {
    updateItemQuantity({ lineId: lineId, quantity: newQuantity });
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <ShoppingCart onClick={handleCartIconClick} />

      {cart.totalQuantity > 0 && (
        <div className="absolute top-2 right-2">
          <div
            className="bg-bright-yellow text-dark-black rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold cursor-pointer"
            onClick={handleCartIconClick}
          >
            {cart.totalQuantity}
          </div>
        </div>
      )}

      {showOverlay && (
        <div className="w-[300px] absolute top-2 right-2 bg-charcoal-gray border border-slate-gray text-warm-white p-6 rounded-lg shadow-lg ">
          <div ref={overlayRef} className="flex flex-col gap-6">
            <ul className=" flex flex-col gap-10">
              {cart.items.map((item) => (
                <li key={item.itemId} className="mb-2 flex flex-col gap-4">
                  <p>{item.name}</p>
                  <div className="flex justify-between items-center">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.lineId,
                          parseInt(e.target.value)
                        )
                      }
                      className="ml-2 border border-slate-gray text-charcoal-gray rounded px-2 py-1"
                    >
                      {[...Array(100)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleRemoveItem(item.lineId)}
                      className="border border-warm-white text-warm-white rounded px-2 py-1 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="font-bold">Total Price: ${cart.subtotal}</p>
            <Link
              href={cart.checkoutUrl}
              className="w-full bg-bright-yellow text-center uppercase hover:bg-light-gold text-dark-black font-bold py-2 px-4 rounded"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
