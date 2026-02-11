"use client";

import { useState } from "react";
import Image from "next/image";
import type { CartItem as CartItemType } from "@/app/types/cart";
import { useCart } from "@/app/contexts/CartContext";

export default function CartItem({ item }: { item: CartItemType }) {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  function handleQuantityChange(newQuantity: number) {
    // Validate range 1-99
    if (newQuantity < 1 || newQuantity > 99 || !Number.isInteger(newQuantity)) {
      return;
    }

    setQuantity(newQuantity);
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId: item.productId, quantity: newQuantity },
    });
  }

  function handleIncrement() {
    if (quantity < 99) {
      handleQuantityChange(quantity + 1);
    }
  }

  function handleDecrement() {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      handleQuantityChange(value);
    }
  }

  function handleRemove() {
    dispatch({ type: "REMOVE_ITEM", payload: item.productId });
  }

  const subtotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 py-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-zinc-200 bg-zinc-50">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-2"
          sizes="80px"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-black">{item.name}</h3>
          <button
            onClick={handleRemove}
            className="text-zinc-400 hover:text-zinc-600 transition-colors"
            aria-label={`Remove ${item.name} from cart`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>

        <p className="mt-1 text-sm text-zinc-500">${item.price.toFixed(2)} each</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 text-zinc-600 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max="99"
              value={quantity}
              onChange={handleInputChange}
              className="h-8 w-16 rounded-md border border-zinc-300 text-center text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Quantity"
            />
            <button
              onClick={handleIncrement}
              disabled={quantity >= 99}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 text-zinc-600 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <p className="text-sm font-semibold text-black">
            ${subtotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
