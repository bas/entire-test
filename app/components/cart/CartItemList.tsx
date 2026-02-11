"use client";

import CartItem from "@/app/components/cart/CartItem";
import type { CartItem as CartItemType } from "@/app/types/cart";

interface CartItemListProps {
  items: CartItemType[];
}

export default function CartItemList({ items }: CartItemListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
      {items.map((item) => (
        <CartItem key={item.productId} item={item} />
      ))}
    </div>
  );
}
