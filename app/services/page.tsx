"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Calendar } from "lucide-react";

interface Package {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
}

const SERVICE_PACKAGES: Package[] = [
  {
    id: 1,
    title: "Botox",
    price: "$8.00 / Unit",
    image: "/images/jump1987-botox-10084507.jpg",
    description:
      "Botox decreases fine lines and wrinkles to forehead, frown lines and crows feet. Results typically last 3-4 months. Treatment time is approximately 30 minutes.",
  },
  {
    id: 2,
    title: "Lip Flip",
    price: "$60.00",
    image: "/images/1000020714.jpg",
    description:
      "A non-surgical cosmetic procedure that uses strategically placed Botox to subtly enhance the upper lip for a fuller, natural-looking pout.",
  },
  {
    id: 3,
    title: "B12 Injections",
    price: "$50.00",
    image: "/images/10000207242.PNG",
    description:
      "Boost energy levels, improve mood, and support overall health. Book a consultation to determine if B12 is the right choice for you.",
  },
];

export default function ServicesPage() {
  return (
    <div className='bg-black min-h-screen text-white flex flex-col selection:bg-pink-600/30'>
      <Header />

      {/* --- HERO SECTION (Outside main for full-width) --- */}
      <section className='relative h-[60vh] min-h-[400px] w-full flex items-center overflow-hidden border-b border-white/5'>
        {/* Background Image Overlay */}
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <Image
            src='/images/joe-woods-4Zaq5xY5M_c-unsplash.jpg'
            alt='Smooth N Simple Services'
            fill
            className='object-cover opacity-40 brightness-50'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent' />
        </div>

        {/* Hero Text */}
        <div className='relative z-10 max-w-4xl mx-auto text-center px-6 pt-20'>
          <h1 className='text-4xl md:text-8xl font-black italic uppercase tracking-tighter leading-none'>
            Smooth <span className='text-pink-600'>N</span> Simple
          </h1>
          <p className='text-zinc-500 text-2xl md:text-4xl uppercase font-black tracking-[0.5em] md:tracking-[1em] mt-8'>
            Services
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className='flex-1 max-w-7xl mx-auto px-6 py-24 w-full'>
        {/* Services Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {SERVICE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className='group bg-zinc-900/20 border border-white/5 rounded-[3rem] overflow-hidden flex flex-col transition-all duration-500 hover:border-pink-500/30 hover:bg-zinc-900/40'
            >
              {/* Image Header */}
              <div className='relative h-80 w-full overflow-hidden bg-zinc-800'>
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className='object-cover transition-transform duration-700 ease-out group-hover:scale-110'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70' />

                <div className='absolute bottom-6 left-8'>
                  <p className='text-2xl font-black italic tracking-tighter text-white'>
                    {pkg.price}
                  </p>
                </div>
              </div>

              {/* Content Body */}
              <div className='p-10 flex flex-col flex-1'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='p-2 bg-pink-600/10 rounded-lg text-pink-500'>
                    <Sparkles size={16} />
                  </div>
                  <h3 className='text-3xl font-black italic uppercase tracking-tight group-hover:text-pink-600 transition-colors'>
                    {pkg.title}
                  </h3>
                </div>

                <p className='text-zinc-400 text-sm leading-relaxed mb-10 flex-1'>
                  {pkg.description}
                </p>

                <Link
                  href='/book'
                  className='w-full py-6 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-pink-600 hover:text-white transition-all duration-500 shadow-xl'
                >
                  <Calendar size={14} />
                  Book Appointment
                  <ArrowRight
                    size={14}
                    className='opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all'
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation Hook */}
        <div className='mt-24 p-12 bg-zinc-900/40 border border-white/5 rounded-[4rem] text-center'>
          <h2 className='text-3xl font-black italic uppercase tracking-tighter mb-4'>
            Not sure where to start?
          </h2>
          <p className='text-zinc-500 text-xs uppercase font-bold tracking-widest mb-10'>
            Consultations are always complimentary
          </p>
          <Link
            href='/book'
            className='text-pink-500 font-black italic uppercase tracking-widest text-[10px] hover:text-white transition-colors border-b border-pink-500/30 pb-2'
          >
            Schedule a Consultation
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
