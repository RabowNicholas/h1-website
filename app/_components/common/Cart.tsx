"use client";

import AddItemToCart from "@/app/lib/shopify/cart/AddLineItemToCart";
import CreateCart from "@/app/lib/shopify/cart/CreateCart";
import { GetCart } from "@/app/lib/shopify/cart/GetCart";
import RemoveItemsFromCart from "@/app/lib/shopify/cart/RemoveLineItemFromCart";
import UpdateItemQuantity from "@/app/lib/shopify/cart/UpdateItemQuantity";
import { ShoppingCart } from "@mui/icons-material";
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const cartId = await getCartId();
      const cart = await GetCart(cartId);
      setCart(cart);
      setLoading(false);
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

  // Toggle the overlay when the cart icon is clicked
  const handleCartIconClick = () => {
    setShowOverlay(!showOverlay);
  };

  // Close the overlay if a click outside of it is detected
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

  // Calculate the total price of items in the cart
  const totalPrice =
    cart?.items.reduce((sum, item) => sum + parseFloat(item.subtotalItem), 0) ||
    0;

  // Handle quantity change
  const handleQuantityChange = (lineId: string, newQuantity: number) => {
    updateItemQuantity({ lineId: lineId, quantity: newQuantity });
  };

  // Handle item removal
  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ CartLineItems: cart?.items }), // Assuming 'cart' contains line items
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.checkout.web_url; // Redirect to checkout URL
      } else {
        console.error("Error:", response.statusText);
        // Handle error
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      // Handle error
    }
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
            className="bg-forest-green text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold cursor-pointer"
            onClick={handleCartIconClick}
          >
            {cart.totalQuantity}
          </div>
        </div>
      )}

      {/* Overlay that opens when the cart icon is clicked */}
      {showOverlay && (
        <div className="absolute top-2 right-2  bg-forest-green flex items-center justify-center">
          <div ref={overlayRef} className="p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Cart Items</h2>
            <ul>
              {cart.items.map((item) => (
                <li key={item.itemId} className="mb-2">
                  {item.itemId} - Quantity:
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.lineId,
                        parseInt(e.target.value)
                      )
                    }
                    className="ml-2 border text-charcoal-gray rounded px-2 py-1"
                  >
                    {[...Array(100)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleRemoveItem(item.lineId)}
                    className="border border-red-500 text-red-500 rounded px-2 py-1 ml-2"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4">
              <p className="font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
              <button
                onClick={handleCheckout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Checkout
              </button>
            </div>
            <button onClick={() => setShowOverlay(false)} className="mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
