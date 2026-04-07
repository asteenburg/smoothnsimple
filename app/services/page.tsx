"use client";

import { useCart } from "@/app/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles, CheckCircle2, ShoppingBag } from "lucide-react";

interface Package {
  id: number;
  title: string;
  price: number;
  description: string;
}

const SERVICE_PACKAGES: Package[] = [
  {
    id: 1,
    title: "Botox",
    price: 8.0,
    description:
      "Botox decreases fine lines and wrinkles to forehead, frown lines and crows feet. As well as other areas of the face. Results typically last 3-4 months. Treatment time is approximately 30 minutes",
  },
  {
    id: 2,
    title: "Lip Flip",
    price: 60.0,
    description:
      "A Lip Flip is a non-surgical cosmetic procedure that uses strategically placed Botox injections to subtly enhance the appearance of the upper lip. By relaxing the muscles around the mouth, the upper lip can appear fuller and more defined, creating a natural-looking pout without the need for fillers.",
  },
  {
    id: 3,
    title: "B12 Injections",
    price: 50.0,
    description:
      "Book a consultation for B12 Injections. B12 injections can help boost energy levels, improve mood, and support overall health. During the consultation, we will discuss your health goals and determine if B12 injections are the right choice for you.",
  },
];

export default function ServicesPage() {
  const { addToCart } = useCart();

  const handleAddToCart = (pkg: Package) => {
    // FIX: Convert the numeric ID to a string to satisfy the CartItem type
    addToCart({
      id: pkg.id.toString(), // critical fix for the Type Error
      title: pkg.title,
      price: pkg.price,
      quantity: 1,
    });
  };

  return (
    <div className='bg-black min-h-screen text-white flex flex-col selection:bg-pink-600/30'>
      <Header />

      <main className='flex-1 max-w-7xl mx-auto px-6 py-24 w-full'>
        <div className='mb-20'>
          <h1 className='text-6xl md:text-5xl italic uppercase tracking-tighter mb-4'>
            Services
          </h1>
          <div className='h-[3px] w-20 bg-pink-600 rounded-full shadow-[0_0_15px_rgba(219,39,119,0.5)]'></div>
          <p className='text-zinc-500 text-[10px] uppercase font-black tracking-[0.4em] mt-8'>
            Professional Medical Aesthetics
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          {SERVICE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className='group relative bg-zinc-900/30 border border-white/5 p-10 rounded-[3rem] hover:bg-zinc-900/60 transition-all duration-500 hover:border-pink-500/20 flex flex-col'
            >
              <div className='flex justify-between items-start mb-8'>
                <div className='p-3 bg-pink-600/10 rounded-2xl text-pink-500'>
                  <Sparkles size={24} />
                </div>
                <span className='text-4xl font-black italic tracking-tighter text-white'>
                  ${pkg.price.toFixed(0)}
                </span>
              </div>

              <h3 className='text-3xl font-black italic uppercase tracking-tight mb-4 group-hover:text-pink-500 transition-colors'>
                {pkg.title}
              </h3>

              <p className='text-zinc-400 text-sm leading-relaxed mb-8 flex-1'>
                {pkg.description}
              </p>

              {/*<ul className='space-y-4 mb-10'>
                {pkg.features.map((feature, i) => (
                  <li
                    key={i}
                    className='flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500'
                  >
                    <CheckCircle2
                      size={14}
                      className='text-pink-600'
                    />
                    {feature}
                  </li>
                ))}
              </ul>*/}

              {/*<button
                onClick={() => handleAddToCart(pkg)}
                className='w-full py-6 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-pink-600 hover:text-white transition-all duration-500 active:scale-95 shadow-2xl'
              >
                <ShoppingBag size={16} />
                Book Service
              </button>*/}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
