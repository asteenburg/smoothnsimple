"use client";

import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    if (videoRef.current) {
      // Force the mute and play via JavaScript for mobile compatibility
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.log("Autoplay waiting for user interaction:", err);
      });
    }
  }, []);

  return (
    <div className='relative w-full bg-black'>
      <Header />

      {/* SECTION 1: HERO */}
      <section className='relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden'>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload='auto'
          className='absolute z-0 w-full h-full object-cover opacity-50'
        >
          <source
            src='/videos/293081.mp4'
            type='video/mp4'
          />
        </video>

        <div
          className='relative z-10 text-center px-6'
          data-aos='zoom-in'
        >
          <h1 className='text-4xl md:text-7xl font-extrabold tracking-tighter mb-4 leading-tight text-white'>
            SMOOTH <span className='text-pink-500'>&</span> SIMPLE
          </h1>
          <p className='text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed'>
            Elevating your natural beauty with precision and care.
          </p>

          <div className='flex flex-col md:flex-row gap-4 justify-center items-center'>
            <Link
              href='https://smoothnsimple.janeapp.com'
              target='_blank'
              className='w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full font-bold transition-all transform active:scale-95'
            >
              Book Appointment
            </Link>
            <Link
              href='/shop'
              className='w-full md:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 rounded-full font-bold transition-all'
            >
              Gift Cards
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE EXPERIENCE */}
      <section className='py-20 bg-zinc-950 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div
            className='text-center mb-12'
            data-aos='fade-up'
          >
            <h2 className='text-3xl md:text-5xl font-bold mb-4'>
              Expert Aesthetics
            </h2>
            <div className='w-20 h-1 bg-pink-500 mx-auto'></div>
          </div>

          {/* Mobile Fix: Adjusted gaps for smaller screens */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12'>
            {/* Treatment cards remain the same, just ensured responsive spacing */}
            <div
              className='group'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <div className='relative h-72 md:h-80 w-full mb-6 overflow-hidden rounded-2xl'>
                <Image
                  src='/images/jump1987-botox-10084507.jpg'
                  alt='Botox'
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <h3 className='text-xl md:text-2xl font-bold mb-2'>
                Botox & Fillers
              </h3>
              <p className='text-gray-400 text-sm md:text-base'>
                Smooth fine lines and restore volume with our premium injectable
                treatments.
              </p>
            </div>

            <div
              className='group'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              <div className='relative h-72 md:h-80 w-full mb-6 overflow-hidden rounded-2xl'>
                <Image
                  src='/images/pexels-ron-lach-8626078.jpg'
                  alt='Consultation'
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <h3 className='text-xl md:text-2xl font-bold mb-2'>
                Skin Rejuvenation
              </h3>
              <p className='text-gray-400 text-sm md:text-base'>
                Tailored facials and treatments designed to bring back your
                glow.
              </p>
            </div>

            <div
              className='group'
              data-aos='fade-up'
              data-aos-delay='300'
            >
              <div className='relative h-72 md:h-80 w-full mb-6 overflow-hidden rounded-2xl'>
                <Image
                  src='/images/pexels-itslauravillela-29478909.jpg'
                  alt='Aftercare'
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <h3 className='text-xl md:text-2xl font-bold mb-2'>
                Professional Care
              </h3>
              <p className='text-gray-400 text-sm md:text-base'>
                Licensed experts providing a safe, comfortable, and luxury
                environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: QUICK INFO - Mobile Font Adjustment */}
      <section className='py-16 md:py-20 bg-pink-600 text-white text-center px-6'>
        <h2 className='text-3xl md:text-4xl font-bold mb-6'>
          Ready for your transformation?
        </h2>
        <p className='mb-10 text-base md:text-lg opacity-90 max-w-md mx-auto'>
          Book your consultation today and discover the Smooth & Simple
          difference.
        </p>
        <Link
          href='https://smoothnsimple.janeapp.com'
          target='_blank'
          className='inline-block bg-black text-white px-10 py-4 md:px-12 md:py-5 rounded-full font-black text-lg md:text-xl hover:bg-zinc-900 transition-all active:scale-95'
        >
          RESERVE NOW
        </Link>
      </section>

      <Footer />
    </div>
  );
}
