"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import ServiceCard from "@/components/ServiceCard";

type Package = {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  overlayColor?: string; // optional = no TS errors
};

const SERVICE_PACKAGES: Package[] = [
  {
    id: 1,
    title: "Botox",
    price: "$8.00 / Unit",
    image: "/images/1000020715.jpg",
    overlayColor: "rgba(236,72,153,0.2)",
    description:
      "Botox decreases fine lines and wrinkles to forehead, frown lines and crows feet. Results typically last 3-4 months. Treatment time is approximately 30 minutes.",
  },
  {
    id: 2,
    title: "Lip Flip",
    price: "$60.00",
    image: "/images/1000020714.jpg",
    overlayColor: "rgba(168,85,247,0.2)",
    description:
      "A non-surgical cosmetic procedure that uses strategically placed Botox to subtly enhance the upper lip for a fuller, natural-looking pout.",
  },
  {
    id: 3,
    title: "B12 Injections",
    price: "$50.00",
    image: "/images/10000207242.PNG",
    overlayColor: "rgba(59,130,246,0.2)",
    description:
      "Boost energy levels, improve mood, and support overall health. Book a consultation to determine if B12 is the right choice for you.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col selection:bg-pink-600/30">
      <Header />

      {/* HERO */}
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/joe-woods-4Zaq5xY5M_c-unsplash.jpg"
            alt="Medical Aesthetic Services"
            fill
            className="object-cover opacity-40 brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-20">
          <h1 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
            Smooth <span className="text-pink-600">N</span> Simple
          </h1>

          <p className="text-zinc-500 text-2xl md:text-4xl uppercase font-black tracking-[0.5em] md:tracking-[1em] mt-8">
            Services
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICE_PACKAGES.map((pkg) => (
            <ServiceCard
              key={pkg.id}
              title={pkg.title}
              price={pkg.price}
              description={pkg.description}
              image={pkg.image}
              overlayColor={pkg.overlayColor}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 p-12 bg-zinc-900/40 border border-white/5 rounded-[4rem] text-center">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">
            Not sure where to start?
          </h2>

          <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest mb-10">
            Consultations are always complimentary in Brantford
          </p>

          <a
            href="/book"
            className="text-pink-500 font-black italic uppercase tracking-widest text-[10px] hover:text-white transition-colors border-b border-pink-500/30 pb-2"
          >
            Schedule a Consultation
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
