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

  // --------------------------
  // Pricing
  // --------------------------
  const subtotal = cart.reduce(
    (acc, item: any) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  // --------------------------
  // Square Initialization (SAFE)
  // --------------------------
  const initializeSquare = async () => {
    // ✅ prevent duplicate init
    if (cardInstanceRef.current) return;

    const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

    if (!window.Square || !appId || !locationId) {
      console.error("Square not ready");
      return;
    }

    const container = document.getElementById("card-element");

    // ✅ prevent duplicate DOM injection
    if (!container || container.childNodes.length > 0) return;

    try {
      const payments = window.Square.payments(appId, locationId);
      const card = await payments.card();

      await card.attach("#card-element");

      cardInstanceRef.current = card;
      setIsInitialized(true);

      console.log("✅ Square initialized");
    } catch (err) {
      console.error("Square init error:", err);
    }
  };

  // --------------------------
  // Payment
  // --------------------------
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
          alert(data.error || "Payment failed");
        }
      } else {
        alert(result.errors?.[0]?.message || "Payment error");
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // JSX
  // --------------------------
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      {/* ✅ ONLY trigger */}
      <Script
        src="https://web.squarecdn.com/v1/square.js"
        strategy="afterInteractive"
        onLoad={initializeSquare}
      />

      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full">
        <form
          onSubmit={handlePayment}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16"
        >
          {/* LEFT */}
          <div className="lg:col-span-7 space-y-12">
            <header>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">
                Checkout
              </h1>

              <div className="flex items-center gap-2 text-zinc-500">
                <ShieldCheck size={14} className="text-pink-600" />
                <p className="text-[9px] uppercase font-black tracking-[0.3em]">
                  Secure SSL Transaction
                </p>
              </div>
            </header>

            <BillingForm
              billingData={billingData}
              setBillingData={setBillingData}
            />

            {/* PAYMENT */}
            <section className="pt-10 border-t border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <Lock className="text-pink-600" size={20} />
                <h3 className="text-2xl font-black italic uppercase">
                  Payment Method
                </h3>
              </div>

              <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-white/5 relative">
                <div id="card-element" className="min-h-[90px]" />

                {!isInitialized && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 rounded-[2.5rem]">
                    <Loader2 className="animate-spin text-pink-600 mb-2" size={24} />
                    <span className="text-[10px] uppercase text-zinc-500">
                      Loading Secure Payment...
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-zinc-900/50 rounded-[3rem] p-10 border border-white/5">
              <h2 className="text-xs uppercase text-zinc-500 mb-10 border-b pb-4">
                Bag Summary
              </h2>

              <div className="space-y-6 mb-10">
                {cart.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase">
                        {item.title}
                      </p>
                      <p className="text-xs text-zinc-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>HST</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-xl font-bold pt-4">
                  <span>Total</span>
                  <span className="text-pink-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isInitialized || loading}
                className="w-full mt-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-pink-600 hover:text-white transition disabled:opacity-30 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Pay Now <ChevronRight size={18} />
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
