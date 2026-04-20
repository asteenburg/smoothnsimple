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
      "Smooth fine lines and soften wrinkles in the forehead, frown lines, and crow’s feet. Results typically last 3–4 months with a quick, 30-minute treatment.",
  },
  {
    id: 2,
    title: "Lip Flip",
    price: "$60.00",
    image: "/images/1000020714.jpg",
    description:
      "A subtle enhancement using Botox to gently roll the upper lip for a naturally fuller, more balanced appearance.",
  },
  {
    id: 3,
    title: "B12 Injections",
    price: "$50.00",
    image: "/images/10000207242.PNG",
    description:
      "Support energy, mood, and overall wellness with a quick intramuscular B12 injection tailored to your needs.",
  },
];

export default function ServicesPage() {
  return (
    <div className='bg-black min-h-screen text-white flex flex-col selection:bg-pink-600/30'>
      <Header />

      {/* HERO */}
      <section className='relative h-[60vh] min-h-[420px] w-full flex items-center overflow-hidden border-b border-zinc-900'>
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <Image
            src='/images/joe-woods-4Zaq5xY5M_c-unsplash.jpg'
            alt='Smooth N Simple Services'
            fill
            className='object-cover opacity-35 brightness-50'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-b from-pink-600/10 via-black/40 to-black' />
        </div>

        <div className='relative z-10 max-w-5xl mx-auto text-center px-6 pt-16'>
          <p className='text-pink-500 uppercase tracking-[0.35em] text-xs md:text-sm font-bold mb-5'>
            Smooth N Simple
          </p>

          <h1 className='text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none'>
            Services
          </h1>

          <p className='text-zinc-400 text-base md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed'>
            Medical aesthetic treatments designed to enhance, refresh, and
            restore your natural features.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <main className='flex-1 max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 w-full'>
        {/* GRID */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {SERVICE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className='group bg-gradient-to-b from-zinc-950 to-black border border-zinc-800 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:border-pink-600/40'
            >
              {/* IMAGE */}
              <div className='relative h-72 w-full overflow-hidden'>
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent' />

                <div className='absolute bottom-5 left-6'>
                  <p className='text-2xl font-black tracking-tight text-white'>
                    {pkg.price}
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <div className='p-6 md:p-8 flex flex-col flex-1'>
                <div className='flex items-center gap-3 mb-5'>
                  <div className='p-2 bg-white text-black rounded-xl group-hover:bg-pink-600 group-hover:text-white transition'>
                    <Sparkles size={14} />
                  </div>

                  <h3 className='text-2xl md:text-3xl font-black tracking-tight group-hover:text-pink-600 transition-colors'>
                    {pkg.title}
                  </h3>
                </div>

                <p className='text-zinc-400 text-sm leading-relaxed mb-8 flex-1'>
                  {pkg.description}
                </p>

                <Link
                  href='/book'
                  className='w-full py-4 bg-white text-black rounded-full font-bold flex items-center justify-center gap-3 hover:bg-pink-600 hover:text-white transition-all duration-300'
                >
                  <Calendar size={14} />
                  Book Appointment
                  <ArrowRight
                    size={14}
                    className='group-hover:translate-x-1 transition-transform'
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CONSULTATION */}
        <div className='mt-16 md:mt-24 p-10 md:p-14 bg-gradient-to-b from-zinc-950 to-black border border-zinc-800 rounded-3xl text-center'>
          <h2 className='text-3xl md:text-4xl font-black tracking-tight mb-4'>
            Not sure where to start?
          </h2>

          <p className='text-zinc-400 text-sm md:text-base mb-8'>
            Consultations are always complimentary and tailored to your goals.
          </p>

          <Link
            href='/book'
            className='inline-block text-pink-500 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors border-b border-pink-500/30 pb-2'
          >
            Schedule a Consultation
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
