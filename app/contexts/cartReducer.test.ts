import { describe, it, expect } from "vitest";
import { cartReducer, initialCartState } from "./cartReducer";
import type { CartState } from "@/app/types/cart";

describe("cartReducer", () => {
  describe("ADD_ITEM", () => {
    it("should add a new item with quantity 1", () => {
      const state = initialCartState;
      const newItem = {
        productId: "test-1",
        name: "Test Product",
        price: 9.99,
        image: "/test.png",
      };

      const result = cartReducer(state, {
        type: "ADD_ITEM",
        payload: newItem,
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toEqual({
        ...newItem,
        quantity: 1,
      });
    });

    it("should increment quantity if item already exists", () => {
      const state: CartState = {
        items: [
          {
            productId: "test-1",
            name: "Test Product",
            price: 9.99,
            image: "/test.png",
            quantity: 2,
          },
        ],
        isOpen: false,
      };

      const result = cartReducer(state, {
        type: "ADD_ITEM",
        payload: {
          productId: "test-1",
          name: "Test Product",
          price: 9.99,
          image: "/test.png",
        },
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].quantity).toBe(3);
    });

    it("should not exceed quantity of 99", () => {
      const state: CartState = {
        items: [
          {
            productId: "test-1",
            name: "Test Product",
            price: 9.99,
            image: "/test.png",
            quantity: 99,
          },
        ],
        isOpen: false,
      };

      const result = cartReducer(state, {
        type: "ADD_ITEM",
        payload: {
          productId: "test-1",
          name: "Test Product",
          price: 9.99,
          image: "/test.png",
        },
      });

      expect(result.items[0].quantity).toBe(99);
    });
  });

  describe("REMOVE_ITEM", () => {
    it("should remove item by productId", () => {
      const state: CartState = {
        items: [
          {
            productId: "test-1",
            name: "Test Product 1",
            price: 9.99,
            image: "/test1.png",
            quantity: 1,
          },
          {
            productId: "test-2",
            name: "Test Product 2",
            price: 19.99,
            image: "/test2.png",
            quantity: 1,
          },
        ],
        isOpen: false,
      };

      const result = cartReducer(state, {
        type: "REMOVE_ITEM",
        payload: "test-1",
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].productId).toBe("test-2");
    });

    it("should handle removing non-existent item", () => {
      const state: CartState = {
        items: [
          {
            productId: "test-1",
            name: "Test Product",
            price: 9.99,
            image: "/test.png",
            quantity: 1,
          },
        ],
        isOpen: false,
      };

      const result = cartReducer(state, {
        type: "REMOVE_ITEM",
        payload: "non-existent",
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].productId).toBe("test-1");
    });
  });

  describe("UPDATE_QUANTITY", () => {
    const state: CartState = {
      items: [
        {
          productId: "test-1",
          name: "Test Product",
          price: 9.99,
          image: "/test.png",
          quantity: 5,
        },
      ],
      isOpen: false,
    };

    it("should update quantity to valid value", () => {
      const result = cartReducer(state, {
        type: "UPDATE_QUANTITY",
        payload: { productId: "test-1", quantity: 10 },
      });

      expect(result.items[0].quantity).toBe(10);
    });

    it("should reject quantity less than 1", () => {
      const result = cartReducer(state, {
        type: "UPDATE_QUANTITY",
        payload: { productId: "test-1", quantity: 0 },
      });

      expect(result.items[0].quantity).toBe(5); // Unchanged
    });

    it("should reject quantity greater than 99", () => {
      const result = cartReducer(state, {
        type: "UPDATE_QUANTITY",
        payload: { productId: "test-1", quantity: 100 },
      });

      expect(result.items[0].quantity).toBe(5); // Unchanged
    });

    it("should reject non-integer quantity", () => {
      const result = cartReducer(state, {
        type: "UPDATE_QUANTITY",
        payload: { productId: "test-1", quantity: 5.5 },
      });

      expect(result.items[0].quantity).toBe(5); // Unchanged
    });

    it("should accept boundary values (1 and 99)", () => {
      const result1 = cartReducer(state, {
        type: "UPDATE_QUANTITY",
        payload: { productId: "test-1", quantity: 1 },
      });
      expect(result1.items[0].quantity).toBe(1);

      const result99 = cartReducer(state, {
        type: "UPDATE_QUANTITY",
        payload: { productId: "test-1", quantity: 99 },
      });
      expect(result99.items[0].quantity).toBe(99);
    });
  });

  describe("CLEAR_CART", () => {
    it("should clear all items from cart", () => {
      const state: CartState = {
        items: [
          {
            productId: "test-1",
            name: "Test Product 1",
            price: 9.99,
            image: "/test1.png",
            quantity: 1,
          },
          {
            productId: "test-2",
            name: "Test Product 2",
            price: 19.99,
            image: "/test2.png",
            quantity: 2,
          },
        ],
        isOpen: true,
      };

      const result = cartReducer(state, { type: "CLEAR_CART" });

      expect(result.items).toHaveLength(0);
      expect(result.isOpen).toBe(true); // isOpen should remain unchanged
    });
  });

  describe("LOAD_CART", () => {
    it("should load items from payload", () => {
      const state = initialCartState;
      const items = [
        {
          productId: "test-1",
          name: "Test Product",
          price: 9.99,
          image: "/test.png",
          quantity: 3,
        },
      ];

      const result = cartReducer(state, {
        type: "LOAD_CART",
        payload: items,
      });

      expect(result.items).toEqual(items);
    });
  });

  describe("TOGGLE_PANEL", () => {
    it("should toggle panel open state", () => {
      const state = initialCartState;
      expect(state.isOpen).toBe(false);

      const result1 = cartReducer(state, { type: "TOGGLE_PANEL" });
      expect(result1.isOpen).toBe(true);

      const result2 = cartReducer(result1, { type: "TOGGLE_PANEL" });
      expect(result2.isOpen).toBe(false);
    });

    it("should set panel to specific state when payload provided", () => {
      const state = initialCartState;

      const result1 = cartReducer(state, {
        type: "TOGGLE_PANEL",
        payload: true,
      });
      expect(result1.isOpen).toBe(true);

      const result2 = cartReducer(result1, {
        type: "TOGGLE_PANEL",
        payload: false,
      });
      expect(result2.isOpen).toBe(false);
    });
  });
});
