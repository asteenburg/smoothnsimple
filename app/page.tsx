"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Zap, 
  ChevronDown,
  Star,
  Instagram,
  MapPin
} from "lucide-react";

/**
 * HERO_SLIDES Data Array
 */
const HERO_SLIDES = [
  {
    id: 1,
    video: "/videos/hero-1.mp4",
    title: "Smooth N Simple",
    subtitle: "Medical Aesthetics Brantford",
    cta: "Book Treatment",
    path: "/book"
  },
  {
    id: 2,
    video: "/videos/hero-2.mp4",
    title: "Natural Results",
    subtitle: "Expert Injectables",
    cta: "View Services",
    path: "/services"
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  /**
   * --- NUCLEAR AUTOPLAY GUARD ---
   */
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        // Direct DOM manipulation to ensure the browser sees the attributes
        video.muted = true;
        video.defaultMuted = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        
        if (index === currentSlide) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.warn("Autoplay interaction blocked by policy:", error);
            });
          }
        }
      }
    });
  }, [currentSlide]);

  /**
   * SLIDE ROTATION LOGIC
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === HERO_SLIDES.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='bg-black min-h-screen text-white flex flex-col selection:bg-pink-600/30 font-sans'>
      <Header />

      <main className="flex-1">
        {/* --- HERO SECTION --- */}
        <section className='relative h-screen w-full overflow-hidden border-b border-white/5'>
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                src={slide.video}
                autoPlay
                muted
                loop
                playsInline
                className='absolute inset-0 w-full h-full object-cover brightness-[0.9]'
              />
              
              {/* --- TRIPLE-LAYER CINEMATIC OVERLAY --- */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 bg-black/40" /> 
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" /> 
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,black_85%)] opacity-80" />
              </div>

              <div className='relative z-20 h-full flex flex-col items-center justify-center text-center px-6'>
                <div className="max-w-5xl mx-auto space-y-4">
                  <h1 className='text-5xl md:text-[9.5rem] font-black italic uppercase tracking-tighter leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)]'>
                    {index === 0 ? (
                      <>Smooth <span className='text-pink-600'>N</span> Simple</>
                    ) : (
                      slide.title
                    )}
                  </h1>
                  
                  <p className='text-zinc-300 text-lg md:text-2xl uppercase font-black tracking-[0.4em] md:tracking-[0.7em] mt-10 drop-shadow-lg'>
                    {slide.subtitle}
                  </p>
                  
                  <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                      href={slide.path}
                      className='min-w-[280px] px-12 py-6 bg-white text-black rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-pink-600 hover:text-white transition-all duration-500 active:scale-95 shadow-2xl flex items-center justify-center gap-4 group'
                    >
                      {slide.cta}
                      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                    
                    <Link
                      href='/services'
                      className='min-w-[280px] px-12 py-6 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center'
                    >
                      Explore Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-6">
            <div className="flex gap-3">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${
                    i === currentSlide ? "w-12 bg-pink-600" : "w-4 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex flex-col items-center gap-2 opacity-30 animate-pulse">
              <ChevronDown size={20} />
            </div>
          </div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="relative z-20 py-40 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              <div className="group flex flex-col items-center text-center">
                <div className="mb-10 p-6 bg-zinc-900 rounded-[2rem] border border-white/5 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500 shadow-xl rotate-3 group-hover:rotate-0">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-6">Natural</h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[280px] italic font-medium">
                  "Subtle, refined enhancements designed to keep you looking like yourself—only refreshed."
                </p>
              </div>

              <div className="group flex flex-col items-center text-center">
                <div className="mb-10 p-6 bg-zinc-900 rounded-[2rem] border border-white/5 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500 shadow-xl -rotate-3 group-hover:rotate-0">
                  <Shield size={24} />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-6">Expertise</h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[280px] italic font-medium">
                  "Led by certified medical professionals specializing in precision injectable treatments."
                </p>
              </div>

              <div className="group flex flex-col items-center text-center">
                <div className="mb-10 p-6 bg-zinc-900 rounded-[2rem] border border-white/5 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500 shadow-xl rotate-6 group-hover:rotate-0">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-4">Refreshed</h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[280px] italic font-medium">
                  "High-impact results with minimal downtime, tailored to your unique facial anatomy."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="pb-40 px-6">
          <div className="max-w-5xl mx-auto p-20 rounded-[5rem] bg-zinc-900/20 border border-white/5 text-center relative overflow-hidden group hover:border-pink-600/30 transition-all duration-1000">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
                Ready for your <span className="text-pink-600">Refresh?</span>
              </h2>
              <p className="text-zinc-500 text-sm md:text-lg max-w-xl mx-auto mb-16 italic font-medium leading-relaxed">
                "Complimentary consultations available for all new clients in Brantford. 
                Let's build a treatment plan that fits your goals and anatomy."
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-6 text-white font-black uppercase tracking-[0.4em] text-[11px] border-b-2 border-pink-600 pb-3 hover:text-pink-600 transition-all duration-300"
              >
                Schedule Consultation <ArrowRight size={16} />
              </Link>
            </div>
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
               <Sparkles size={200} className="text-pink-600" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
