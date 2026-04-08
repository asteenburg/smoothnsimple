import type { Metadata } from "next";
import Script from "next/script";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

// 1. Optimized Metadata Object
export const metadata: Metadata = {
  title: {
    default: "Smooth N Simple | Medical Aesthetics Brantford",
    template: "%s | Smooth N Simple",
  },
  description: "Professional medical aesthetics in Brantford, ON. Specializing in Botox, lip flips, and B12 injections for natural-looking results.",
  keywords: ["Botox Brantford", "Lip Flip Ontario", "Nurse Injector Brantford", "Medical Aesthetics", "Smooth N Simple"],
  metadataBase: new URL("https://www.smoothnsimple.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Smooth N Simple | Medical Aesthetics",
    description: "Expert injectable treatments and medical aesthetics in Brantford, Ontario.",
    url: "https://www.smoothnsimple.com",
    siteName: "Smooth N Simple",
    locale: "en_CA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        {/* 2. Structured Data (JSON-LD) for Local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Smooth N Simple",
              "image": "https://www.smoothnsimple.com/logo.png", // Replace with your actual logo path
              "url": "https://www.smoothnsimple.com",
              "telephone": "+1-519-XXX-XXXX", // Add actual phone
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Your Street Address", // Add actual address
                "addressLocality": "Brantford",
                "addressRegion": "ON",
                "postalCode": "N3T", // Add actual postal code
                "addressCountry": "CA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 43.1394, 
                "longitude": -80.2644
              },
              "founder": {
                "@type": "Person",
                "name": "Shelby McDonald",
                "jobTitle": "Nurse Injector"
              }
            }),
          }}
        />
      </head>
      <body className='bg-black antialiased'>
        <CartProvider>
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
