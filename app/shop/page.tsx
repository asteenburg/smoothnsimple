"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../context/CartContext";

type ShopItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  featured?: boolean;
};

export default function Shop() {
  const { addToCart } = useCart();
  const [tab, setTab] = useState<"services" | "packages" | "giftcards">(
    "services",
  );

  const services: ShopItem[] = [
    {
      id: 1,
      title: "Botox Injections",
      price: 8,
      description: "Botox decreases fine lines and wrinkles.",
    },
    {
      id: 2,
      title: "Lip Flip",
      price: 60,
      description: "Lip flip relaxes muscles around the mouth.",
    },
    {
      id: 3,
      title: "B12 Injections",
      price: 50,
      description: "Contact to book this treatment.",
    },
  ];

  const packages: ShopItem[] = [
    {
      id: 101,
      title: "50 Units Botox",
      price: 350,
      description: "Perfect intro package.",
      featured: false,
    },
    {
      id: 102,
      title: "100 Units Botox",
      price: 600,
      description: "Combination treatment.",
      featured: true,
    },
  ];

  const giftcards: ShopItem[] = [
    {
      id: 201,
      title: "$50 Gift Card",
      price: 50,
      description: "Give the gift of beauty!",
    },
    {
      id: 202,
      title: "$100 Gift Card",
      price: 100,
      description: "Treat someone special.",
    },
  ];

  const currentItems =
    tab === "services" ? services : tab === "packages" ? packages : giftcards;

  return (
    <div className='flex flex-col min-h-screen bg-black text-white'>
      <Header />

      <main className='flex-1 max-w-7xl mx-auto px-6 py-12'>
        <h2 className='text-5xl tracking-tighter uppercase italic mb-4 text-center text-white'>
          Shop
        </h2>
        <div className='h-1 w-24 bg-pink-600 mx-auto rounded-full mb-10'></div>

        {/* Tabs */}
        <div className='flex justify-center mb-10 flex-wrap gap-4'>
          {["services", "packages", "giftcards"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as typeof tab)}
              className={`px-6 py-2 uppercase font-bold text-sm border-b-2 transition ${
                tab === t
                  ? "border-pink-500 text-pink-500"
                  : "border-transparent text-gray-400"
              }`}
            >
              {t === "giftcards"
                ? "Gift Cards"
                : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div
          className={`grid gap-8 ${
            currentItems.length === 1
              ? "grid-cols-1 justify-items-center"
              : currentItems.length === 2
                ? "grid-cols-2 justify-items-center"
                : "md:grid-cols-3 justify-items-center"
          }`}
        >
          {currentItems.map((item) => (
            <div
              key={item.id}
              className={`w-full max-w-md bg-zinc-900 p-6 rounded-2xl shadow-lg flex flex-col justify-between transition hover:scale-105 ${
                item.featured ? "border-2 border-pink-600" : ""
              }`}
            >
              <h3 className='text-xl font-bold mb-2'>{item.title}</h3>
              <p className='text-gray-400 mb-4'>{item.description}</p>
              <p className='text-2xl font-bold text-pink-500'>${item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className='mt-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg'
              >
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
