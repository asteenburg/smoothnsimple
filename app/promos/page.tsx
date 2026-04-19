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
    console.log("🚀 BUTTON CLICKED");

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

      console.log("📡 RESPONSE STATUS:", res.status);

      const text = await res.text();
      console.log("📦 RAW RESPONSE:", text);

      const data = JSON.parse(text);

      if (!res.ok) {
        console.error("❌ API ERROR:", data);
        throw new Error(data.error || "Request failed");
      }

      console.log("✅ SUCCESS:", data);

      setSuccess(true);
      setName("");
      setEmail("");
      setReferrerName("");
    } catch (err) {
      console.error("❌ FRONTEND ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-black text-white min-h-screen flex flex-col selection:bg-pink-600/30'>
      <Header />

      <main className='flex-grow'>
        {/* HERO */}
        <section className='border-b border-zinc-900'>
          <div className='max-w-7xl mx-auto px-4 py-20 md:py-28 text-center'>
            <p className='text-pink-500 uppercase tracking-[0.35em] text-sm font-bold mb-4'>
              Limited Time Offers
            </p>

            <h1 className='text-5xl md:text-7xl font-black leading-tight'>
              Current Promotions
            </h1>

            <p className='text-zinc-400 text-lg max-w-2xl mx-auto mt-6'>
              Exclusive pricing for new and returning clients. Refresh your look
              and save on your next treatment.
            </p>
          </div>
        </section>

        {/* PROMOS */}
        <section className='max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-8'>
          {/* PROMO 1 */}
          <div className='bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-10 hover:border-pink-600/50 transition'>
            <p className='text-pink-500 uppercase tracking-[0.3em] text-sm font-bold mb-4'>
              New Client Special
            </p>

            <h2 className='text-4xl md:text-5xl font-black leading-tight'>
              Botox from <span className='text-pink-600'>$6/unit</span>
            </h2>

            <p className='text-zinc-400 mt-6 text-lg leading-relaxed'>
              Experience expert injections with Shelby at our best introductory
              rate. Perfect for first-time clients looking for natural,
              refreshed results.
            </p>

            <div className='mt-8 flex flex-col sm:flex-row gap-4'>
              <Link
                href='/booking'
                className='bg-pink-600 hover:bg-pink-500 text-white px-8 py-4 rounded-full font-bold text-center transition'
              >
                Book Appointment
              </Link>

              <div className='border border-zinc-700 rounded-full px-6 py-4 text-zinc-400 text-sm text-center'>
                Recommended minimum 20 units
              </div>
            </div>
          </div>

          {/* PROMO 2 */}
          <div className='bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-10 hover:border-pink-600/50 transition'>
            <p className='text-pink-500 uppercase tracking-[0.3em] text-sm font-bold mb-4'>
              Referral Rewards
            </p>

            <h2 className='text-4xl md:text-5xl font-black leading-tight'>
              Refer a friend.
              <br />
              Save <span className='text-pink-600'>10%</span>
            </h2>

            <p className='text-zinc-400 mt-6 text-lg leading-relaxed'>
              Share Shelby with someone you love. When they book, you receive
              10% off your next treatment.
            </p>

            {/* FORM */}
            <div className='mt-8 space-y-4'>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your name'
                className='w-[16rem] bg-black border border-zinc-800 rounded-xl md:mr-1 lg:mr-1 px-4 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-600'
              />

              <input
                type='text'
                value={referrerName}
                onChange={(e) => setReferrerName(e.target.value)}
                placeholder="Friend's name"
                className='w-[16rem] bg-black border border-zinc-800 rounded-xl md:ml-1 lg:ml-1 px-4 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-600'
              ></input>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Friend's email"
                className='w-full bg-black border border-zinc-800 rounded-xl px-4 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:border-pink-600'
              />

              <button
                onClick={handleSendInvite}
                disabled={loading}
                className='w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-pink-600 hover:text-white transition disabled:opacity-50'
              >
                {loading ? (
                  "Sending..."
                ) : success ? (
                  <span>
                    <span className='text-gray-800'>Invite Sent 🎉 </span>
                    <br />
                    <span className='text-gray-500 text-sm'>
                      Be sure to check your junk/spam folder!
                    </span>
                  </span>
                ) : (
                  "Send Invite"
                )}
              </button>

              <p className='text-xs text-zinc-500 text-center'>
                One referral reward per client. Terms may apply.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className='border-t border-zinc-900'>
          <div className='max-w-5xl mx-auto px-4 py-20 text-center'>
            <h2 className='text-4xl md:text-5xl font-black'>Ready to book?</h2>

            <p className='text-zinc-400 mt-4 text-lg'>
              Appointments fill quickly. Reserve your spot today.
            </p>

            <Link
              href='/booking'
              className='inline-block mt-8 bg-pink-600 hover:bg-pink-500 text-white px-10 py-4 rounded-full font-bold transition'
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
