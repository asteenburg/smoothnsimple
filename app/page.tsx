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
  Star,
  ChevronRight,
  UserCheck
} from "lucide-react";

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

const TREATMENTS = [
  {
    title: "Neuromodulators",
    subtitle: "Botox & Dysport",
    description: "Target fine lines and wrinkles for a smooth, refreshed appearance.",
    image: "/images/treatment-1.jpg",
    link: "/services/neuromodulators"
  },
  {
    title: "Lip Enhancement",
    subtitle: "Lip Filler & Flips",
    description: "Add volume or redefine your shape with a natural, artistic touch.",
    image: "/images/treatment-2.jpg",
    link: "/services/lips"
  },
  {
    title: "Skin Vitality",
    subtitle: "Microneedling & Peels",
    description: "Restore your natural glow and improve overall skin texture.",
    image: "/images/treatment-3.jpg",
    link: "/services/skin"
  }
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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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
              console.warn("Autoplay interaction blocked.", error);
            });
          }
        }
      }
    });
  }, [currentSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='bg-black min-h-screen text-white selection:bg-pink-600/30 font-sans'>
      <Header />

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
            
            {/* TRIPLE-LAYER OVERLAY ADDITION */}
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
                  <Link href={slide.link} className='min-w-[280px] px-12 py-6 bg-white text-black rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-pink-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl'>
                    {slide.cta} <ArrowRight size={16} />
                  </Link>
                  <Link href='/services' className='min-w-[280px] px-12 py-6 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center'>
                    View Treatments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="py-32 bg-black px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
                Aesthetic <span className="text-pink-600">Services</span>
              </h2>
              <p className="text-zinc-500 text-lg italic">Professional medical grade treatments tailored specifically to your facial anatomy.</p>
            </div>
            <Link href="/services" className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-pink-600 border-b border-pink-600/20 pb-2">
              Full Service Menu <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TREATMENTS.map((item, idx) => (
              <Link href={item.link} key={idx} className="group relative aspect-[3/4] overflow-hidden rounded-[3rem] border border-white/5">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700 z-10" />
                <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute bottom-0 left-0 w-full p-10 z-20">
                  <p className="text-pink-600 font-black uppercase text-[10px] tracking-[0.3em] mb-2">{item.subtitle}</p>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">{item.title}</h3>
                  <p className="text-zinc-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 italic">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-20 py-32 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">The <span className="text-pink-600">Standard</span> of Care</h2>
            <div className="h-1 w-24 bg-pink-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {TRUST_REASONS.map((reason, index) => (
              <div key={index} className="group flex flex-col items-center text-center p-8 bg-zinc-950 border border-white/5 rounded-[3rem] hover:border-pink-500/30 transition-all duration-500 shadow-xl">
                <div className="mb-10 p-6 bg-zinc-900 rounded-[2rem] text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-700">{reason.icon}</div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-6">{reason.title}</h3>
                <p className="text-zinc-500 text-sm italic">"{reason.desc}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="relative aspect-square rounded-[4rem] overflow-hidden border border-white/10">
              <img src="/images/joe-woods-4Zaq5xY5M_c-unsplash.jpg" alt="Clinic" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
            </div>
          </div>
          <div className="space-y-10">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">Where Science Meets <span className="text-pink-600">Simplicity.</span></h2>
            <p className="text-zinc-400 text-lg leading-relaxed italic">"Our philosophy is rooted in clinical safety and the art of the 'refresh'—treatments that empower you to look as vibrant as you feel."</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {["Safety First", "Natural Results", "Medical Grade", "Private Clinic"].map((label, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-black/40 border border-white/5 rounded-2xl">
                  <div className="text-pink-600"><CheckCircle2 size={18} /></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto relative rounded-[5rem] overflow-hidden bg-zinc-900/30 border border-white/5 p-16 md:p-24 text-center">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none">Ready for your <span className="text-pink-600">Refresh?</span></h2>
            <p className="text-zinc-500 text-sm md:text-xl max-w-2xl mx-auto mb-16 italic font-medium">Join the clients in Brant County who trust Smooth N Simple for professional injections.</p>
            <Link href="/book" className="px-12 py-6 bg-pink-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700 flex items-center gap-4 justify-center mx-auto max-w-[320px]">
              Secure Your Spot <Clock size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
