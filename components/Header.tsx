"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../app/context/CartContext";

interface NavLink {
  name: string;
  href: string;
  target?: string;
  rel?: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname?.replace(/\/$/, "") || "";

  const { cart } = useCart();

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    {
      name: "Book",
      href: "https://smoothnsimple.janeapp.com",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  const renderLink = (link: NavLink, isMobile = false) => {
    const isExternal = link.href.startsWith("http");
    const isActive =
      !isExternal && link.href.replace(/\/$/, "") === currentPath;

    const baseClasses = isMobile
      ? "text-lg font-semibold py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:text-pink-600 transition-colors"
      : "text-sm font-medium uppercase tracking-wider hover:text-pink-500 transition-colors";

    const activeClasses = isActive ? "text-pink-500" : "";

    if (isExternal) {
      return (
        <a
          key={link.name}
          href={link.href}
          target={link.target}
          rel={link.rel}
          className={`${baseClasses} ${activeClasses}`}
          onClick={() => isMobile && setIsOpen(false)}
        >
          {link.name}
        </a>
      );
    }

    return (
      <Link
        key={link.name}
        href={link.href}
        className={`${baseClasses} ${activeClasses}`}
        onClick={() => isMobile && setIsOpen(false)}
      >
        {link.name}
      </Link>
    );
  };

  return (
    <header className='relative w-full z-50 bg-white dark:bg-black border-b border-zinc-800 shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          {/* LOGO */}
          <div className='flex flex-col'>
            <h1 className='text-xl md:text-2xl font-bold text-pink-600 leading-none'>
              Smooth N Simple
            </h1>
            <span className='text-[10px] md:text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-1'>
              by Nurse Shelby
            </span>
          </div>

          {/* DESKTOP NAV */}
          <nav className='hidden md:flex items-center gap-8 text-gray-500 dark:text-gray-400'>
            {navLinks.map((link) => renderLink(link))}

            {/* 🛒 CART ICON */}
            <Link
              href='/shop'
              className='relative group'
            >
              <ShoppingCart className='w-5 h-5 group-hover:text-pink-500 transition' />

              {cart.length > 0 && (
                <span className='absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] px-1.5 py-0.5 rounded-full'>
                  {cart.length}
                </span>
              )}
            </Link>
          </nav>

          {/* MOBILE BUTTON + CART */}
          <div className='md:hidden flex items-center gap-4'>
            <Link
              href='/shop'
              className='relative'
            >
              <ShoppingCart className='w-6 h-6 text-gray-500' />
              {cart.length > 0 && (
                <span className='absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] px-1.5 py-0.5 rounded-full'>
                  {cart.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-500 hover:text-pink-600 focus:outline-none'
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className='md:hidden absolute top-20 left-0 w-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white border-b border-zinc-800 rounded-b-2xl animate-in fade-in slide-in-from-top-2'>
          <nav className='flex flex-col p-4 gap-4'>
            {navLinks.map((link) => renderLink(link, true))}
          </nav>
        </div>
      )}
    </header>
  );
}
