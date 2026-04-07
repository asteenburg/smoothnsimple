"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0,
  );
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  return (
    <div className='flex flex-col min-h-screen bg-black text-white'>
      <Header />
      <main className='flex-1 max-w-5xl mx-auto px-6 py-12 w-full'>
        <div className='flex items-center gap-4 mt-28 mb-10'>
          <ShoppingBag
            className='text-pink-500'
            size={32}
          />
          <h1 className='text-5xl font-black italic uppercase mt-25 tracking-tighter'>
            Your Bag
          </h1>
        </div>
        {cart.length === 0 ? (
          <div className='text-center py-24 bg-zinc-900/50 border border-zinc-800 rounded-[3rem]'>
            <p className='text-zinc-500 uppercase tracking-widest text-sm font-bold mb-8'>
              Your bag is empty
            </p>
            <Link
              href='/shop'
              className='bg-white text-black px-10 py-4 rounded-2xl font-black uppercase text-xs hover:bg-pink-600 hover:text-white transition-all'
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className='grid lg:grid-cols-12 gap-12'>
            <div className='lg:col-span-7 space-y-4'>
              {cart.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className='bg-zinc-900/40 border border-white/5 p-6 rounded-[2.5rem] flex justify-between items-center transition-all hover:border-pink-500/30'
                >
                  <div>
                    <h3 className='font-bold text-xl'>{item.title}</h3>
                    <p className='text-[10px] uppercase font-black text-zinc-500 tracking-widest'>
                      {item.quantity} Units × ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                  <div className='flex flex-col items-end gap-3'>
                    <span className='text-2xl font-black text-pink-500 italic'>
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className='p-2 text-zinc-600 hover:text-red-500 transition-all'
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={clearCart}
                className='text-[10px] uppercase font-bold text-zinc-600 hover:text-white ml-4'
              >
                Clear All
              </button>
            </div>
            <div className='lg:col-span-5'>
              <div className='bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-800 sticky top-8'>
                <h2 className='text-sm uppercase font-black tracking-widest text-zinc-400 mb-8 border-b border-zinc-800 pb-4'>
                  Order Summary
                </h2>
                <div className='space-y-4 mb-8 text-[10px] font-black uppercase tracking-widest'>
                  <div className='flex justify-between'>
                    <span>Subtotal</span>
                    <span className='text-white'>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>HST (13%)</span>
                    <span className='text-white'>${tax.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between items-end pt-6 border-t border-zinc-800'>
                    <span className='text-xs italic text-zinc-400'>
                      Total Due
                    </span>
                    <span className='text-4xl text-pink-600 italic'>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Link
                  href='/checkout'
                  className='flex items-center justify-center gap-3 w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-pink-600 hover:text-white transition-all shadow-2xl'
                >
                  Checkout Now <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
