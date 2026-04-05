// components/CookieBanner.tsx
"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setShow(true);
  }, []);

  const handleConsent = (choice: "accept" | "decline" | "manage") => {
    localStorage.setItem("cookieConsent", choice);
    setShow(false);

    if (choice === "manage") {
      alert(
        "You can manage your cookie preferences in your browser settings or contact us for assistance.",
      );
    }
  };

  if (!show) return null;

  return (
    <div className='fixed bottom-0 inset-x-0 bg-gray-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between z-50 shadow-lg'>
      <p className='text-sm mb-2 sm:mb-0 sm:mr-4'>
        We use cookies to improve your experience. By using our site, you agree
        to our{" "}
        <a
          href='/cookies'
          className='underline text-blue-400'
        >
          Cookies Policy
        </a>
        .
      </p>
      <div className='flex gap-2'>
        <button
          onClick={() => handleConsent("accept")}
          className='bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors'
        >
          Accept
        </button>
        <button
          onClick={() => handleConsent("decline")}
          className='bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded transition-colors'
        >
          Decline
        </button>
        <button
          onClick={() => handleConsent("manage")}
          className='bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded transition-colors'
        >
          Manage
        </button>
      </div>
    </div>
  );
}
