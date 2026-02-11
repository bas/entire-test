"use client";

import Link from "next/link";
import { useCart } from "@/app/contexts/CartContext";

interface OrderSummaryProps {
  showCheckoutButton?: boolean;
}

export default function OrderSummary({ showCheckoutButton = true }: OrderSummaryProps) {
  const { cart, subtotal } = useCart();

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 sticky top-6">
      <h2 className="text-lg font-semibold text-black mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600">Subtotal</span>
          <span className="font-medium text-black">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600">Shipping</span>
          <span className="text-sm text-zinc-500">Calculated at checkout</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600">Tax</span>
          <span className="text-sm text-zinc-500">Calculated at checkout</span>
        </div>
      </div>

      <div className="border-t border-zinc-200 pt-4 mb-6">
        <div className="flex justify-between">
          <span className="text-base font-semibold text-black">Total</span>
          <span className="text-lg font-bold text-black">${subtotal.toFixed(2)}</span>
        </div>
      </div>

      {showCheckoutButton && cart.items.length > 0 && (
        <Link
          href="/checkout"
          className="block w-full text-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
        >
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
}
