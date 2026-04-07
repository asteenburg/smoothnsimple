"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BillingForm from "./BillingForm";
import Script from "next/script";
import { Lock, ChevronRight, Loader2 } from "lucide-react";

declare global {
  interface Window {
    Square: any;
  }
}

export default function CheckoutPage() {
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

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const total = (subtotal * 1.13).toFixed(2);

  const initializeSquare = async () => {
    // If already initialized or script not loaded, exit
    if (cardInstanceRef.current || !window.Square) return;

    try {
      // Ensure these match your PRODUCTION keys in Vercel
      const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
      const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

      if (!appId || !locationId) {
        console.error("Missing Square Production Keys in Environment");
        return;
      }

      const payments = window.Square.payments(appId, locationId);
      const card = await payments.card();

      const container = document.getElementById("card-element");
      if (container && container.childNodes.length === 0) {
        await card.attach("#card-element");
        cardInstanceRef.current = card;
        setIsInitialized(true);
      }
    } catch (err) {
      console.error("Square Initialization Failed:", err);
    }
  };

  useEffect(() => {
    if (window.Square) {
      initializeSquare();
    }
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardInstanceRef.current || loading) return;
    setLoading(true);

    try {
      const result = await cardInstanceRef.current.tokenize();
      if (result.status === "OK") {
        const resp = await fetch("/api/pay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            total,
            sourceId: result.token,
            billing: billingData,
          }),
        });

        const data = await resp.json();

        if (data.success) {
          window.location.href = "/success";
        } else {
          // This will now show the actual Square Production error
          alert(`Payment Failed: ${data.error}`);
        }
      } else {
        alert(result.errors[0].message);
      }
    } catch (err) {
      alert("A system error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-black min-h-screen text-white flex flex-col font-sans'>
      <Script
        src='https://web.squarecdn.com/v1/square.js'
        strategy='afterInteractive'
        onLoad={initializeSquare}
      />
      <Header />

      <main className='flex-1 max-w-7xl mx-auto px-6 py-16 w-full'>
        <form
          onSubmit={handlePayment}
          className='grid grid-cols-1 lg:grid-cols-12 gap-16'
        >
          {/* Left Column: Billing & Payment */}
          <div className='lg:col-span-7 space-y-12'>
            <h1 className='text-5xl md:text-7xl font-black italic uppercase tracking-tighter'>
              Checkout
            </h1>

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
                <h3 className='text-2xl font-black italic uppercase'>
                  Secure Payment
                </h3>
              </div>

              <div className='bg-zinc-900/40 p-8 rounded-[2.5rem] border border-white/5 relative min-h-[120px]'>
                <div
                  id='card-element'
                  className='w-full'
                />
                {!isInitialized && (
                  <div className='absolute inset-0 flex items-center justify-center bg-zinc-900/90 rounded-[2.5rem] z-10'>
                    <Loader2 className='animate-spin text-pink-600 mr-2' />
                    <span className='text-[10px] uppercase font-black tracking-widest'>
                      Initializing Production Secure Vault...
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Summary */}
          <div className='lg:col-span-5'>
            <div className='sticky top-24 bg-zinc-900/50 rounded-[3rem] p-10 border border-white/5'>
              <div className='space-y-4 mb-10'>
                <div className='flex justify-between text-zinc-400 uppercase text-[10px] font-black tracking-widest'>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-zinc-400 uppercase text-[10px] font-black tracking-widest'>
                  <span>HST (13%)</span>
                  <span>${(subtotal * 0.13).toFixed(2)}</span>
                </div>
                <div className='h-px bg-white/5 my-4' />
                <div className='flex justify-between text-2xl font-black italic text-pink-600'>
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <button
                type='submit'
                disabled={!isInitialized || loading}
                className='w-full py-6 bg-white text-black rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-pink-600 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed group'
              >
                {loading ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <>
                    Complete Purchase
                    <ChevronRight
                      size={14}
                      className='group-hover:translate-x-1 transition-transform'
                    />
                  </>
                )}
              </button>

              <p className='text-[8px] text-zinc-500 uppercase text-center mt-6 tracking-widest font-bold'>
                Payments processed securely via Square Production
              </p>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
