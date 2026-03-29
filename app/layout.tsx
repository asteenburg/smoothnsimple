import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smooth & Simple Cosmetics",
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
      className='scroll-smooth'
    >
      {/* min-h-screen and flow-root ensure the page can grow as long as it needs to */}
      <body
        className={`${inter.className} bg-black text-white min-h-screen flow-root`}
      >
        {children}
      </body>
    </html>
  );
}
