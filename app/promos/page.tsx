"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PromosPage() {
  const [name, setName] = useState("");
  const [referrerName, setReferrerName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendInvite = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          referrerName,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setSuccess(true);
      setName("");
      setEmail("");
      setReferrerName("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-black text-white min-h-screen flex flex-col selection:bg-pink-600/30'>
      <Header />

      <main className='flex-grow'>
        {/* HERO */}
        <section className='relative border-b border-zinc-900 overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-b from-pink-600/10 to-transparent' />

          <div className='relative max-w-7xl mx-auto px-4 py-16 md:py-28 text-center'>
            <p className='text-pink-500 uppercase tracking-[0.32em] text-xs md:text-sm font-bold mb-4'>
              Limited Time Offers
            </p>

            <h1 className='text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight'>
              Current Promotions
            </h1>

            <p className='text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mt-5 leading-relaxed px-2'>
              Exclusive Botox pricing for new clients and premium referral
              rewards for existing clients.
            </p>

            <div className='mt-6 flex flex-col sm:flex-row justify-center gap-2 text-sm text-zinc-300'>
              <span>✔ Natural Results</span>
              <span>✔ Trusted Provider</span>
              <span>✔ Personalized Care</span>
            </div>

            <div className='mt-8 flex flex-col sm:flex-row justify-center gap-3'>
              <Link
                href='/booking'
                className='bg-pink-600 hover:bg-pink-500 px-8 py-4 rounded-full font-bold transition w-full sm:w-auto'
              >
                Book Appointment
              </Link>

              <Link
                href='/terms'
                className='border border-zinc-700 hover:border-pink-600 px-8 py-4 rounded-full font-bold transition w-full sm:w-auto'
              >
                View Terms
              </Link>
            </div>
          </div>
        </section>

        {/* PROMOS */}
        <section className='max-w-7xl mx-auto px-4 py-14 md:py-20 grid lg:grid-cols-2 gap-6 md:gap-8'>
          {/* NEW CLIENT OFFER */}
          <div className='bg-gradient-to-b from-zinc-950 to-black border border-zinc-800 rounded-3xl p-6 md:p-10 hover:border-pink-600/50 transition'>
            <p className='text-pink-500 uppercase tracking-[0.28em] text-xs md:text-sm font-bold mb-3'>
              New Client Offer
            </p>

            <h2 className='text-3xl sm:text-4xl md:text-6xl font-black leading-tight'>
              Botox from <span className='text-pink-600'>$6/unit</span>
            </h2>

            <p className='text-zinc-400 mt-4 text-base md:text-lg leading-relaxed'>
              First-time clients receive exclusive introductory pricing with
              Shelby for natural, refreshed results.
            </p>

            <div className='mt-6 space-y-3'>
              <Link
                href='/booking'
                className='block w-full text-center bg-white text-black hover:bg-pink-600 hover:text-white px-8 py-4 rounded-full font-bold transition'
              >
                Claim Offer
              </Link>

              <div className='text-center border border-zinc-800 rounded-full px-6 py-3 text-zinc-400 text-sm'>
                New clients only
              </div>
            </div>
          </div>

          {/* REFERRAL OFFER */}
          <div className='bg-gradient-to-b from-zinc-950 to-black border border-zinc-800 rounded-3xl p-6 md:p-10 hover:border-pink-600/50 transition'>
            <p className='text-pink-500 uppercase tracking-[0.28em] text-xs md:text-sm font-bold mb-3'>
              Referral Rewards
            </p>

            <h2 className='text-3xl sm:text-4xl md:text-6xl font-black leading-tight'>
              Refer a friend.
              <br />
              Save <span className='text-pink-600'>10%</span>
            </h2>

            <p className='text-zinc-400 mt-4 text-base md:text-lg leading-relaxed'>
              Refer a new client. Once they complete their first qualifying
              appointment, you’ll receive 10% off your next eligible treatment.
            </p>

            <p className='text-pink-500 mt-4 text-sm font-semibold'>
              Your friend also receives Botox from $6/unit.
            </p>

            <div className='mt-6 space-y-4'>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your name'
                className='w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-600'
              />

              <input
                type='text'
                value={referrerName}
                onChange={(e) => setReferrerName(e.target.value)}
                placeholder="Friend's name"
                className='w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-600'
              />

              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Friend's email"
                className='w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-600'
              />

              <button
                onClick={handleSendInvite}
                disabled={loading}
                className='w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-pink-600 hover:text-white transition disabled:opacity-50'
              >
                {loading
                  ? "Sending..."
                  : success
                    ? "Invite Sent 🎉"
                    : "Send Invite"}
              </button>

              <p className='text-xs text-zinc-500 text-center'>
                Friend must be a new client. One reward per successful referral.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='border-t border-zinc-900'>
          <div className='max-w-5xl mx-auto px-4 py-16 md:py-24 text-center'>
            <h2 className='text-3xl sm:text-4xl md:text-6xl font-black'>
              Ready to book?
            </h2>

            <p className='text-zinc-400 mt-4 text-base md:text-lg px-4'>
              Appointments fill quickly. Reserve your preferred time today.
            </p>

            <Link
              href='/booking'
              className='inline-block w-full sm:w-auto mt-8 bg-pink-600 hover:bg-pink-500 text-white px-10 py-4 rounded-full font-bold transition'
            >
              Book Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
