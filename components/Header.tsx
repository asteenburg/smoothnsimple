"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center p-6 bg-white shadow-md dark:bg-black">
      <h1 className="text-2xl font-bold text-pink-600">Smooth n Simple</h1>
      <nav className="flex gap-6">
        <Link href="/" className="hover:text-pink-500">Home</Link>
        <Link href="/about" className="hover:text-pink-500">About</Link>
        <Link href="/services" className="hover:text-pink-500">Services</Link>
        <Link href="/booking" className="hover:text-pink-500">Book</Link>
        <Link href="/shop" className="hover:text-pink-500">Shop</Link>
      </nav>
    </header>
  );
}