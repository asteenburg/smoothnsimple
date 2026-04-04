"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Install with: npm install lucide-react

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Book", href: "/booking" },
    { name: "Shop", href: "/shop" },
  ];

  return (
    <header className='relative w-full z-50 bg-white dark:bg-black border-b border-zinc-800 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          {/* LOGO SECTION */}
          <div className='flex flex-col'>
            <h1 className='text-xl md:text-2xl font-bold text-pink-600 leading-none'>
              Smooth N Simple
            </h1>
            <span className='text-[10px] md:text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-1'>
              by Nurse Shelby
            </span>
          </div>

          {/* DESKTOP NAV - Hidden on Mobile */}
          <nav className='hidden md:flex gap-8'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className='text-sm font-medium hover:text-pink-500 transition-colors uppercase tracking-wider'
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-500 hover:text-pink-600 focus:outline-none'
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN - Visible only when open */}
      {isOpen && (
        <div className='md:hidden absolute top-20 left-0 w-full bg-white dark:bg-zinc-900 border-b border-zinc-800 animate-in fade-in slide-in-from-top-2'>
          <nav className='flex flex-col p-4 gap-4'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // Close menu when link is clicked
                className='text-lg font-semibold py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:text-pink-600 transition-colors'
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
