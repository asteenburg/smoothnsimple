import type { Metadata } from "next";
import Script from "next/script";
import { CartProvider } from "./context/CartContext"; // 1. Import your provider
import "./globals.css";

export const metadata: Metadata = {
  title: "Smooth N Simple | Medical Aesthetics",
  description: "Professional Medical Aesthetics in Brantford, ON",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-black antialiased'>
        {/* 2. Wrap EVERYTHING in the CartProvider so useCart() works everywhere */}
        <CartProvider>
          {/* 3. Move Square script here and change strategy to 'afterInteractive' 
              This is the safest way to avoid hydration/Turbopack errors while 
              still ensuring Square is ready by the time they hit the cart. */}
          <Script
            src='https://web.squarecdn.com/v1/square.js'
            strategy='afterInteractive'
          />

          {children}
        </CartProvider>
      </body>
    </html>
  );
}
