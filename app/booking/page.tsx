"use client";

import RedeemBox from "../../components/RedeemBox";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Booking() {
  const JANE_URL = "https://smoothnsimple.janeapp.com";

  return (
    <div className='flex flex-col min-h-screen bg-black'>
      <RedeemBox />
      <Header />

      <main className='flex-1 flex flex-col items-center justify-center px-6 py-20'>
        {/* Visual Hero for Booking */}
        <div className='max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-2xl'>
          <div className='relative h-64 md:h-96 w-full rounded-2xl overflow-hidden order-2 md:order-1'>
            <Image
              src='/images/headshot.jpeg'
              alt='Booking Consultation'
              fill
              className='object-cover opacity-80'
            />
          </div>

          <div className='text-center md:text-left order-1 md:order-2'>
            <h2 className='text-3xl md:text-5xl font-bold text-white mb-6 leading-tight'>
              Ready for your <span className='text-pink-500'>Glow Up?</span>
            </h2>
            <p className='text-gray-400 text-lg mb-8 leading-relaxed'>
              Our secure booking portal is hosted by JaneApp to ensure your
              medical history and privacy are fully protected.
            </p>

            <Link
              href={JANE_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block w-full bg-pink-600 hover:bg-pink-700 text-white text-center py-5 rounded-full font-black text-xl transition-all transform hover:scale-105 active:scale-95'
            >
              Launch Booking Portal
            </Link>

            <p className='mt-4 text-xs text-zinc-500 text-center md:text-left uppercase tracking-widest'>
              Opens in a secure new tab
            </p>
          </div>
        </div>

        {/* Support/Info section below */}
        <div className='mt-16 text-center max-w-2xl'>
          <h3 className='text-white font-bold mb-2'>First time booking?</h3>
          <p className='text-gray-500 text-sm'>
            Simply create a profile on JaneApp to manage your appointments, view
            treatment history, and update your forms from anywhere.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
