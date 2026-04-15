"use client";

import { useEffect, useState } from "react";

export default function ReferralModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("referralModalSeen");
    if (!hasSeen) {
      setTimeout(() => setIsOpen(true), 1500); // delay for UX
    }
  }, []);

  const closeModal = () => {
    localStorage.setItem("referralModalSeen", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md relative animate-fadeIn'>
        {/* Close Button */}
        <button
          onClick={closeModal}
          className='absolute top-3 right-3 text-gray-400 hover:text-black text-xl'
        >
          ✕
        </button>

        {/* Content */}
        <h2 className='text-2xl font-bold mb-2 text-center'>
          🎉 Give 10%, Get 10%
        </h2>

        <p className='text-gray-600 text-center mb-4'>
          Refer a friend and you both get 10% off your next order.
        </p>

        <input
          type='email'
          placeholder='Friend’s email'
          className='w-full border rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-black'
        />

        <button
          onClick={closeModal}
          className='w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition'
        >
          Send Invite
        </button>

        <p className='text-xs text-gray-400 text-center mt-3'>
          No spam. Just savings.
        </p>
      </div>
    </div>
  );
}
