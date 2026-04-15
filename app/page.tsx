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
          className='absolute w-full h-full object-cover opacity-50'
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
          <h1 className='text-4xl md:text-6xl font-bold text-white'>
            SMOOTH <span className='text-pink-500'>N</span> SIMPLE
          </h1>

          <p className='text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10'>
            {slides[currentIndex].subtitle}
          </p>

          <div className='flex flex-col md:flex-row gap-4 justify-center'>
            <Link
              href='/booking'
              className='bg-pink-600 text-white px-8 py-4 rounded-full font-bold'
            >
              Book Appointment
            </Link>

            <Link
              href='/shop'
              className='border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-black'
            >
              Shop & Gift Cards
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className='py-20 bg-zinc-950 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div
            className='text-center mb-12'
            data-aos='fade-up'
          >
            <h2 className='text-3xl md:text-5xl text-white uppercase italic'>
              Expert Aesthetics
            </h2>
            <div className='w-20 h-1 bg-pink-500 mx-auto mt-4'></div>
          </div>

          <div className='grid md:grid-cols-3 gap-10'>
            <div className='group'>
              <div className='relative h-72 mb-6 overflow-hidden rounded-3xl border border-zinc-800'>
                <Image
                  src='/images/jump1987-botox-10084507.jpg'
                  alt='Botox'
                  fill
                  className='object-cover group-hover:scale-110 transition'
                />
              </div>
              <h3 className='text-xl text-white font-bold'>Botox</h3>
              <p className='text-gray-400'>
                Precision treatments to enhance your natural beauty
              </p>
            </div>

            <div className='group'>
              <div className='relative h-72 mb-6 overflow-hidden rounded-3xl border border-zinc-800'>
                <Image
                  src='/images/1000020714.jpg'
                  alt='Lip Flip'
                  fill
                  className='object-cover group-hover:scale-110 transition'
                />
              </div>
              <h3 className='text-xl text-white font-bold'>Lip Flip</h3>
              <p className='text-gray-400'>
                Create a fuller, natural-looking upper lip
              </p>
            </div>

            <div className='group'>
              <div className='relative h-72 mb-6 overflow-hidden rounded-3xl border border-zinc-800'>
                <Image
                  src='/images/1000020715.jpg'
                  alt='Care'
                  fill
                  className='object-cover group-hover:scale-110 transition'
                />
              </div>
              <h3 className='text-xl text-white font-bold'>
                Professional Care
              </h3>
              <p className='text-gray-400'>
                Experience aesthetic excellence in a luxury setting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section
        className='py-20 bg-black px-6'
        id='reviews'
      >
        <div className='max-w-5xl mx-auto text-center'>
          <div
            className='mb-12'
            data-aos='fade-up'
          >
            <h2 className='text-3xl md:text-5xl text-white uppercase italic'>
              Client Love
            </h2>
            <div className='w-20 h-1 bg-pink-500 mx-auto mt-4'></div>
          </div>

          <div className='grid md:grid-cols-2 gap-8 mb-12'>
            {/* REVIEW 1 */}
            <div className='bg-zinc-900 p-6 rounded-2xl border border-zinc-800 text-left'>
              <div className='flex justify-between mb-2'>
                <h3 className='text-white font-semibold tracking-[-0.075em]'>
                  Mia Harris
                </h3>
                <a
                  href='https://maps.app.goo.gl/ngtRg8KpaRbXFNxGA'
                  target='_blank'
                  className='text-pink-500 text-xs underline'
                >
                  2 reviews
                </a>
              </div>

              <div className='flex items-center gap-3 mb-4'>
                <div className='text-yellow-500'>★★★★★</div>
                <span className='text-gray-500 text-sm'>a year ago</span>
              </div>

              <p className='text-gray-300'>
                My experience with Smooth N Simple was nothing but informative
                and professional. I was extremely happy with my results and will
                continue to use Shelby’s expertise.
              </p>
            </div>

            {/* REVIEW 2 */}
            <div className='bg-zinc-900 p-6 rounded-2xl border border-zinc-800 text-left'>
              <div className='flex justify-between mb-2'>
                <h3 className='text-white font-semibold tracking-[-0.075em]'>
                  Kate Hall
                </h3>
                <a
                  href='https://maps.app.goo.gl/mSdd9eLg74yxRzxU8'
                  target='_blank'
                  className='text-pink-500 text-xs underline'
                >
                  2 reviews
                </a>
              </div>

              <div className='flex items-center gap-3 mb-4'>
                <div className='text-yellow-500'>★★★★★</div>
                <span className='text-gray-500 text-sm'>3 weeks ago</span>
              </div>

              <p className='text-gray-300'>
                Shelby is knowledgeable, takes time to understand your goals,
                and delivers natural, balanced results. Highly recommend!
              </p>
            </div>
          </div>

          <a
            href='https://g.page/r/CUd7qwLJY0OWEAE/review'
            target='_blank'
            className='bg-pink-600 text-white px-10 py-4 rounded-full font-bold'
          >
            Leave a Google Review
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className='py-24 bg-pink-600 text-white text-center'>
        <h2 className='text-4xl md:text-6xl font-black mb-8 italic'>
          Your transformation awaits
        </h2>

        <Link
          href='/booking'
          className='bg-black px-12 py-4 rounded-full font-bold'
        >
          Book Now
        </Link>
      </section>

      <Footer />
    </div>
  );
}
