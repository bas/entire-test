"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import type { CartState, CartAction, CartItem } from "@/app/types/cart";
import { cartReducer, initialCartState } from "@/app/contexts/cartReducer";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

interface CartContextType {
  cart: CartState;
  dispatch: React.Dispatch<CartAction>;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const [storedItems, setStoredItems, isHydrated] = useLocalStorage<CartItem[]>(
    "octodeco_cart",
    []
  );

  // Load cart from localStorage on mount
  useEffect(() => {
    if (isHydrated && storedItems.length > 0) {
      dispatch({ type: "LOAD_CART", payload: storedItems });
    }
  }, [isHydrated, storedItems]);

  // Save cart to localStorage when items change
  useEffect(() => {
    if (isHydrated) {
      setStoredItems(cart.items);
    }
  }, [cart.items, isHydrated, setStoredItems]);

  // Calculate item count
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate subtotal
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    cart,
    dispatch,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
