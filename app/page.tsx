"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";

// We're importing Header/Footer assuming they exist in your components folder
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className='relative w-full'>
      <Header />

      {/* SECTION 1: HERO */}
      <section className='relative h-[80vh] w-full flex items-center justify-center overflow-hidden'>
        <video
          autoPlay
          muted
          loop
          playsInline
          className='absolute z-0 w-full h-full object-cover opacity-60'
        >
          <source
            src='/videos/293081.mp4'
            type='video/mp4'
          />
        </video>

        <div
          className='relative z-10 text-center px-4'
          data-aos='zoom-in'
        >
          <h1 className='text-5xl md:text-7xl font-extrabold tracking-tighter mb-4'>
            SMOOTH <span className='text-pink-500'>&</span> SIMPLE
          </h1>
          <p className='text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8'>
            Elevating your natural beauty with precision and care.
          </p>
          <div className='flex flex-col md:flex-row gap-4 justify-center'>
            <Link
              href='https://smoothnsimple.janeapp.com'
              target='_blank'
              className='bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105'
            >
              Book Appointment
            </Link>
            <Link
              href='/shop'
              className='bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 rounded-full font-bold transition-all'
            >
              Gift Cards
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE EXPERIENCE (This forces the scroll) */}
      <section className='py-24 bg-zinc-950 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div
            className='text-center mb-16'
            data-aos='fade-up'
          >
            <h2 className='text-3xl md:text-5xl font-bold mb-4'>
              Expert Aesthetics
            </h2>
            <div className='w-24 h-1 bg-pink-500 mx-auto'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
            {/* Treatment 1 */}
            <div
              className='group cursor-pointer'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <div className='relative h-80 w-full mb-6 overflow-hidden rounded-2xl'>
                <Image
                  src='/images/jump1987-botox-10084507.jpg'
                  alt='Botox'
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-110'
                />
              </div>
              <h3 className='text-2xl font-bold mb-2'>Botox & Fillers</h3>
              <p className='text-gray-400'>
                Smooth fine lines and restore volume with our premium injectable
                treatments.
              </p>
            </div>

            {/* Treatment 2 */}
            <div
              className='group cursor-pointer'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              <div className='relative h-80 w-full mb-6 overflow-hidden rounded-2xl'>
                <Image
                  src='/images/pexels-ron-lach-8626078.jpg'
                  alt='Consultation'
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-110'
                />
              </div>
              <h3 className='text-2xl font-bold mb-2'>Skin Rejuvenation</h3>
              <p className='text-gray-400'>
                Tailored facials and treatments designed to bring back your
                glow.
              </p>
            </div>

            {/* Treatment 3 */}
            <div
              className='group cursor-pointer'
              data-aos='fade-up'
              data-aos-delay='300'
            >
              <div className='relative h-80 w-full mb-6 overflow-hidden rounded-2xl'>
                <Image
                  src='/images/pexels-itslauravillela-29478909.jpg'
                  alt='Aftercare'
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-110'
                />
              </div>
              <h3 className='text-2xl font-bold mb-2'>Professional Care</h3>
              <p className='text-gray-400'>
                Licensed experts providing a safe, comfortable, and luxury
                environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: QUICK INFO */}
      <section className='py-20 bg-pink-600 text-white text-center'>
        <h2 className='text-4xl font-bold mb-6'>
          Ready for your transformation?
        </h2>
        <p className='mb-10 text-lg opacity-90'>
          Book your consultation today and discover the Smooth & Simple
          difference.
        </p>
        <Link
          href='https://smoothnsimple.janeapp.com'
          target='_blank'
          className='bg-black text-white px-12 py-5 rounded-full font-black text-xl hover:bg-zinc-900 transition-colors'
        >
          RESERVE NOW
        </Link>
      </section>

      <Footer />
    </div>
  );
}
