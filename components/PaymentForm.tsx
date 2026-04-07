"use client";

import React, { useState, useRef } from "react";
import Script from "next/script";

// This tells TS to stop complaining about the 'Square' property on window
declare global {
  interface Window {
    Square: any;
  }
}

export default function PaymentForm() {
  const [status, setStatus] = useState("");
  const cardRef = useRef<any>(null);

  const initSquare = async () => {
    if (!window.Square) return;

    const payments = window.Square.payments(
      process.env.NEXT_PUBLIC_SQUARE_APP_ID!,
      process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
    );

    try {
      const card = await payments.card();
      await card.attach("#card-container");
      cardRef.current = card;
    } catch (e) {
      console.error("Failed to attach card", e);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardRef.current) return;

    setStatus("Processing...");
    const result = await cardRef.current.tokenize();

    if (result.status === "OK") {
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: result.token,
          amount: 100, // $1.00 for testing
        }),
      });

      const data = await response.json();
      setStatus(data.success ? "Payment Successful!" : `Error: ${data.error}`);
    } else {
      setStatus(result.errors[0].message);
    }
  };

  return (
    <div className='p-4 border rounded-xl bg-white shadow-sm max-w-sm mx-auto'>
      <Script
        src='https://sandbox.web.sqspcdn.com/payments/v1/square.js'
        onLoad={initSquare}
      />

      <form
        onSubmit={handlePayment}
        className='space-y-4'
      >
        <div
          id='card-container'
          className='p-2 border rounded'
        ></div>

        <button
          type='submit'
          className='w-full bg-black text-white p-3 rounded-lg font-bold hover:opacity-90'
        >
          Pay Now
        </button>
      </form>

      {status && (
        <p className='mt-4 text-sm text-center text-gray-600'>{status}</p>
      )}
    </div>
  );
}
