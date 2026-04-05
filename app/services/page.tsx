"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ServiceCard from "../../components/ServiceCard";
import { useCart } from "../context/CartContext";

// ✅ TYPE DEFINITIONS
type Service = {
  title: string;
  price: string;
  description: string;
  image: string;
};

type Package = {
  id: number;
  title: string;
  price: number;
  description: string;
  featured?: boolean;
};

export default function Services() {
  // ✅ USE CART HOOK INSIDE COMPONENT
  const { addToCart: addToGlobalCart } = useCart();

  // ✅ LOCAL CART (optional for preview)
  const [localCart, setLocalCart] = useState<Package[]>([]);

  // ✅ SERVICES DATA
  const services: Service[] = [
    {
      title: "Botox Injections",
      price: "$8.00 per unit",
      description:
        "Botox decreases fine lines and wrinkles on forehead, frown lines, crow’s feet, and more.",
      image: "/images/pexels-shvetsa-4586711.jpg",
    },
    {
      title: "Lip Flip",
      price: "$60.00",
      description:
        "Lip flip uses Botox to relax muscles around the mouth for a fuller, natural-looking upper lip.",
      image: "/images/pexels-farhadirani-34775440.jpg",
    },
    {
      title: "B12 Injections",
      price: "$50.00",
      description:
        "Please contact us to book this treatment. 519-718-3294 nurseinjectorshelby@gmail.com",
      image: "/images/pexels-ron-lach-8626078.jpg",
    },
  ];

  // ✅ PACKAGES DATA
  const packages: Package[] = [
    {
      id: 1,
      title: "50 Units",
      price: 350,
      description: "Perfect intro package for a quick refresh.",
    },
    {
      id: 2,
      title: "100 Units",
      price: 650,
      description: "Combination treatment for noticeable results.",
      featured: true,
    },
  ];

  // ✅ ADD TO CART FUNCTION
  const handleAddToCart = (pkg: Package) => {
    setLocalCart((prev) => [...prev, pkg]);
    addToGlobalCart(pkg);
  };

  // ✅ TOTAL
  const total = localCart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className='flex flex-col min-h-screen overflow-x-hidden bg-black text-white'>
      <Header />

      <main className='flex-1 px-6 py-10 flex flex-col items-center'>
        {/* TITLE */}
        <div data-aos='fade-down'>
          <h2 className='text-5xl tracking-tighter uppercase italic mb-4 text-center'>
            Our Services
          </h2>
          <div className='h-1 w-24 bg-pink-600 mx-auto rounded-full mb-10'></div>
        </div>

        {/* SERVICES GRID */}
        <div
          className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl items-stretch'
          data-aos='fade-up'
        >
          {services.map((s) => (
            <div
              key={s.title}
              className='flex flex-col h-full'
            >
              <ServiceCard {...s} />
            </div>
          ))}
        </div>

        {/* PACKAGES */}
        <section className='w-full max-w-6xl mt-20'>
          <h3 className='text-3xl font-bold text-white text-center mb-6'>
            Packages
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-stretch'>
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-zinc-900 p-6 rounded-2xl text-white shadow-lg flex flex-col h-full justify-between transition hover:scale-105 ${
                  pkg.featured ? "border-2 border-pink-600" : ""
                }`}
              >
                <div>
                  <h4 className='text-xl font-bold mb-2'>{pkg.title}</h4>
                  <p className='text-gray-400 mb-4'>{pkg.description}</p>
                  <p className='text-2xl font-bold text-pink-500'>
                    ${pkg.price}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(pkg)}
                  className='mt-6 bg-pink-600 hover:bg-pink-700 py-2 rounded-lg'
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* CART BAR */}
      {localCart.length > 0 && (
        <div className='fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 p-4 flex justify-between items-center'>
          <span>{localCart.length} item(s) in cart</span>
          <span className='text-pink-500 font-bold'>${total}</span>
        </div>
      )}

      <Footer />
    </div>
  );
}
