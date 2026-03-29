"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true, // 👈 animate out when scrolling up
    });
  }, []);

  return (
    <div className='flex flex-col min-h-screen overflow-x-hidden'>
      <Header />

      <main className='flex flex-col items-center justify-center flex-1 p-10 bg-black'>
        {/* HERO VIDEO */}
        <div className='relative w-full max-w-full h-[400px] rounded-lg'>
          <video
            autoPlay
            muted
            loop
            playsInline
            className='absolute w-full h-full object-cover'
          >
            <source
              src='/videos/293081.mp4'
              type='video/mp4'
            />
          </video>

          <div className='relative z-10 flex flex-col items-center justify-center h-full bg-black/40 text-center px-4'>
            <h1 className='text-white text-4xl font-bold mb-4'>
              Smooth & Simple Cosmetics
            </h1>
            <h2 className='text-white text-2xl font-semibold mb-4'>
              Botox & Aesthetic Treatments
            </h2>
            <p className='max-w-xl text-gray-200'>
              Safe, professional, and effective cosmetic treatments tailored for
              you.
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className='flex gap-6 text-center mt-8 mb-8 mt-20'>
          <Link
            href='https://smoothnsimple.janeapp.com'
            target='_blank'
            className='px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700'
          >
            Book Now
            <p className='opacity-50 text-xs uppercase'>opens in a new tab</p>
          </Link>

          <Link
            href='/shop'
            className='px-6 py-3 content-center bg-white border border-pink-600 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition'
          >
            Purchase Gift Cards
          </Link>
        </div>

        {/* IMAGE SECTION WITH WRAPPERS */}
        <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4'>
          {/* LEFT */}
          <div data-aos='fade-right'>
            <Image
              src='/images/jump1987-botox-10084507.jpg'
              alt='Cosmetic Treatment'
              width={400}
              height={250}
              className='rounded-lg shadow-lg w-full h-auto'
            />
          </div>

          {/* CENTER */}
          <div data-aos='fade-up'>
            <Image
              src='/images/pexels-ron-lach-8626078.jpg'
              alt='Cosmetic Treatment'
              width={400}
              height={250}
              className='rounded-lg shadow-lg w-full h-auto'
            />
          </div>

          {/* RIGHT */}
          <div data-aos='fade-left'>
            <Image
              src='/images/pexels-itslauravillela-29478909.jpg'
              alt='Cosmetic Treatment'
              width={400}
              height={250}
              className='rounded-lg shadow-lg w-full h-auto'
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
