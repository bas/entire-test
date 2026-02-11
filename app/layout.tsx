import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/app/contexts/CartContext";
import { ToastProvider } from "@/app/contexts/ToastContext";
import CartPanel from "@/app/components/cart/CartPanel";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Octodeco - GitHub Octocat Stickers",
  description: "Shop premium GitHub Octocat-themed stickers. Show your love for open source with our unique collection of 20 different designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <ToastProvider>
            {children}
            <CartPanel />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
