"use client";

import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = [
    {
      src: "/videos/293081.mp4",
      subtitle: "Elevating your natural beauty with precision medical aesthetics in Brantford.",
    },
    {
      src: "/videos/mixkit-adult-woman-in-the-mirror-frustrated-by-her-wrinkles-4515-hd-ready.mp4",
      title: "EXPERT AESTHETICS",
      subtitle: "Professional Botox & filler treatments tailored for your unique skin goals.",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const forceVisualPlay = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = true;
      video.volume = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const playOnGesture = () => {
            if (videoRef.current) videoRef.current.play();
            document.removeEventListener("click", playOnGesture);
            document.removeEventListener("touchstart", playOnGesture);
          };
          document.addEventListener("click", playOnGesture);
          document.addEventListener("touchstart", playOnGesture);
        });
      }
    };

    forceVisualPlay();

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();

      setTimeout(() => {
        videoRef.current?.play().catch(() => {});
      }, 100);
    }
  }, [currentIndex]);

  return (
    <div className='relative w-full bg-black overflow-x-hidden'>
      <Header />

      {/* SECTION 1: HERO SLIDESHOW */}
      <section className='relative h-[75vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden bg-zinc-950'>
        <video
          ref={videoRef}
          key={slides[currentIndex].src}
          autoPlay
          muted
          loop
          playsInline
          /* @ts-ignore */
          webkit-playsinline='true'
          preload='auto'
          className='absolute z-0 w-full h-full object-cover transition-opacity duration-1000 pointer-events-none'
        >
          <source src={slides[currentIndex].src} type='video/mp4' />
        </video>

        <div className='relative z-10 text-center px-6' data-aos='zoom-in'>
          <h1 className='text-4xl md:text-6xl font-bold text-white'>
            SMOOTH <span className='text-pink-500'>N</span> SIMPLE 
            <span className="sr-only"> - Medical Aesthetics Brantford</span>
          </h1>
          <p className='text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed'>
            {slides[currentIndex].subtitle}
          </p>

          <div className='flex flex-col md:flex-row gap-4 justify-center items-center'>
            <Link
              href='/booking'
              className='w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full font-bold transition-all transform active:scale-95 text-center'
            >
              Book Appointment
            </Link>
            <Link
              href='/shop'
              className='w-full md:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 rounded-full font-bold transition-all text-center'
            >
              Shop Treatments
            </Link>
          </div>
        </div>

        <div className='absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20'>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 transition-all rounded-full ${
                currentIndex === index ? "bg-pink-600 w-10" : "bg-white/40 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* rest of your page unchanged */}
      <section className='py-20 bg-zinc-950 px-6'>
        {/* unchanged */}
      </section>

      <section className="py-10 bg-black text-center border-t border-zinc-900">
        <p className="text-zinc-600 text-xs uppercase tracking-widest">
          Serving Brantford, Paris, and Brant County
        </p>
      </section>

      <section className='py-24 bg-pink-600 text-white text-center px-6 relative overflow-hidden'>
        <div data-aos='fade-up' className='relative z-10'>
          <h2 className='text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase'>
            Start Your Skin Journey
          </h2>
          <Link
            href='/booking'
            className='inline-block bg-black text-white px-14 py-5 rounded-full font-black text-xl hover:bg-zinc-900 transition-all active:scale-95 shadow-2xl uppercase tracking-widest'
          >
            Book in Brantford
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}