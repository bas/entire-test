"use client";

import Link from "next/link";
import Header from "@/app/components/layout/Header";
import { useCart } from "@/app/contexts/CartContext";
import CartItemList from "@/app/components/cart/CartItemList";
import OrderSummary from "@/app/components/cart/OrderSummary";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">Shopping Cart</h1>
          <Link
            href="/products"
            className="text-sm text-zinc-600 hover:text-black transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>

        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-24 w-24 text-zinc-400 mb-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-black mb-3">
              Your cart is empty
            </h2>
            <p className="text-zinc-600 mb-8 max-w-md">
              Looks like you haven't added any Octocat stickers to your cart yet.
              Browse our collection to find your favorites!
            </p>
            <Link
              href="/products"
              className="rounded-lg bg-black px-8 py-4 text-base font-medium text-white hover:bg-zinc-800 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CartItemList items={cart.items} />

              <div className="mt-6">
                <Link
                  href="/products"
                  className="text-sm text-zinc-600 hover:text-black transition-colors"
                >
                  ← Add more items
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-24 bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-400">
              &copy; {new Date().getFullYear()} Octodeco. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
