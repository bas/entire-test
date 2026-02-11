"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/layout/Header";
import { useCart } from "@/app/contexts/CartContext";
import OrderSummary from "@/app/components/cart/OrderSummary";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, dispatch } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber] = useState(() =>
    Math.floor(10000 + Math.random() * 90000).toString()
  );

  // Redirect to products if cart is empty
  useEffect(() => {
    if (cart.items.length === 0 && !isSuccess) {
      router.push("/products");
    }
  }, [cart.items.length, isSuccess, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Clear cart and show success
    dispatch({ type: "CLEAR_CART" });
    setIsSuccess(true);
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <main className="mx-auto max-w-3xl px-6 py-24">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-24 w-24 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-black mb-4">
              Thank you for your order!
            </h1>
            <p className="text-lg text-zinc-600 mb-2">
              Your order number is: <span className="font-semibold">#{orderNumber}</span>
            </p>
            <p className="text-sm text-zinc-500 mb-8">
              (This is a demo - your stickers will not actually be shipped)
            </p>

            <button
              onClick={() => router.push("/products")}
              className="rounded-lg bg-black px-8 py-4 text-base font-medium text-white hover:bg-zinc-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="rounded-lg border border-zinc-200 p-6">
                <h2 className="text-lg font-semibold text-black mb-4">
                  Contact Information
                </h2>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full rounded-md border border-zinc-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Shipping Information */}
              <div className="rounded-lg border border-zinc-200 p-6">
                <h2 className="text-lg font-semibold text-black mb-4">
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full rounded-md border border-zinc-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-black mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      required
                      className="w-full rounded-md border border-zinc-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-black mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        required
                        className="w-full rounded-md border border-zinc-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="San Francisco"
                      />
                    </div>

                    <div>
                      <label htmlFor="postal" className="block text-sm font-medium text-black mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postal"
                        required
                        className="w-full rounded-md border border-zinc-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="94102"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-black mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      required
                      className="w-full rounded-md border border-zinc-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="rounded-lg border border-zinc-200 p-6">
                <h2 className="text-lg font-semibold text-black mb-4">
                  Payment Information (Mock)
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="card" className="block text-sm font-medium text-black mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="card"
                      required
                      className="w-full rounded-md border border-zinc-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-black mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        required
                        className="w-full rounded-md border border-zinc-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-black mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        required
                        className="w-full rounded-md border border-zinc-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-zinc-500">
                  This is a demo checkout. No actual payment will be processed.
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-black px-6 py-4 text-base font-medium text-white hover:bg-zinc-800 transition-colors"
              >
                Place Order
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary showCheckoutButton={false} />
          </div>
        </div>
      </main>
    </div>
  );
}
