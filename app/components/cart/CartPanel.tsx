"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/app/contexts/CartContext";
import CartItem from "@/app/components/cart/CartItem";
import CartSummary from "@/app/components/cart/CartSummary";

export default function CartPanel() {
  const { cart, dispatch } = useCart();

  function handleClose() {
    dispatch({ type: "TOGGLE_PANEL", payload: false });
  }

  // Handle ESC key to close panel
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && cart.isOpen) {
        handleClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [cart.isOpen]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (cart.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [cart.isOpen]);

  if (!cart.isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-black">
            Cart ({cart.items.length} {cart.items.length === 1 ? "item" : "items"})
          </h2>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-zinc-600 transition-colors"
            aria-label="Close cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-16 w-16 text-zinc-400 mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-black mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-zinc-600 mb-6">
                Start adding some Octocat stickers!
              </p>
              <Link
                href="/products"
                onClick={handleClose}
                className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-zinc-200">
              {cart.items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-zinc-200 px-6 py-6">
            <CartSummary items={cart.items} />

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/cart"
                onClick={handleClose}
                className="block text-center rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium text-black hover:bg-zinc-50 transition-colors"
              >
                View Full Cart
              </Link>
              <Link
                href="/checkout"
                onClick={handleClose}
                className="block text-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
