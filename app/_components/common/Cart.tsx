"use client";

import { createCheckout } from "@/lib/shopify/checkout/CreateCheckout";
import { ShoppingCart } from "@mui/icons-material";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";

interface CartItem {
  id: string;
  variantId: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateItemQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: product.quantity + item.quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: product.quantity }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateItemQuantity = (productId: string, newQuantity: number) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

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
  const [initialized, setInitialized] = useState(false);
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

  // Open the cart when an item is added, but only after the component is initialized
  useEffect(() => {
    if (initialized && cart.length > 0) {
      setShowOverlay(true);
    }
  }, [cart, initialized]);

  // Initialize the cart after the initial render
  useEffect(() => {
    setInitialized(true);
  }, []);

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handle quantity change
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateItemQuantity(itemId, newQuantity);
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
        body: JSON.stringify({ cartItems: cart }), // Assuming 'cart' contains line items
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

  return (
    <div className="relative">
      <ShoppingCart />

      {cart.length !== 0 && (
        <div className="absolute top-2 right-2">
          <div
            className="bg-forest-green text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold cursor-pointer"
            onClick={handleCartIconClick}
          >
            {totalItems}
          </div>
        </div>
      )}

      {/* Overlay that opens when the cart icon is clicked */}
      {showOverlay && (
        <div className="absolute top-2 right-2 w-[300px] bg-forest-green flex items-center justify-center">
          <div ref={overlayRef} className="p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Cart Items</h2>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="mb-2">
                  {item.title} - Quantity:
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
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
                    onClick={() => handleRemoveItem(item.id)}
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
