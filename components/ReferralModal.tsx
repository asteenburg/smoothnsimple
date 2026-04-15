"use client";

import { useEffect, useState } from "react";

export default function ReferralModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    // 7-day cooldown
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("referralModalSeenUntil", expiresAt.toString());

    setIsOpen(false);
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
        <h2 className='text-2xl text-gray-600 font-bold uppercase tracking-wide text-center mb-2'>
          Referral Bonus
        </h2>

        <p className='text-gray-500 text-center mb-5'>
          Existing clients can refer a friend to receive 10% off their next
          treatment. New clients get $6.00 per unit on first visit! It’s a
          win-win!
        </p>

        {/* Input */}
        {/*} <input
          type='email'
          placeholder='Friend’s email'
          className='w-full border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black'
        /> */}

        {/* CTA */}
        {/*<button
          onClick={closeModal}
          className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'
        >
          Send Invite
        </button> */}

        {/* Footer note */}
        <p className='text-xs text-gray-400 text-center mt-3'>
          No spam. Just savings.
        </p>
      </div>
    </div>
  );
}
