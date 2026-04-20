"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { ShoppingBag, Star, Gift, Sparkles, ArrowRight } from "lucide-react";

const TABS = [
  { id: "services", label: "Treatments", icon: Sparkles },
  { id: "packages", label: "Bundles", icon: Star },
  { id: "giftcards", label: "Gifting", icon: Gift },
];

const PRODUCTS = {
  packages: [
    {
      id: "pkg-01",
      title: "Botox 50",
      price: 350,
      description:
        "Bank your beauty. Includes 50 units of Botox to use as needed.",
      category: "Package",
    },
    {
      id: "pkg-02",
      title: "Botox 100",
      price: 650,
      description:
        "The ultimate beauty bank. 100 units for maintenance and precision.",
      category: "Package",
    },
  ],
  services: [
    {
      id: "btx-01",
      title: "10 Units Botox",
      price: 80,
      description:
        "Perfect for subtle touch-ups, brow lifts, or softening fine lines.",
      category: "Clinical",
    },
    {
      id: "btx-02",
      title: "20 Units Botox",
      price: 160,
      description: "Ideal for forehead or glabella treatments.",
      category: "Clinical",
    },
    {
      id: "btx-03",
      title: "50 Units Botox",
      price: 400,
      description: "Full upper-face rejuvenation with expert mapping.",
      category: "Clinical",
    },
    {
      id: "lip-01",
      title: "Lip Flip",
      price: 60,
      description: "A subtle enhancement for a naturally fuller upper lip.",
      category: "Clinical",
    },
    {
      id: "b12-01",
      title: "B12 Vitamin Shot",
      price: 50,
      description: "Wellness support for energy, mood, and metabolism.",
      category: "Wellness",
    },
  ],
  giftcards: [
    {
      id: "gc-50",
      title: "$50 Gift Card",
      price: 50,
      description: "Delivered digitally by email.",
      category: "Gift Card",
    },
    {
      id: "gc-100",
      title: "$100 Gift Card",
      price: 100,
      description: "Perfect for a refresh or first visit.",
      category: "Gift Card",
    },
    {
      id: "gc-500",
      title: "$500 VIP Gift Card",
      price: 500,
      description: "A premium gift for someone special.",
      category: "Gift Card",
    },
  ],
};

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("services");
  const { addToCart } = useCart();

  return (
    <div className='bg-black min-h-screen text-white flex flex-col selection:bg-pink-600/30'>
      <Header />

      {/* HERO */}
      <section className='relative h-[60vh] min-h-[420px] w-full flex items-center overflow-hidden border-b border-zinc-900'>
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <Image
            src='/images/joe-woods-4Zaq5xY5M_c-unsplash.jpg'
            alt='Smooth N Simple Shop'
            fill
            priority
            className='object-cover opacity-35 brightness-50'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-pink-600/10 via-black/30 to-black' />
        </div>

        <div className='relative z-10 max-w-5xl mx-auto text-center px-6 pt-16'>
          <p className='text-pink-500 uppercase tracking-[0.35em] text-xs md:text-sm font-bold mb-5'>
            Smooth N Simple
          </p>

          <h1 className='text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none'>
            Shop Treatments
          </h1>

          <p className='text-zinc-400 text-base md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed'>
            Premium treatments, curated bundles, and thoughtful gifting options.
          </p>
        </div>
      </section>

      <main className='flex-1 max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 w-full'>
        {/* TABS */}
        <div className='flex flex-wrap gap-3 mb-12 md:mb-16'>
          {TABS.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 md:px-8 py-4 rounded-2xl font-bold uppercase text-[11px] tracking-[0.18em] transition-all duration-300 border ${
                  activeTab === tab.id
                    ? "bg-white text-black border-white"
                    : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-pink-600 hover:text-white"
                }`}
              >
                <Icon
                  size={15}
                  className={activeTab === tab.id ? "text-pink-600" : ""}
                />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* PRODUCTS */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {PRODUCTS[activeTab as keyof typeof PRODUCTS].map((product) => (
            <div
              key={product.id}
              className='group bg-gradient-to-b from-zinc-950 to-black border border-zinc-800 rounded-3xl p-6 md:p-8 hover:border-pink-600/40 transition-all duration-300 flex flex-col'
            >
              <div className='flex justify-between items-start mb-8'>
                <div className='p-3 bg-white text-black rounded-2xl group-hover:bg-pink-600 group-hover:text-white transition'>
                  <ShoppingBag size={18} />
                </div>

                <div className='text-right'>
                  <p className='text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1 font-semibold'>
                    {product.category}
                  </p>

                  <span className='text-2xl md:text-3xl font-black tracking-tight'>
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <h3 className='text-2xl md:text-3xl font-black tracking-tight mb-3 group-hover:text-pink-600 transition-colors'>
                {product.title}
              </h3>

              <p className='text-zinc-400 text-sm leading-relaxed mb-8 flex-1'>
                {product.description}
              </p>

              <button
                onClick={() =>
                  addToCart({
                    ...product,
                    quantity: 1,
                  })
                }
                className='w-full py-4 bg-white text-black rounded-full font-bold flex items-center justify-center gap-3 hover:bg-pink-600 hover:text-white transition-all duration-300 active:scale-95'
              >
                Add to Cart
                <ArrowRight
                  size={15}
                  className='group-hover:translate-x-1 transition-transform'
                />
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
