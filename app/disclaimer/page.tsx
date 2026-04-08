"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertTriangle, Info } from "lucide-react";

const DisclaimerPage = () => {
  return (
    <div className='bg-black min-h-screen text-white flex flex-col selection:bg-pink-600/30'>
      <Header />

      <main className='flex-1 max-w-4xl mx-auto px-6 pt-32 pb-24 w-full'>
        <div className='bg-zinc-900/20 border border-white/5 rounded-[3.5rem] p-10 md:p-16'>
          {/* Header */}
          <div className='flex flex-col items-center mb-12 text-center'>
            <div className='bg-pink-600/10 p-4 rounded-2xl mb-6'>
              <AlertTriangle
                className='text-pink-600'
                size={32}
              />
            </div>
            <h1 className='text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none'>
              Clinical <span className='text-pink-600'>Disclaimer</span>
            </h1>
          </div>

          <div className='space-y-8'>
            {/* Urgent Notice */}
            <div className='flex gap-6 p-8 bg-white/5 rounded-3xl border-l-4 border-pink-600'>
              <div className='shrink-0 text-pink-600'>
                <Info size={24} />
              </div>
              <p className='text-zinc-300 leading-relaxed'>
                <strong className='text-white uppercase tracking-widest text-xs block mb-2'>
                  Important Notice
                </strong>
                Before receiving Botox treatments at Smooth{" "}
                <span className='text-pink-600 font-bold'>N</span> Simple, all
                patients must read and follow the provided before-care and
                aftercare instructions. Failure to follow these instructions may
                result in side effects, complications, or unsatisfactory
                results.
              </p>
            </div>

            {/* Side Effects Section */}
            <div>
              <h2 className='text-xl font-black uppercase tracking-widest mb-6 italic'>
                Potential Considerations
              </h2>
              <p className='text-zinc-400 mb-6 italic'>
                Botox is generally safe when administered by a trained
                professional, but individual results may vary. Possible side
                effects include, but are not limited to:
              </p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {[
                  "Bruising & Swelling",
                  "Temporary Headaches",
                  "Facial Asymmetry",
                  "Localized Tenderness",
                  "Potential Allergic Reactions",
                ].map((item) => (
                  <div
                    key={item}
                    className='flex items-center gap-3 px-6 py-4 bg-zinc-900/40 border border-white/5 rounded-2xl'
                  >
                    <div className='w-1.5 h-1.5 bg-pink-600 rounded-full' />
                    <span className='text-sm font-bold uppercase tracking-wider text-zinc-300'>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Liability Waiver */}
            <div className='pt-8 border-t border-white/5'>
              <p className='text-zinc-500 text-sm leading-relaxed italic'>
                By proceeding with treatment, you acknowledge that Smooth{" "}
                <span className='text-pink-600'>N</span> Simple and its staff
                are{" "}
                <strong className='text-zinc-200'>
                  not responsible for any adverse outcomes, complications, or
                  results
                </strong>{" "}
                that may occur if instructions are not followed or if relevant
                medical information is not disclosed.
              </p>
            </div>

            <p className='text-center text-[10px] uppercase font-black tracking-[0.3em] text-zinc-600 pt-10'>
              Optimal Safety & Professional Excellence
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DisclaimerPage;
