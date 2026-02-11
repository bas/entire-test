"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/contexts/CartContext";

export default function Header() {
  const { itemCount, dispatch } = useCart();

  function handleCartClick() {
    dispatch({ type: "TOGGLE_PANEL" });
  }

  return (
    <header className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/products/original.png"
              alt="Octodeco"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-semibold">Octodeco</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-sm font-medium hover:text-zinc-300 transition-colors"
            >
              Products
            </Link>
            <button
              onClick={handleCartClick}
              className="relative flex items-center gap-2 hover:text-zinc-300 transition-colors"
              aria-label={`Shopping cart, ${itemCount} items`}
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                  {itemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
