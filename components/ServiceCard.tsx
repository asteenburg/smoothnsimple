"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Calendar } from "lucide-react";

type ServiceCardProps = {
  title: string;
  price: string;
  description: string;
  image: string;
  overlayColor?: string;
};

export default function ServiceCard({
  title,
  price,
  description,
  image,
  overlayColor,
}: ServiceCardProps) {
  return (
    <div className="group bg-zinc-900/20 border border-white/5 rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 hover:border-pink-500/30 hover:bg-zinc-900/40">
      
      {/* IMAGE */}
      <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden bg-zinc-800">
        <Image
          src={image}
          alt={`${title} treatment`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

        {/* Overlay color */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-60 transition duration-500"
          style={{ backgroundColor: overlayColor ?? "rgba(0,0,0,0.4)" }}
        />

        {/* Shimmer */}
        <div
  className="absolute inset-0 opacity-30 sm:opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
  style={{
    background:
      "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 2s infinite linear",
  }}
/>

        {/* Price */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
          <p className="text-lg sm:text-2xl font-black italic tracking-tighter text-white">
            {price}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-pink-600/10 rounded-lg text-pink-500">
            <Sparkles size={16} />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black italic uppercase tracking-tight group-hover:text-pink-600 transition-colors">
            {title}
          </h3>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-10 flex-1">
          {description}
        </p>

        <Link
          href="/book"
          className="w-full py-4 sm:py-6 bg-white text-black rounded-2xl font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] flex items-center justify-center gap-2 sm:gap-3 hover:bg-pink-600 hover:text-white transition-all duration-500 shadow-xl"
        >
          <Calendar size={14} />
          Book Appointment
          <ArrowRight
            size={14}
            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
          />
        </Link>
      </div>
    </div>
  );
}
