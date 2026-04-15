"use client";

import Link from "next/link";
import { Zap, Instagram, Facebook, Mail } from "lucide-react";
import { Star, ExternalLink } from "lucide-react";

export default function Footer() {
  const BOOKING_URL = "https://smoothnsimple.janeapp.com";

  return (
    <footer className='w-full bg-black border-t border-white/5 pt-16 pb-12 px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* TOP WRAPPER */}
        <div className='flex flex-col md:flex-row justify-between items-start gap-12 mb-16'>
          {/* BRAND COLUMN */}
          <div className='w-full md:max-w-xs'>
            <Link
              href='/'
              className='flex items-center gap-2 mb-6 group'
            >
              <div className='bg-pink-600 p-1 rounded-lg transition-transform group-hover:rotate-12'>
                <Zap
                  size={16}
                  className='text-white fill-current'
                />
              </div>
              <span className='font-black italic uppercase tracking-tighter text-xl text-white'>
                Smooth <span className='text-pink-600'>N</span> Simple
              </span>
            </Link>
            <p className='text-zinc-500 text-sm italic leading-relaxed'>
              Elevating medical aesthetics through precision, simplicity, and
              clinical excellence.
            </p>
          </div>

          {/* --- THE FIX: DIRECT FLEX STACKING --- */}
          <div className='w-full md:w-auto flex flex-col md:flex-row gap-12'>
            {/* Socials */}
            <div className='flex flex-col gap-4 min-w-[150px]'>
              <h4 className='text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2'>
                Social
              </h4>
              <a
                href='https://www.google.com/search?sca_esv=55e9f3c856495c1e&rlz=1C5BAPC_enCA1191CA1192&sxsrf=ANbL-n4qABOLjVaDqPNngCRw2gFrYfgOMw:1776272984792&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOYrYkd5r5myptXoSQMpvluiCNaoPd7ESbCCw6fVCSSFUrbSdtEJY2C4MpZE5LtUf0TXqyApifmqWipj2ZpdHgejJPiVD&q=Smooth+N+Simple+Reviews&sa=X&ved=2ahUKEwjni6HCrPCTAxV2vokEHb6_HVcQ0bkNegQIMRAH&biw=1440&bih=726&dpr=2'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                <Star
                  size={14}
                  className='text-yellow-500'
                />
                Google Reviews
                <ExternalLink size={12} />
              </a>
              <a
                href='https://www.instagram.com/nurse.injector.shelby?utm_source=qr&igsh=c3Z4bmVidmF4dmFn'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                <Instagram size={14} /> Instagram
              </a>
              <a
                href='https://www.facebook.com/share/1CYgLY99ki/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                <Facebook size={14} /> Facebook
              </a>
              <a
                href='mailto:nurseinjectorshelby@gmail.com'
                className='flex items-center gap-2 text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                <Mail size={14} /> Email
              </a>
            </div>

            {/* Explore */}
            <div className='flex flex-col gap-4 min-w-[150px]'>
              <h4 className='text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2'>
                Explore
              </h4>
              <Link
                href='/'
                className='text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                Home
              </Link>
              <Link
                href='/shop'
                className='text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                Shop
              </Link>
              <Link
                href='/services'
                className='text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                Services
              </Link>
            </div>

            {/* Legal */}
            <div className='flex flex-col gap-4 min-w-[150px]'>
              <h4 className='text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2'>
                Legal
              </h4>
              <Link
                href='/care'
                className='text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                Care
              </Link>
              <Link
                href='/disclaimer'
                className='text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                Disclaimer
              </Link>
              <Link
                href='/privacy'
                className='text-zinc-500 hover:text-pink-600 text-xs uppercase font-bold tracking-widest transition-colors'
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className='pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left'>
          <p className='text-[10px] font-black uppercase tracking-widest text-zinc-600'>
            &copy; {new Date().getFullYear()} Smooth N Simple.
          </p>
          <div className='h-[1px] w-12 bg-pink-600/20 rounded-full md:block hidden'></div>
          <p className='text-[10px] font-black uppercase tracking-widest text-zinc-600'>
            Ontario, Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
