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

  // 1. Define your slides here
  const slides = [
    {
      src: "/videos/293081.mp4",
      title: "SMOOTH & SIMPLE",
      subtitle: "Elevating your natural beauty with precision and care.",
    },
    {
      src: "/videos/mixkit-adult-woman-in-the-mirror-frustrated-by-her-wrinkles-4515-hd-ready.mp4", // Replace with your second video filename
      title: "EXPERT AESTHETICS",
      subtitle: "Professional Botox & filler treatments tailored for you.",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // 2. Auto-advance the slide every 10 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // 3. Force the video to play/mute whenever the slide changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current
        .play()
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  }, [currentIndex]);

  return (
    <div className='relative w-full bg-black overflow-x-hidden'>
      <Header />

      {/* SECTION 1: HERO SLIDESHOW */}
      <section className='relative h-[75vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden'>
        <video
          ref={videoRef}
          key={slides[currentIndex].src} // Forces re-render to trigger autoplay on swap
          autoPlay
          muted
          loop
          playsInline
          preload='auto'
          className='absolute z-0 w-full h-full object-cover opacity-50 transition-opacity duration-1000'
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
              href='https://smoothnsimple.janeapp.com'
              target='_blank'
              className='w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full font-bold transition-all transform active:scale-95 text-center'
            >
              Book Appointment
            </Link>
            <Link
              href='/shop'
              className='w-full md:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 rounded-full font-bold transition-all text-center'
            >
              Gift Cards
            </Link>
          </div>
        </div>

        {/* SLIDE INDICATORS (DOTS) */}
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
            <h2 className='text-3xl md:text-5xl font-bold mb-4 text-white'>
              Expert Aesthetics
            </h2>
            <div className='w-20 h-1 bg-pink-500 mx-auto'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            {/* Treatment 1 */}
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
              <h3 className='text-xl md:text-2xl font-bold mb-2 text-white'>
                Botox & Fillers
              </h3>
              <p className='text-gray-400 text-sm md:text-base leading-relaxed'>
                Smooth fine lines and restore volume with our premium injectable
                treatments.
              </p>
            </div>

            {/* Treatment 2 */}
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
              <h3 className='text-xl md:text-2xl font-bold mb-2 text-white'>
                Skin Rejuvenation
              </h3>
              <p className='text-gray-400 text-sm md:text-base leading-relaxed'>
                Tailored facials and treatments designed to bring back your
                glow.
              </p>
            </div>

            {/* Treatment 3 */}
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
              <h3 className='text-xl md:text-2xl font-bold mb-2 text-white'>
                Professional Care
              </h3>
              <p className='text-gray-400 text-sm md:text-base leading-relaxed'>
                Licensed experts providing a safe, comfortable, and luxury
                environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: QUICK INFO */}
      <section className='py-16 md:py-24 bg-pink-600 text-white text-center px-6'>
        <div data-aos='fade-up'>
          <h2 className='text-3xl md:text-5xl font-black mb-6 italic tracking-tight'>
            Ready for your transformation?
          </h2>
          <p className='mb-10 text-base md:text-xl opacity-90 max-w-2xl mx-auto'>
            Book your consultation today and discover the Smooth & Simple
            difference.
          </p>
          <Link
            href='https://smoothnsimple.janeapp.com'
            target='_blank'
            className='inline-block bg-black text-white px-12 py-5 rounded-full font-black text-xl hover:bg-zinc-900 transition-all active:scale-95 shadow-2xl'
          >
            RESERVE NOW
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
