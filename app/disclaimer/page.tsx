"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertTriangle, Info } from "lucide-react";

const DisclaimerPage = () => {
  return (
    <div className='bg-black min-h-screen text-white flex flex-col selection:bg-pink-600/30'>
      <Header />

      <main className='flex-1 max-w-4xl mx-auto px-6 pt-28 md:pt-32 pb-20 w-full'>
        {/* CARD */}
        <div className='bg-gradient-to-b from-zinc-950 to-black border border-zinc-800 rounded-3xl p-8 md:p-12'>
          {/* HEADER */}
          <div className='flex flex-col items-center mb-10 text-center'>
            <div className='bg-pink-600/10 p-4 rounded-2xl mb-6 border border-pink-600/20'>
              <AlertTriangle
                className='text-pink-500'
                size={30}
              />
            </div>

            <p className='text-pink-500 uppercase tracking-[0.35em] text-xs font-bold mb-4'>
              Medical Disclaimer
            </p>

            <h1 className='text-4xl md:text-6xl font-black tracking-tight leading-none'>
              Clinical <span className='text-pink-600'>Disclaimer</span>
            </h1>
          </div>

          <div className='space-y-10'>
            {/* IMPORTANT NOTICE */}
            <div className='flex gap-5 p-6 md:p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl border-l-4 border-l-pink-600'>
              <div className='shrink-0 text-pink-500 mt-1'>
                <Info size={22} />
              </div>

              <div>
                <p className='text-white font-semibold uppercase tracking-widest text-xs mb-3'>
                  Important Notice
                </p>

                <p className='text-zinc-400 leading-relaxed text-sm md:text-base'>
                  Before receiving Botox treatments at Smooth{" "}
                  <span className='text-pink-600 font-semibold'>N</span> Simple,
                  all patients must follow provided pre-care and aftercare
                  instructions. Failure to do so may increase risk of side
                  effects or affect results.
                </p>
              </div>
            </div>

            {/* SIDE EFFECTS */}
            <div>
              <h2 className='text-lg md:text-xl font-bold tracking-tight mb-4'>
                Potential Considerations
              </h2>

              <p className='text-zinc-400 text-sm md:text-base mb-6 leading-relaxed'>
                Botox is generally safe when administered by a qualified
                professional, however individual responses may vary.
              </p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {[
                  "Bruising & Swelling",
                  "Temporary Headaches",
                  "Facial Asymmetry",
                  "Localized Tenderness",
                  "Rare Allergic Reactions",
                ].map((item) => (
                  <div
                    key={item}
                    className='flex items-center gap-3 px-5 py-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-pink-600/30 transition'
                  >
                    <div className='w-1.5 h-1.5 bg-pink-600 rounded-full' />
                    <span className='text-sm font-medium text-zinc-300'>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* LIABILITY */}
            <div className='pt-8 border-t border-zinc-800'>
              <p className='text-zinc-400 text-sm md:text-base leading-relaxed'>
                By proceeding with treatment, you acknowledge that Smooth{" "}
                <span className='text-pink-600 font-semibold'>N</span> Simple
                and its staff are not responsible for adverse outcomes if
                medical history is not disclosed or aftercare instructions are
                not followed.
              </p>
            </div>

            {/* FOOTER TAGLINE */}
            <p className='text-center text-[10px] uppercase tracking-[0.3em] text-zinc-600 pt-6'>
              Safety • Precision • Professional Care
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DisclaimerPage;
