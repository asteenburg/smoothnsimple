"use client";

import { useState, useRef, useEffect } from "react";
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

  // Pricing Logic
  const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  const initializeSquare = async () => {
    // Prevent re-init if reference exists
    if (cardInstanceRef.current) return;

    const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

    if (!window.Square || !appId || !locationId) return;

    const container = document.getElementById("card-element");
    
    // CRITICAL: Prevent double injection if container already has children
    if (!container || container.childNodes.length > 0) return;

    try {
      const payments = window.Square.payments(appId, locationId);
      const card = await payments.card();
      
      // Final check before attaching
      if (container.childNodes.length === 0) {
        await card.attach("#card-element");
        cardInstanceRef.current = card;
        setIsInitialized(true);
      }
    } catch (err) {
      console.error("Square initialization failed:", err);
    }
  };

  // Handle soft-navigation initialization
  useEffect(() => {
    if (window.Square) {
      initializeSquare();
    }
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardInstanceRef.current || loading || total <= 0) return;

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
        alert(result.errors[0].message);
      }
    } catch (err) {
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Script 
        src="https://web.squarecdn.com/v1/square.js" 
        strategy="afterInteractive" 
        onLoad={initializeSquare} 
      />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full">
        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Billing and Payment Form */}
          <div className="lg:col-span-7 space-y-12">
            <header>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">Checkout</h1>
              <div className="flex items-center gap-2 text-zinc-500">
                <ShieldCheck size={14} className="text-pink-600" />
                <p className="text-[9px] uppercase font-black tracking-[0.3em]">Secure SSL Transaction</p>
              </div>
            </header>

            <BillingForm billingData={billingData} setBillingData={setBillingData} />

            <section className="pt-10 border-t border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <Lock className="text-pink-600" size={20} />
                <h3 className="text-2xl font-black italic uppercase">Payment Method</h3>
              </div>

              <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-white/5 relative min-h-[120px]">
                <div id="card-element" />
                {!isInitialized && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 rounded-[2.5rem]">
                    <Loader2 className="animate-spin text-pink-600 mb-2" size={24} />
                    <span className="text-[10px] uppercase text-zinc-500">Initializing Secure Terminal...</span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-zinc-900/50 rounded-[3rem] p-10 border border-white/5">
              <h2 className="text-xs uppercase text-zinc-500 mb-8 border-b border-white/5 pb-4 font-black tracking-widest">Order Summary</h2>
              <div className="space-y-6 mb-10">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-black uppercase italic tracking-tight">{item.title}</p>
                      <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-black italic">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/5 pt-6">
                <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-zinc-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-zinc-500">
                  <span>HST (13%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-black italic pt-4">
                  <span>Total</span>
                  <span className="text-pink-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isInitialized || loading || cart.length === 0}
                className="w-full mt-10 py-6 bg-white text-black rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-pink-600 hover:text-white transition-all disabled:opacity-20"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <>Pay Now <ChevronRight size={14} /></>}
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
