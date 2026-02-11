"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") {
      setIsHydrated(true);
      return;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        setStoredValue(parsed);
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      // Cart still works in-memory, just doesn't persist
    }

    setIsHydrated(true);
  }, [key]);

  // Debounced save to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function for same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        // Update state immediately
        setStoredValue(valueToStore);

        // Debounce localStorage writes to avoid excessive I/O
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(() => {
          if (typeof window !== "undefined") {
            try {
              window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
              // Handle quota exceeded or other localStorage errors
              console.error(`Error saving ${key} to localStorage:`, error);
              if (error instanceof Error && error.name === "QuotaExceededError") {
                console.warn("localStorage quota exceeded. Cart will work in-memory only.");
              }
            }
          }
        }, 100); // 100ms debounce
      } catch (error) {
        console.error(`Error updating ${key}:`, error);
      }
    },
    [key, storedValue]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return [storedValue, setValue, isHydrated];
}
