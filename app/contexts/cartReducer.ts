import type { CartState, CartAction } from "@/app/types/cart";

export const initialCartState: CartState = {
  items: [],
  isOpen: false,
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingIndex >= 0) {
        // Item exists, increment quantity (max 99)
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: Math.min(newItems[existingIndex].quantity + 1, 99),
        };
        return { ...state, items: newItems };
      }

      // New item, add with quantity 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.payload),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;

      // Validate quantity range (1-99)
      if (quantity < 1 || quantity > 99 || !Number.isInteger(quantity)) {
        return state; // Invalid, no change
      }

      const newItems = state.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );

      return { ...state, items: newItems };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        items: [],
      };
    }

    case "LOAD_CART": {
      return {
        ...state,
        items: action.payload,
      };
    }

    case "TOGGLE_PANEL": {
      return {
        ...state,
        isOpen: action.payload !== undefined ? action.payload : !state.isOpen,
      };
    }

    default:
      return state;
  }
}
