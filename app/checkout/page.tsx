"use client";

import { useState, useRef } from "react";
import { useCart } from "@/app/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BillingForm from "./BillingForm";
import Script from "next/script";
import { Lock, ChevronRight, Loader2, ShieldCheck } from "lucide-react";

declare global {
  interface Window {
    Square: any;
  }
}

export default function Checkout() {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const cardInstanceRef = useRef<any>(null);

  const [billingData, setBillingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // 13% HST Calculation
  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0,
  );
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  const initializeSquare = async () => {
    const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

    console.log("🚀 Square initialization started...");

    if (!window.Square || !appId) {
      console.error("❌ Square SDK or App ID missing. Verify .env.local");
      return;
    }

    const cardElement = document.getElementById("card-element");
    if (!cardElement) return;

    try {
      const payments = window.Square.payments(appId, locationId);

      /**
       * ATTEMPT 1: Styled Initialization
       * Using the most compatible modern keys.
       */
      const card = await payments.card({
        style: {
          input: {
            color: "#ffffff",
            fontSize: "14px",
          },
          // We omit 'placeholder' here as it is the most common cause of InvalidStylesError
        },
      });

      await card.attach("#card-element");
      cardInstanceRef.current = card;
      setIsInitialized(true);
      console.log("✅ Square Gateway Ready (Styled)");
    } catch (styleError) {
      console.warn(
        "⚠️ Style error detected, falling back to Clean Boot...",
        styleError,
      );

      /**
       * ATTEMPT 2: Clean Boot (The "Emergency" Fix)
       * This removes all custom styles to ensure the payment field actually loads.
       */
      try {
        const payments = window.Square.payments(appId, locationId);
        const card = await payments.card();
        await card.attach("#card-element");
        cardInstanceRef.current = card;
        setIsInitialized(true);
        console.log("✅ Square Gateway Ready (Standard Fallback)");
      } catch (criticalError) {
        console.error("🚨 Critical SDK Failure:", criticalError);
      }
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardInstanceRef.current || total <= 0) return;

    setLoading(true);
    try {
      const result = await cardInstanceRef.current.tokenize();

      if (result.status === "OK") {
        const resp = await fetch("/api/pay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            total: total.toFixed(2),
            sourceId: result.token,
            billing: billingData,
          }),
        });

        const data = await resp.json();
        if (data.success) {
          window.location.href = "/success";
        } else {
          alert(data.error || "Payment Declined.");
        }
      } else {
        alert(result.errors[0].message);
      }
    } catch (err) {
      console.error("🚨 Payment processing error:", err);
      alert("An unexpected error occurred. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-black min-h-screen text-white flex flex-col selection:bg-pink-600/30'>
      <Script
        src='https://web.squarecdn.com/v1/square.js'
        onLoad={initializeSquare}
      />

      <Header />

      <main className='flex-1 max-w-7xl mx-auto px-6 py-16 w-full'>
        <form
          onSubmit={handlePayment}
          className='grid grid-cols-1 lg:grid-cols-12 gap-16'
        >
          {/* LEFT: FORM DATA */}
          <div className='lg:col-span-7 space-y-12'>
            <header>
              <h1 className='text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4'>
                Checkout
              </h1>
              <div className='flex items-center gap-2 text-zinc-500'>
                <ShieldCheck
                  size={14}
                  className='text-pink-600'
                />
                <p className='text-[9px] uppercase font-black tracking-[0.3em]'>
                  Secure SSL Transaction
                </p>
              </div>
            </header>

            <BillingForm
              billingData={billingData}
              setBillingData={setBillingData}
            />

            <section className='pt-10 border-t border-white/5'>
              <div className='flex items-center gap-3 mb-8'>
                <Lock
                  className='text-pink-600'
                  size={20}
                />
                <h3 className='text-2xl font-black italic uppercase tracking-tighter'>
                  Payment Method
                </h3>
              </div>

              <div className='bg-zinc-900/40 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative'>
                <div
                  id='card-element'
                  className='min-h-[90px] z-10 relative'
                />

                {!isInitialized && (
                  <div className='absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 rounded-[2.5rem] z-20'>
                    <Loader2
                      className='animate-spin text-pink-600 mb-2'
                      size={24}
                    />
                    <span className='text-[10px] font-black uppercase tracking-widest text-zinc-500'>
                      Authorizing Gateway...
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT: STICKY SUMMARY */}
          <div className='lg:col-span-5'>
            <div className='sticky top-24 bg-zinc-900/50 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/5 shadow-2xl'>
              <h2 className='text-xs uppercase font-black tracking-[0.3em] text-zinc-500 mb-10 border-b border-white/5 pb-4'>
                Bag Summary
              </h2>

              <div className='space-y-6 mb-10 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar'>
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    className='flex justify-between items-start'
                  >
                    <div className='max-w-[70%]'>
                      <p className='text-sm font-black italic uppercase tracking-tight'>
                        {item.title}
                      </p>
                      <p className='text-[10px] text-zinc-600 uppercase font-bold tracking-widest'>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className='text-sm font-black text-white'>
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className='space-y-4 pt-8 border-t border-white/5'>
                <div className='flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500'>
                  <span>Subtotal</span>
                  <span className='text-white'>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500'>
                  <span>HST (13%)</span>
                  <span className='text-white'>${tax.toFixed(2)}</span>
                </div>

                <div className='flex justify-between items-end pt-10'>
                  <span className='text-xs font-black italic uppercase text-zinc-400'>
                    Total Due
                  </span>
                  <span className='text-5xl font-black text-pink-600 italic tracking-tighter leading-none'>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type='submit'
                disabled={loading || total <= 0 || !isInitialized}
                className='group w-full mt-12 py-6 bg-white text-black rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-pink-600 hover:text-white transition-all duration-500 active:scale-95 shadow-2xl flex items-center justify-center gap-3 disabled:opacity-20'
              >
                {loading ? (
                  <Loader2
                    className='animate-spin'
                    size={20}
                  />
                ) : (
                  <>
                    Confirm Payment <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
