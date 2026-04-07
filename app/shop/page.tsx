"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingBag, Star, Gift, Sparkles } from "lucide-react";

const TABS = [
  { id: "services", label: "Clinical Treatments", icon: Sparkles },
  { id: "giftcards", label: "Gift Cards", icon: Gift },
];

const PRODUCTS = {
  services: [
    {
      id: "btx-01",
      title: "Botox Cosmetic",
      price: 8.0,
      description: "Per unit. Minimum 20 units typically required.",
      category: "Injections",
    },
    {
      id: "lip-01",
      title: "Lip Flip",
      price: 60.0,
      description: "Subtle eversion of the upper lip using neurotoxin.",
      category: "Injections",
    },
    {
      id: "b12-01",
      title: "B12 Vitamin Shot",
      price: 50.0,
      description: "Boost energy and metabolism with a quick IM injection.",
      category: "Wellness",
    },
  ],
  giftcards: [
    {
      id: "gc-50",
      title: "$50 Gift Card",
      price: 50.0,
      description: "Digital gift card delivered via email.",
      category: "Gift Cards",
    },
    {
      id: "gc-100",
      title: "$100 Gift Card",
      price: 100.0,
      description: "Digital gift card delivered via email.",
      category: "Gift Cards",
    },
    {
      id: "gc-500",
      title: "$500 VIP Card",
      price: 500.0,
      description: "The ultimate gift for a full transformation.",
      category: "Gift Cards",
    },
  ],
};

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("services");
  const { addToCart } = useCart();

  return (
    <div className='bg-black min-h-screen text-white flex flex-col selection:bg-pink-600/30'>
      <Header />

      <main className='flex-1 max-w-7xl mx-auto px-6 py-20 w-full'>
        {/* Page Title */}
        <div className='mb-16'>
          <h1 className='text-6xl md:text-5xl italic uppercase tracking-tighter mb-2'>
            Shop
          </h1>
          {/* The Line: Left Aligned, Pink, slightly rounded */}
          <div className='h-[3px] w-16 bg-pink-600 rounded-full'></div>
        </div>

        {/* Tab Navigation */}
        <div className='flex flex-wrap gap-4 mb-12'>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all duration-500 border ${
                  activeTab === tab.id
                    ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    : "bg-zinc-900/50 text-zinc-500 border-white/5 hover:border-pink-500/50"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700'>
          {PRODUCTS[activeTab as keyof typeof PRODUCTS].map((product) => (
            <div
              key={product.id}
              className='group bg-zinc-900/30 border border-white/5 p-8 rounded-[3rem] hover:bg-zinc-900/60 transition-all duration-500 hover:border-pink-500/20'
            >
              <div className='flex justify-between items-start mb-6'>
                <span className='text-[9px] font-black uppercase tracking-[0.2em] text-pink-600 bg-pink-600/10 px-3 py-1 rounded-full'>
                  {product.category}
                </span>
                <span className='text-2xl font-black italic tracking-tighter text-white'>
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <h3 className='text-2xl font-black italic uppercase tracking-tight mb-3 group-hover:text-pink-500 transition-colors'>
                {product.title}
              </h3>

              <p className='text-zinc-500 text-xs leading-relaxed mb-8 h-12 overflow-hidden'>
                {product.description}
              </p>

              <button
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className='w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-pink-600 hover:text-white transition-all duration-500 active:scale-95 shadow-xl'
              >
                <ShoppingBag size={14} />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
