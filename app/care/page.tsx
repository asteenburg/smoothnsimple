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
        <div className='text-center mb-24'>
          <h1 className='text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6'>
            Result <span className='text-pink-600'>Optimization</span>
          </h1>

          <div className='w-24 h-px bg-white/10 mx-auto mb-6' />

          <p className='text-zinc-500 text-[10px] md:text-xs uppercase font-black tracking-[0.4em]'>
            Pre and Post Treatment Protocol
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-14'>
          {/* --- BEFORE CARE --- */}
          <div className='space-y-10'>
            <div className='flex items-center gap-4'>
              <div className='bg-zinc-900/60 p-3 rounded-2xl border border-white/5'>
                <Clock
                  className='text-pink-600'
                  size={22}
                />
              </div>

              <h2 className='text-3xl font-black italic uppercase tracking-tight'>
                Before Care
              </h2>
            </div>

            <div className='space-y-5'>
              <CareItem
                type='dont'
                title='Blood Thinners'
                desc='Avoid Ibuprofen, Aspirin, and Vitamin E for 24 hours to minimize bruising.'
              />
              <CareItem
                type='dont'
                title='Alcohol'
                desc='Avoid alcohol 24 hours prior; it increases bruising and swelling risk.'
              />
              <CareItem
                type='do'
                title='Arnica'
                desc='Start Arnica 48 hours before treatment to help reduce bruising.'
              />
            </div>
          </div>

          {/* --- AFTERCARE --- */}
          <div className='space-y-10'>
            <div className='flex items-center gap-4'>
              <div className='bg-zinc-900/60 p-3 rounded-2xl border border-white/5'>
                <Zap
                  className='text-pink-600'
                  size={22}
                />
              </div>

              <h2 className='text-3xl font-black italic uppercase tracking-tight'>
                Aftercare
              </h2>
            </div>

            <div className='space-y-5'>
              <CareItem
                type='dont'
                title='Heavy Exercise'
                desc='Avoid intense exercise for 24 hours to reduce swelling and product migration risk.'
              />
              <CareItem
                type='dont'
                title='Pressure / Touching'
                desc='Do not massage or apply pressure to treated areas for at least 4 hours.'
              />
              <CareItem
                type='do'
                title='Stay Upright'
                desc='Remain upright for 4 hours post-treatment to support optimal product placement.'
              />
              <CareItem
                type='dont'
                title='Heat Exposure'
                desc='Avoid saunas, hot tubs, and direct heat exposure for 24–48 hours.'
              />
            </div>
          </div>
        </div>

        {/* --- THE TIMELINE NOTICE --- */}
        <div className='mt-28 p-12 bg-zinc-900/20 border border-white/5 rounded-[4rem] text-center'>
          <h2 className='text-3xl font-black italic uppercase tracking-tighter mb-6'>
            The 14-Day Rule
          </h2>

          <div className='w-20 h-px bg-pink-600 mx-auto mb-6' />

          <p className='text-zinc-400 text-sm leading-relaxed max-w-2xl mx-auto italic'>
            “Botox takes time to settle. Initial changes may appear in 3–5 days,
            but full results are only visible after 14 days. Please allow the
            full two-week window before assessing results or requesting
            adjustments.”
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* --- CLEAN CARD COMPONENT (polished only, same structure) --- */
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
    <div className='group p-6 bg-zinc-900/40 border border-white/5 rounded-3xl transition-all duration-300 hover:border-pink-500/30 hover:bg-zinc-900/60'>
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

          <p className='text-zinc-500 text-sm leading-relaxed italic'>{desc}</p>
        </div>
      </div>
    </div>
  );
}
