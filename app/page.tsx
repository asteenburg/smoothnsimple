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
      subtitle: "Elevating your natural beauty with precision and care.",
    },
    {
      src: "/videos/mixkit-adult-woman-in-the-mirror-frustrated-by-her-wrinkles-4515-hd-ready.mp4",
      subtitle: "Professional Botox & filler treatments tailored for you.",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
      video.play().catch(() => {});
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  return (
    <div className='relative w-full bg-black overflow-x-hidden'>
      <Header />

      {/* HERO */}
      <section className='relative h-[75vh] md:h-[85vh] flex items-center justify-center overflow-hidden bg-zinc-950'>
        <video
          ref={videoRef}
          key={slides[currentIndex].src}
          autoPlay
          muted
          loop
          playsInline
          className='absolute w-full h-full object-cover opacity-30 md:opacity-20 lg:opacity-20'
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
          <h1 className='text-4xl md:text-6xl font-black text-white tracking-tight'>
            SMOOTH <span className='text-pink-500'>N</span> SIMPLE
          </h1>

          <p className='text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 mt-4'>
            {slides[currentIndex].subtitle}
          </p>

          <div className='flex flex-col md:flex-row gap-4 justify-center mt-10'>
            <Link
              href='/booking'
              className='bg-pink-600 hover:bg-pink-500 text-white px-8 py-4 rounded-full font-bold transition-all duration-300'
            >
              Book Appointment
            </Link>

            <Link
              href='/shop'
              className='bg-white text-black hover:bg-pink-600 hover:text-white px-8 py-4 rounded-full font-bold transition-all duration-300'
            >
              Shop & Gift Cards
            </Link>

            <Link
              href='/promos'
              className='border border-white/20 text-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-bold transition-all duration-300'
            >
              Promotions
            </Link>
          </div>
        </div>
      </section>

      {/* NEW CLIENT PROMO */}
      <section className='py-24 bg-zinc-950 px-6 border-y border-zinc-900'>
        <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
          <div
            className='relative h-[400px] rounded-3xl overflow-hidden border border-zinc-800'
            data-aos='fade-right'
          >
            <Image
              src='/images/pexels-cottonbro-7581590 copy.jpg'
              alt='Botox Treatment'
              fill
              className='object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8'>
              <p className='text-white font-bold text-xl'>
                Precision care, naturally enhanced.
              </p>
            </div>
          </div>

          <div data-aos='fade-left'>
            <h2 className='text-pink-500 font-bold text-sm uppercase tracking-[0.3em] mb-4'>
              First-Time Visit
            </h2>

            <h3 className='text-4xl md:text-5xl text-white font-black leading-tight tracking-tight'>
              Refresh your look <br />
              for just <span className='text-pink-600'>$6/unit.</span>
            </h3>

            <p className='text-gray-400 mt-6 text-lg leading-relaxed'>
              We believe everyone deserves to feel confident. Our new client
              special allows you to experience Shelby's expert injection
              technique at our lowest rate ever.
            </p>

            <div className='mt-10 flex flex-col sm:flex-row gap-4'>
              <Link
                href='/booking'
                className='bg-white text-black hover:bg-pink-600 hover:text-white px-8 py-4 rounded-full font-bold transition-all duration-300'
              >
                Book Appointment
              </Link>

              <div className='flex items-center justify-center px-6 py-4 border border-zinc-700 rounded-full text-zinc-400 text-sm'>
                New clients only
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className='py-24 bg-zinc-950 px-6 border-y border-zinc-900'>
        <div className='max-w-7xl mx-auto'>
          <div
            className='text-center mb-12'
            data-aos='fade-up'
          >
            <h2 className='text-3xl md:text-5xl text-white font-black tracking-tight'>
              Expert Aesthetics
            </h2>
            <div className='w-20 h-1 bg-pink-500 mx-auto mt-4'></div>
          </div>

          <div className='grid md:grid-cols-3 gap-10'>
            {[
              {
                img: "/images/jump1987-botox-10084507.jpg",
                title: "Botox",
                desc: "Precision treatments to enhance your natural beauty",
              },
              {
                img: "/images/1000020714.jpg",
                title: "Lip Flip",
                desc: "Create a fuller, natural-looking upper lip",
              },
              {
                img: "/images/1000020715.jpg",
                title: "Professional Care",
                desc: "Experience aesthetic excellence in a luxury setting",
              },
            ].map((item) => (
              <div
                key={item.title}
                className='group transition-all duration-300 hover:-translate-y-1'
              >
                <div className='relative h-72 mb-6 overflow-hidden rounded-3xl border border-zinc-800 group-hover:border-pink-500/30 transition'>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className='object-cover group-hover:scale-110 transition'
                  />
                </div>

                <h3 className='text-xl text-white font-bold tracking-tight'>
                  {item.title}
                </h3>

                <p className='text-gray-400'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section
        className='py-24 bg-black px-6'
        id='reviews'
      >
        <div className='max-w-5xl mx-auto text-center'>
          <div
            className='mb-12'
            data-aos='fade-up'
          >
            <h2 className='text-3xl md:text-5xl text-white font-black tracking-tight'>
              Client Love
            </h2>
            <div className='w-20 h-1 bg-pink-500 mx-auto mt-4'></div>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12'>
            {[
              {
                name: "Mia Harris",
                text: "My experience was professional and results were amazing.",
                link: "https://maps.app.goo.gl/ngtRg8KpaRbXFNxGA",
              },
              {
                name: "Kate Hall",
                text: "Natural results and very knowledgeable injector.",
                link: "https://maps.app.goo.gl/mSdd9eLg74yxRzxU8",
              },
              {
                name: "Tammy Harper",
                text: "Flexible, professional, and excellent results.",
                link: "https://maps.app.goo.gl/mSdd9eLg74yxRzxU8",
              },
            ].map((r) => (
              <div
                key={r.name}
                className='bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 hover:border-pink-500/30 transition flex flex-col'
              >
                <div className='flex justify-between mb-2'>
                  <h3 className='text-white font-semibold'>{r.name}</h3>
                  <a
                    href={r.link}
                    target='_blank'
                    className='text-pink-500 text-xs underline'
                  >
                    Google
                  </a>
                </div>

                <p className='text-gray-300 text-sm mt-auto'>{r.text}</p>
              </div>
            ))}
          </div>

          <a
            href='https://g.page/r/CUd7qwLJY0OWEAE/review'
            className='bg-pink-600 hover:bg-pink-500 text-white px-10 py-4 rounded-full font-bold transition-all duration-300'
          >
            Leave a Google Review
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className='py-28 bg-gradient-to-r from-pink-600 to-pink-500 text-white text-center'>
        <h2 className='text-4xl md:text-6xl font-black mb-8 tracking-tight'>
          Your transformation awaits
        </h2>

        <Link
          href='/booking'
          className='bg-black hover:bg-white hover:text-black px-12 py-4 rounded-full font-bold transition-all duration-300'
        >
          Book Now
        </Link>
      </section>

      <Footer />
    </div>
  );
}
