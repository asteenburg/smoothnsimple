"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className='bg-black min-h-screen text-white flex flex-col font-sans'>
      <Header />

      <main className='flex-1 flex items-center justify-center px-6 py-24'>
        <div className='max-w-2xl w-full text-center space-y-8'>
          {/* Success Icon */}
          <div className='flex justify-center'>
            <div className='relative'>
              <div className='absolute inset-0 bg-pink-600 blur-3xl opacity-20 animate-pulse' />
              <CheckCircle2
                size={120}
                className='text-pink-600 relative z-10'
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Headline */}
          <div className='space-y-4'>
            <h1 className='text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none'>
              Payment <br />
              <span className='text-pink-600'>Confirmed.</span>
            </h1>
            <p className='text-zinc-400 uppercase text-[10px] font-black tracking-[0.3em]'>
              Your order has been received and is being processed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-6 pt-8'>
            <Link
              href='/'
              className='w-full sm:w-auto px-10 py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-pink-600 hover:text-white transition-all group'
            >
              Back to Home
              <ArrowRight
                size={14}
                className='group-hover:translate-x-1 transition-transform'
              />
            </Link>

            <Link
              href='/shop'
              className='w-full sm:w-auto px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border border-white/5 hover:bg-zinc-800 transition-all flex items-center justify-center gap-3'
            >
              <ShoppingBag size={14} />
              Continue Shopping
            </Link>
          </div>

          {/* Support Note */}
          <p className='text-[9px] text-zinc-600 uppercase font-bold tracking-[0.2em] pt-12'>
            A confirmation email will be sent to you shortly. <br />
            Questions? Contact support@smoothnsimple.ca
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
