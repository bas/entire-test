"use client";

import { useMemo } from "react";
import type { CartItem } from "@/app/types/cart";

interface CartSummaryProps {
  items: CartItem[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  return (
    <div className="border-t border-zinc-200 pt-4">
      <div className="flex justify-between text-sm text-zinc-600 mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-zinc-600 mb-4">
        <span>Shipping</span>
        <span>Calculated at checkout</span>
      </div>
      <div className="flex justify-between text-base font-semibold text-black border-t border-zinc-200 pt-4">
        <span>Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
    </div>
  );
}
