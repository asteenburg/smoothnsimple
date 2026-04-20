"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { ShoppingBag, Menu, X, Zap, ChevronRight } from "lucide-react";

export default function Header() {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Reusable link for JaneApp
  const BOOKING_URL = "https://smoothnsimple.janeapp.com";

  return (
    <header className='fixed top-0 left-0 right-0 z-[9999] bg-black/90 backdrop-blur-md border-b border-white/5'>
      <nav className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative'>
        {/* Logo */}
        <div className='relative z-[10000]'>
          <Link
            href='/'
            className='flex items-center gap-2 group pointer-events-auto'
            onClick={() => setIsMenuOpen(false)}
          >
            <div className='bg-pink-600 p-1 rounded-lg'>
              <Zap
                size={16}
                className='text-white fill-current'
              />
            </div>
            <span className='font-black italic uppercase tracking-tighter text-lg text-white'>
              Smooth <span className='text-pink-600'>N</span> Simple
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className='hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 z-[10000]'>
          <Link
            href='/'
            className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-pink-600 transition-colors pointer-events-auto'
          >
            Home
          </Link>
          {["Shop", "Services"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-pink-600 transition-colors pointer-events-auto'
            >
              {item}
            </Link>
          ))}

          <Link
            href='/promos'
            onClick={() => setIsMenuOpen(false)}
            className='flex justify-between items-center group pointer-events-auto'
          >
            <span className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-pink-600 transition-colors pointer-events-auto'>
              Promotions
            </span>
          </Link>
          <Link
            href='/about'
            onClick={() => setIsMenuOpen(false)}
            className='flex justify-between items-center group pointer-events-auto'
          >
            <span className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-pink-600 transition-colors pointer-events-auto'>
              About
            </span>
          </Link>
          <Link
            href='/#reviews'
            onClick={() => setIsMenuOpen(false)}
            className='flex justify-between items-center group pointer-events-auto'
          >
            <span className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-pink-600 transition-colors pointer-events-auto'>
              Reviews
            </span>
          </Link>
        </div>

        {/* Icons & Booking */}
        <div className='flex items-center gap-4 relative z-[10000]'>
          <a
            href={BOOKING_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='hidden md:block px-5 py-2 bg-white text-black rounded-full font-black uppercase text-[9px] tracking-widest hover:bg-pink-600 hover:text-white transition-all pointer-events-auto'
          >
            Book
          </a>

          <Link
            href='/cart'
            className='p-2 text-white hover:text-pink-600 transition-colors relative pointer-events-auto'
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className='absolute top-1 right-1 bg-pink-600 text-white text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full border border-black'>
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={toggleMenu}
            className='md:hidden p-2 text-white hover:text-pink-600 transition-colors pointer-events-auto'
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        <div
          className={`absolute top-20 right-0 w-72 bg-black/95 backdrop-blur-xl border-l border-b border-white/5 rounded-bl-3xl overflow-hidden md:hidden z-[9998] transition-all duration-300 ease-out ${
            isMenuOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-6 pointer-events-none"
          }`}
        >
          <nav className='flex flex-col p-8'>
            {/* PRIMARY NAV */}
            <div className='space-y-5 mb-8'>
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: "Services", href: "/services" },
                { label: "Promotions", href: "/promos" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className='flex items-center justify-between group'
                >
                  <span className='text-xl italic uppercase tracking-tighter text-white group-hover:text-pink-600 transition-colors'>
                    {item.label}
                  </span>

                  <ChevronRight
                    size={16}
                    className='text-zinc-600 group-hover:text-pink-600 group-hover:translate-x-1 transition-all'
                  />
                </Link>
              ))}
            </div>

            {/* DIVIDER */}
            <div className='h-px bg-white/5 mb-6' />

            {/* SECONDARY NAV */}
            <div className='space-y-5 mb-8'>
              {[
                { label: "About", href: "/about" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Reviews", href: "/#reviews" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className='flex items-center justify-between group'
                >
                  <span className='text-lg italic uppercase tracking-tighter text-zinc-300 group-hover:text-white transition-colors'>
                    {item.label}
                  </span>

                  <ChevronRight
                    size={16}
                    className='text-zinc-700 group-hover:text-pink-600 group-hover:translate-x-1 transition-all'
                  />
                </Link>
              ))}
            </div>

            {/* DIVIDER */}
            <div className='h-px bg-white/5 mb-6' />

            {/* CTA */}
            <a
              href={BOOKING_URL}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => setIsMenuOpen(false)}
              className='flex items-center justify-between group'
            >
              <span className='text-xl italic uppercase tracking-tighter text-pink-600'>
                Book Now
              </span>

              <ChevronRight
                size={16}
                className='text-pink-600 group-hover:translate-x-1 transition-all'
              />
            </a>
          </nav>
        </div>
      </nav>
    </header>
  );
}
