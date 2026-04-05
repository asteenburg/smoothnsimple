"use client";

import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";

import Header from "../components/Header";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = [
    {
      src: "/videos/293081.mp4",
      title: "SMOOTH & SIMPLE",
      subtitle: "Elevating your natural beauty with precision and care.",
    },
    {
      src: "/videos/mixkit-adult-woman-in-the-mirror-frustrated-by-her-wrinkles-4515-hd-ready.mp4",
      title: "EXPERT AESTHETICS",
      subtitle: "Professional Botox & filler treatments tailored for you.",
    },
  ];

  useEffect(() => {
    // 1. Initialize AOS Animations
    AOS.init({ duration: 800, once: true });

    // 2. THE NUCLEAR AUTOPLAY GUARD
    const forceVisualPlay = () => {
      const video = videoRef.current;
      if (!video) return;

      // Hard-set volume and muted states for cross-browser compliance
      video.muted = true;
      video.volume = 0;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If the browser blocks it, we wait for the first click/touch anywhere
          const playOnGesture = () => {
            if (videoRef.current) {
              videoRef.current.play();
              console.log("Video unlocked by user interaction.");
            }
            document.removeEventListener("click", playOnGesture);
            document.removeEventListener("touchstart", playOnGesture);
          };
          document.addEventListener("click", playOnGesture);
          document.addEventListener("touchstart", playOnGesture);
        });
      }
    };

    // Run on initial mount
    forceVisualPlay();

    // 3. Slide transition interval
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => {
      clearInterval(interval);
      // Cleanup any stray listeners
      document.removeEventListener("click", () => {});
      document.removeEventListener("touchstart", () => {});
    };
  }, [slides.length]);

  // Re-trigger play specifically when the currentIndex changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Forces the browser to recognize the new <source>
      videoRef.current.play().catch(() => {});
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
          /* @ts-ignore - webkit attributes for Safari */
          webkit-playsinline='true'
          preload='auto'
          className='absolute z-0 w-full h-full object-cover opacity-50 transition-opacity duration-1000 pointer-events-none'
        >
          <source
            src={slides[currentIndex].src}
            type='video/mp4'
          />
        </video>

        <div
          className='relative z-10 text-center px-6'
          data-aos='zoom-in'
        >
          <h1 className='text-4xl md:text-7xl font-extrabold tracking-tighter mb-4 text-white uppercase'>
            {slides[currentIndex].title}
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
              Shop & Gift Cards
            </Link>
          </div>
        </div>

        {/* SLIDE INDICATORS */}
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

      {/* SECTION 2: THE EXPERIENCE */}
      <section className='py-20 bg-zinc-950 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div
            className='text-center mb-12'
            data-aos='fade-up'
          >
            <h2 className='text-3xl md:text-5xl font-bold mb-4 text-white uppercase tracking-tight'>
              Expert Aesthetics
            </h2>
            <div className='w-20 h-1 bg-pink-500 mx-auto'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            <div
              className='group'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <div className='relative h-72 md:h-80 w-full mb-6 overflow-hidden rounded-3xl border border-zinc-800'>
                <Image
                  src='/images/jump1987-botox-10084507.jpg'
                  alt='Botox'
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-110'
                />
              </div>
              <h3 className='text-xl md:text-2xl font-bold mb-2 text-white'>
                Botox & Fillers
              </h3>
              <p className='text-gray-400 text-sm md:text-base leading-relaxed'>
                Precision treatments to enhance your natural beauty
              </p>
            </div>

            <div
              className='group'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              <div className='relative h-72 md:h-80 w-full mb-6 overflow-hidden rounded-3xl border border-zinc-800'>
                <Image
                  src='/images/pexels-farhadirani-34775440.jpg'
                  alt='Lip Filler'
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-110'
                />
              </div>
              <h3 className='text-xl md:text-2xl font-bold mb-2 text-white'>
                Lip Flip
              </h3>
              <p className='text-gray-400 text-sm md:text-base leading-relaxed'>
                Create a fuller, natural-looking upper lip
              </p>
            </div>

            <div
              className='group'
              data-aos='fade-up'
              data-aos-delay='300'
            >
              <div className='relative h-72 md:h-80 w-full mb-6 overflow-hidden rounded-3xl border border-zinc-800'>
                <Image
                  src='/images/pexels-itslauravillela-29478909.jpg'
                  alt='Aftercare'
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-110'
                />
              </div>
              <h3 className='text-xl md:text-2xl font-bold mb-2 text-white'>
                Professional Care
              </h3>
              <p className='text-gray-400 text-sm md:text-base leading-relaxed'>
                Experience aesthetic excellence in a luxury setting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CTA */}
      <section className='py-24 bg-pink-600 text-white text-center px-6 relative overflow-hidden'>
        <div
          data-aos='fade-up'
          className='relative z-10'
        >
          <h2 className='text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase'>
            Your transformation awaits
          </h2>
          <Link
            href='/booking'
            className='inline-block bg-black text-white px-14 py-5 rounded-full font-black text-xl hover:bg-zinc-900 transition-all active:scale-95 shadow-2xl uppercase tracking-widest'
          >
            Reserve Now
          </Link>
        </div>
      </section>
    </div>
  );
}
