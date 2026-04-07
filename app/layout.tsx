import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import CookieBanner from "../components/cookies/CookieBanner";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smooth & Simple | Medical Aesthetics",
  description: "Professional Botox & Aesthetic Treatments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className='scroll-smooth bg-black'
    >
      <head>
        <Script
          src='https://web.squarecdn.com/v1/square.js'
          strategy='beforeInteractive'
        />
      </head>
      <body
        className={`${inter.className} bg-black text-white min-h-screen antialiased selection:bg-pink-500/30`}
      >
        <CartProvider>
          <div className='relative flex flex-col min-h-screen'>{children}</div>
        </CartProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
