"use client";

import { useState } from "react";
import type { Product } from "@/app/types/product";
import { useCart } from "@/app/contexts/CartContext";
import { useToast } from "@/app/contexts/ToastContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  function handleAddToCart() {
    setIsAdding(true);

    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
    });

    showToast(`Added ${product.name} to cart!`);

    // Reset loading state
    setTimeout(() => setIsAdding(false), 300);
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
    >
      {isAdding ? "Adding..." : "Add to Cart"}
    </button>
  );
}
