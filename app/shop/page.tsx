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
      price: 350.0,
      description:
        "Bank your beauty. Includes 50 units of Botox to use as needed.",
      category: "Package",
    },
    {
      id: "pkg-02",
      title: "Botox 100",
      price: 650.0,
      description:
        "The ultimate bank. 100 units for full-face precision and maintenance.",
      category: "Package",
    },
  ],
  services: [
    {
      id: "btx-01",
      title: "10 Units Botox",
      price: 80.0,
      description:
        "Precision touch-up. Perfect for subtle brow lifts or fine lines.",
      category: "Clinical",
    },
    {
      id: "btx-02",
      title: "20 Units Botox",
      price: 160.0,
      description: "Standard dose for forehead or glabella treatments.",
      category: "Clinical",
    },
    {
      id: "btx-03",
      title: "50 Units Botox",
      price: 400.0,
      description: "Full upper face rejuvenation with expert mapping.",
      category: "Clinical",
    },
    {
      id: "lip-01",
      title: "Lip Flip",
      price: 60.0,
      description:
        "Subtle eversion of the upper lip for a natural, fuller pout.",
      category: "Clinical",
    },
    {
      id: "b12-01",
      title: "B12 Vitamin Shot",
      price: 50.0,
      description:
        "Intramuscular injection for energy, mood, and metabolic support.",
      category: "Wellness",
    },
  ],
  giftcards: [
    {
      id: "gc-50",
      title: "$50 Gift Card",
      price: 50.0,
      description: "Digital gift card delivered instantly via email.",
      category: "Gift Card",
    },
    {
      id: "gc-100",
      title: "$100 Gift Card",
      price: 100.0,
      description: "The perfect gift for a refresh or initial consultation.",
      category: "Gift Card",
    },
    {
      id: "gc-500",
      title: "$500 VIP Card",
      price: 500.0,
      description: "The ultimate transformation gift for someone special.",
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

      {/* --- HERO SECTION --- */}
      <section className='relative h-[60vh] min-h-[400px] w-full flex items-center overflow-hidden border-b border-white/5'>
        {/* Background Image: pointer-events-none ensures it doesn't block clicks */}
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <Image
            src='/images/joe-woods-4Zaq5xY5M_c-unsplash.jpg'
            alt='Smooth N Simple Shop'
            fill
            className='object-cover opacity-40 brightness-50'
            priority
          />
          {/* Gradient Overlay: pointer-events-none ensures it's "clickable through" */}
          <div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent' />
        </div>

        {/* Text Content: Centered and positioned above the overlays */}
        <div className='relative z-10 max-w-4xl mx-auto text-center px-6 pt-20'>
          <h1 className='text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none'>
            Smooth <span className='text-pink-600'>N</span> Simple
          </h1>
          <p className='text-zinc-500 text-2xl md:text-4xl uppercase font-black tracking-[0.5em] md:tracking-[1em] mt-8'>
            Shop
          </p>
        </div>
      </section>

      <main className='flex-1 max-w-7xl mx-auto px-6 py-24 w-full'>
        {/* Tab Navigation */}
        <div className='flex flex-wrap gap-3 mb-16'>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-500 border-2 ${
                  activeTab === tab.id
                    ? "bg-white text-black border-white shadow-2xl scale-105"
                    : "bg-zinc-900/40 text-zinc-500 border-white/5 hover:border-pink-500/30"
                }`}
              >
                <Icon
                  size={14}
                  className={activeTab === tab.id ? "text-pink-600" : ""}
                />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {PRODUCTS[activeTab as keyof typeof PRODUCTS].map((product) => (
            <div
              key={product.id}
              className='group relative bg-zinc-900/20 border border-white/5 p-10 rounded-[3.5rem] hover:bg-zinc-900/40 transition-all duration-500 hover:border-pink-500/20 flex flex-col'
            >
              <div className='flex justify-between items-start mb-10'>
                <div className='p-3 bg-white text-black rounded-2xl group-hover:bg-pink-600 group-hover:text-white transition-colors'>
                  <ShoppingBag size={20} />
                </div>
                <div className='text-right'>
                  <p className='text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1'>
                    {product.category}
                  </p>
                  <span className='text-3xl font-black italic tracking-tighter text-white'>
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <h3 className='text-3xl font-black italic uppercase tracking-tight mb-4 group-hover:text-pink-600 transition-colors'>
                {product.title}
              </h3>

              <p className='text-zinc-500 text-sm leading-relaxed mb-10 flex-1 italic'>
                "{product.description}"
              </p>

              <button
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className='w-full py-6 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-pink-600 hover:text-white transition-all duration-500 active:scale-95 shadow-xl group/btn'
              >
                Buy Now
                <ArrowRight
                  size={14}
                  className='group-hover/btn:translate-x-1 transition-transform'
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
