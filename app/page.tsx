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
  CheckCircle2, 
  MapPin, 
  Clock, 
  Instagram,
  Star
} from "lucide-react";

// --- CONTENT DATA ---
const HERO_SLIDES = [
  {
    id: 1,
    video: "/videos/293081.mp4",
    title: "Smooth N Simple",
    subtitle: "Medical Aesthetics Brantford",
    cta: "Book Treatment",
    link: "/book"
  },
  {
    id: 2,
    video: "/videos/mixkit-adult-woman-in-the-mirror-frustrated-by-her-wrinkles-4515-hd-ready.mp4",
    title: "Natural Results",
    subtitle: "Expert Injectables",
    cta: "View Services",
    link: "/services"
  },
];

const TRUST_REASONS = [
  {
    title: "Safety First",
    desc: "Treatments administered by a double-certified medical professional in a sterile, clinical environment.",
    icon: <Shield size={24} />
  },
  {
    title: "Subtle Artistry",
    desc: "We focus on 'the refresh'—natural-looking enhancements that never look frozen or overfilled.",
    icon: <Sparkles size={24} />
  },
  {
    title: "Expert Mapping",
    desc: "Every face is unique. We provide custom muscle mapping to ensure your results fit your specific anatomy.",
    icon: <Zap size={24} />
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // --- NUCLEAR AUTOPLAY GUARD ---
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.muted = true;
        video.defaultMuted = true;
        video.setAttribute("muted", ""); 
        video.setAttribute("playsinline", ""); 
        
        if (index === currentSlide) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.warn("Autoplay interaction blocked by browser.", error);
            });
          }
        }
      }
    });
  }, [currentSlide]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='bg-black min-h-screen text-white selection:bg-pink-600/30 font-sans'>
      <Header />

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
              ref={(el) => { if (el) videoRefs.current[index] = el; }}
              src={slide.video}
              autoPlay
              muted
              loop
              playsInline
              className='absolute inset-0 w-full h-full object-cover brightness-[0.85]'
            />
            
            {/* --- TRIPLE-LAYER CINEMATIC OVERLAY --- */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute inset-0 bg-black/40" /> 
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" /> 
              <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_15%,black_90%)] opacity-80" />
            </div>

            <div className='relative z-20 h-full flex flex-col items-center justify-center text-center px-6'>
              <div className="max-w-5xl mx-auto pt-20">
                <h1 className='text-5xl md:text-[10rem] font-black italic uppercase tracking-tighter leading-[0.85] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]'>
                  {index === 0 ? (
                    <>Smooth <span className='text-pink-600'>N</span> Simple</>
                  ) : (
                    slide.title
                  )}
                </h1>
                
                <p className='text-zinc-400 text-lg md:text-3xl uppercase font-black tracking-[0.4em] md:tracking-[0.8em] mt-10 drop-shadow-lg'>
                  {slide.subtitle}
                </p>
                
                <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link
                    href={slide.link}
                    className='min-w-[280px] px-12 py-6 bg-white text-black rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-pink-600 hover:text-white transition-all duration-500 active:scale-95 shadow-2xl flex items-center justify-center gap-4 group'
                  >
                    {slide.cta}
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                  
                  <Link
                    href='/services'
                    className='min-w-[280px] px-12 py-6 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center'
                  >
                    View Treatments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
          <div className="flex gap-2 mb-4">
            {HERO_SLIDES.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-500 rounded-full ${i === currentSlide ? "w-12 bg-pink-600" : "w-4 bg-white/20"}`} 
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 opacity-30 animate-pulse">
            <span className="text-[9px] uppercase font-black tracking-[0.5em]">Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>
      </section>

      {/* --- REPUTATION GRID SECTION --- */}
      <section className="relative z-20 py-32 bg-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none flex items-center justify-center overflow-hidden">
          <h2 className="text-[30vw] font-black italic uppercase leading-none select-none">SMOOTH</h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
              The <span className="text-pink-600">Standard</span> of Care
            </h2>
            <div className="h-1 w-24 bg-pink-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {TRUST_REASONS.map((reason, index) => (
              <div key={index} className="group flex flex-col items-center text-center p-8 bg-zinc-950 border border-white/5 rounded-[3rem] hover:border-pink-500/30 transition-all duration-500 shadow-xl">
                <div className="mb-10 p-6 bg-zinc-900 rounded-[2rem] text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-700 shadow-inner">
                  {reason.icon}
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-6">{reason.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[280px] italic">
                  "{reason.desc}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY SECTION --- */}
      <section className="py-32 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-pink-600/20 rounded-[4rem] blur-2xl group-hover:bg-pink-600/30 transition-all duration-700" />
            <div className="relative aspect-square rounded-[4rem] overflow-hidden border border-white/10">
               <img 
                src="/images/joe-woods-4Zaq5xY5M_c-unsplash.jpg" 
                alt="Brantford Medical Aesthetics Clinic Environment" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
               <div className="absolute bottom-10 left-10 flex items-center gap-4">
                  <div className="p-4 bg-white text-black rounded-2xl shadow-2xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Location</p>
                    <p className="font-bold">Brantford, Ontario</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600/10 border border-pink-600/20 rounded-full text-pink-500 text-[10px] font-black uppercase tracking-widest">
              <Star size={12} /> Personalized Approach
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
              Where Science <br /> 
              Meets <span className="text-pink-600">Simplicity.</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed italic">
              "We believe aesthetic treatments shouldn't be complicated or obvious. Our philosophy is rooted in clinical safety and the art of the 'lip flip' and 'botox bank'—treatments that empower you to look as vibrant as you feel."
            </p>
            
            <ul className="space-y-6">
              <li className="flex items-center gap-4 group">
                <div className="p-2 bg-zinc-900 rounded-lg text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-zinc-300 font-bold uppercase tracking-widest text-xs">Complimentary Consultations</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2 bg-zinc-900 rounded-lg text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-zinc-300 font-bold uppercase tracking-widest text-xs">Advanced Neuromodulator Expertise</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2 bg-zinc-900 rounded-lg text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-zinc-300 font-bold uppercase tracking-widest text-xs">Private, One-on-One Care</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- THE CTA CALLOUT --- */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto relative rounded-[5rem] overflow-hidden bg-zinc-900/30 border border-white/5 p-16 md:p-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 via-transparent to-transparent" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              Ready for your <span className="text-pink-600">Refresh?</span>
            </h2>
            <p className="text-zinc-500 text-sm md:text-xl max-w-2xl mx-auto mb-16 italic font-medium">
              Join the hundreds of clients in Brant County who trust Smooth N Simple for natural, professional cosmetic injections.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
               <Link
                href="/book"
                className="px-12 py-6 bg-pink-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 shadow-2xl flex items-center gap-4"
              >
                Secure Your Spot <Clock size={16} />
              </Link>
              
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="px-12 py-6 bg-transparent border border-white/10 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:border-pink-600 transition-all flex items-center gap-4"
              >
                Follow Results <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
