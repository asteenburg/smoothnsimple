"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, XCircle, Clock, Zap } from "lucide-react";

export default function CarePage() {
  return (
    <div className='bg-black min-h-screen text-white flex flex-col selection:bg-pink-600/30'>
      <Header />

      <main className='flex-1 max-w-5xl mx-auto px-6 pt-32 pb-24 w-full'>
        {/* --- HERO HEADER --- */}
        <div className='text-center mb-20'>
          <h1 className='text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6'>
            Result <span className='text-pink-600'>Optimization</span>
          </h1>
          <p className='text-zinc-500 text-[10px] md:text-xs uppercase font-black tracking-[0.4em]'>
            Botox & Lip Flip <span className="sr-only">Pre and Post Treatment Protocol Brantford</span> Protocol
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* --- BEFORE CARE --- */}
          <div className='space-y-8'>
            <div className='flex items-center gap-4 mb-4'>
              <div className='bg-zinc-900 p-3 rounded-2xl border border-white/5'>
                <Clock
                  className='text-pink-600'
                  size={24}
                />
              </div>
              <h2 className='text-3xl font-black italic uppercase tracking-tight'>
                Before <span className="sr-only">Botox</span> Care
              </h2>
            </div>

            <CareItem
              type='dont'
              title='Blood Thinners'
              desc='Avoid Ibuprofen, Aspirin, and Vitamin E for 24 hours to minimize bruising.'
            />
            <CareItem
              type='dont'
              title='Alcohol'
              desc='Avoid alcohol 24 hours prior; it thins the blood and increases swelling.'
            />
            <CareItem
              type='do'
              title='Arnica'
              desc='Consider taking Arnica tablets 2 days before to reduce potential bruising.'
            />
          </div>

          {/* --- AFTERCARE --- */}
          <div className='space-y-8'>
            <div className='flex items-center gap-4 mb-4'>
              <div className='bg-zinc-900 p-3 rounded-2xl border border-white/5'>
                <Zap
                  className='text-pink-600'
                  size={24}
                />
              </div>
              <h2 className='text-3xl font-black italic uppercase tracking-tight'>
                Aftercare <span className="sr-only">Instructions</span>
              </h2>
            </div>

            <CareItem
              type='dont'
              title='Heavy Lifting'
              desc='No strenuous exercise for 24 hours. Keep blood pressure stable.'
            />
            <CareItem
              type='dont'
              title='Pressure'
              desc='Do not massage the area or wear tight hats/headbands for 4 hours.'
            />
            <CareItem
              type='do'
              title='Stay Upright'
              desc='Keep your head elevated and do not lie completely flat for 4 hours.'
            />
            <CareItem
              type='dont'
              title='Extreme Heat'
              desc='Avoid saunas, hot tubs, or intense sun exposure for 24-48 hours.'
            />
          </div>
        </div>

        {/* --- THE TIMELINE NOTICE --- */}
        <div className='mt-24 p-12 bg-zinc-900/20 border border-white/5 rounded-[4rem] text-center'>
          <h2 className='text-3xl font-black italic uppercase tracking-tighter mb-6'>
            The 14-Day <span className="sr-only">Botox</span> Rule
          </h2>
          <p className='text-zinc-400 text-sm leading-relaxed max-w-2xl mx-auto italic'>
            "Botox takes time to settle. While you may see changes in 3–5 days,
            full results require a full 14 days. Please wait the full two weeks
            before requesting a touch-up."
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function CareItem({
  type,
  title,
  desc,
}: {
  type: "do" | "dont";
  title: string;
  desc: string;
}) {
  return (
    <div className='group p-6 bg-zinc-900/40 border border-white/5 rounded-3xl transition-all hover:border-pink-500/30'>
      <div className='flex items-start gap-4'>
        {type === "do" ? (
          <CheckCircle2
            className='text-green-500 mt-1 shrink-0'
            size={18}
          />
        ) : (
          <XCircle
            className='text-pink-600 mt-1 shrink-0'
            size={18}
          />
        )}
        <div>
          <h3 className='font-black uppercase tracking-widest text-[11px] mb-2 text-white'>
            {type === "do" ? "Recommended" : "Avoid"}: {title}
          </h3>
          <p className='text-zinc-500 text-sm leading-relaxed italic'>
            "{desc}"
          </p>
        </div>
      </div>
    </div>
  );
}
