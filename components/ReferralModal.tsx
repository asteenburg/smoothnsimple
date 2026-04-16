"use client";

import { useEffect, useState } from "react";

export default function ReferralModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const seenUntil = localStorage.getItem("referralModalSeenUntil");
    const shouldShow = !seenUntil || Date.now() > Number(seenUntil);

    if (!shouldShow) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [mounted]);

  const closeModal = () => {
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("referralModalSeenUntil", expiresAt.toString());

    setIsOpen(false);
  };

  const handleSendInvite = async () => {
    if (!email.includes("@")) return;

    try {
      setLoading(true);
      setSuccess(false);

      const res = await fetch("/api/referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          referrerName: name,
        }),
      });

      const text = await res.text(); // 👈 IMPORTANT: always read raw response first

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
        return;
      }

      if (!res.ok) {
        console.error("Referral error:", data);
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (err) {
      console.error("Request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 w-full h-[100dvh] z-[9999] flex items-center justify-center bg-black/60'>
      <div className='bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md relative animate-fadeIn'>
        {/* Close */}
        <button
          onClick={closeModal}
          className='absolute top-3 right-3 text-gray-400 hover:text-black text-xl'
        >
          ✕
        </button>

        {/* Title */}
        <h2 className='text-2xl font-bold text-center text-gray-700 uppercase mb-2'>
          Referral Bonus
        </h2>
        <div className='w-16 h-1 bg-pink-600 mx-auto mb-4 rounded-full'></div>

        <p className='text-gray-500 text-center mb-5 text-sm'>
          Refer a friend
          <span className='text-xs align-super'>1</span> and you both receive
          10% off your next treatment.
        </p>

        {/* Input */}
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Your name'
          className='w-full border rounded-lg text-gray-700 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black'
        />
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Friend’s email'
          className='w-full border rounded-lg text-gray-700 px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black'
        />

        {/* CTA */}
        <button
          onClick={handleSendInvite}
          disabled={loading}
          className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50'
        >
          {loading ? "Sending..." : success ? "Sent 🎉" : "Send Invite"}
        </button>

        {/* Footer */}
        <p className='text-xs text-gray-400 text-center mt-3'>
          No spam. Just savings.
        </p>
        <p className='text-xs text-gray-400 text-center tracking-[-0.10em] mt-1'>
          1 Only one referral bonus per person. See website for full terms and
          conditions.
        </p>
      </div>
    </div>
  );
}
