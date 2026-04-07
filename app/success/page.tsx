"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  Package,
  Loader2,
} from "lucide-react";

export default function SuccessPage() {
  const { clearCart } = useCart();
  const [orderSummary, setOrderSummary] = useState<any>(null);

  useEffect(() => {
    // 1. Pull the data we saved right before redirecting
    const savedOrder = sessionStorage.getItem("last_order");

    if (savedOrder) {
      setOrderSummary(JSON.parse(savedOrder));
      // 2. Clear the live cart now that we've confirmed the landing
      clearCart();
    }
  }, [clearCart]);

  if (!orderSummary) {
    return (
      <div className='bg-black min-h-screen flex items-center justify-center'>
        <Loader2
          className='animate-spin text-pink-600'
          size={40}
        />
      </div>
    );
  }

  return (
    <div className='bg-black min-h-screen text-white flex flex-col font-sans'>
      <Header />

      <main className='flex-1 max-w-4xl mx-auto px-6 py-20 w-full'>
        <div className='flex flex-col items-center text-center space-y-12'>
          <div className='space-y-6'>
            <div className='flex justify-center'>
              <CheckCircle2
                size={80}
                className='text-pink-600'
              />
            </div>
            <h1 className='text-6xl md:text-8xl font-black italic uppercase tracking-tighter'>
              Order <span className='text-pink-600'>Confirmed.</span>
            </h1>
          </div>

          {/* Order Summary Card */}
          <div className='w-full bg-zinc-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden'>
            <div className='p-8 border-b border-white/5 bg-white/5 flex items-center gap-3'>
              <Package
                size={18}
                className='text-pink-600'
              />
              <h2 className='text-sm font-black uppercase tracking-widest italic'>
                Order Summary
              </h2>
            </div>

            <div className='p-8 space-y-6'>
              {orderSummary.items.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className='flex justify-between items-center'
                >
                  <div className='flex items-center gap-4 text-left'>
                    <div className='h-10 w-10 bg-zinc-800 rounded-lg flex items-center justify-center font-black text-pink-600 border border-white/5 text-xs'>
                      {item.quantity}x
                    </div>
                    <div>
                      <p className='font-black uppercase text-xs italic'>
                        {item.name || item.title}
                      </p>
                      <p className='text-[10px] text-zinc-500 font-bold uppercase tracking-widest'>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className='font-black italic text-sm text-zinc-300'>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              {/* Divider */}
              <div className='h-px bg-white/5 mt-6' />

              {/* Subtotal & Tax Breakdown */}
              <div className='space-y-2 pt-2'>
                <div className='flex justify-between items-center'>
                  <span className='text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500'>
                    Subtotal
                  </span>
                  <span className='text-xs font-black italic text-zinc-400'>
                    ${(parseFloat(orderSummary.total) / 1.13).toFixed(2)}
                  </span>
                </div>

                <div className='flex justify-between items-center'>
                  <span className='text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500'>
                    HST (13%)
                  </span>
                  <span className='text-xs font-black italic text-zinc-400'>
                    $
                    {(
                      parseFloat(orderSummary.total) -
                      parseFloat(orderSummary.total) / 1.13
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Final Total */}
              <div className='flex justify-between items-end pt-4 border-t border-white/5'>
                <span className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500'>
                  Total Charged
                </span>
                <span className='text-3xl font-black italic text-pink-600 tracking-tighter'>
                  ${orderSummary.total}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='flex flex-col sm:flex-row items-center gap-6 w-full max-w-md mt-10'>
            <a
              href='/'
              className='w-full py-6 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-pink-600 hover:text-white transition-all cursor-pointer relative z-50 shadow-xl'
            >
              Back to Home <ArrowRight size={14} />
            </a>

            <a
              href='/shop'
              className='w-full py-6 bg-zinc-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] border border-white/5 hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 cursor-pointer relative z-50'
            >
              <ShoppingBag size={14} />
              Continue Shopping
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
