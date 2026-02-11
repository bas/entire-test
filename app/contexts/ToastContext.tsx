"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface Toast {
  id: string;
  message: string;
  duration: number;
}

interface ToastContextType {
  showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, duration = 3000) => {
    const id = Math.random().toString(36).substring(7);
    const newToast = { id, message, duration };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="animate-slide-up rounded-lg bg-black px-4 py-3 text-sm text-white shadow-lg"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <span>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
