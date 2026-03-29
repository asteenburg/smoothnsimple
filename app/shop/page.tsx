"use client";

import { useState, useEffect } from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Shop() {
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState(100);
  const [purchaseType, setPurchaseType] = useState("gift_card"); // 'gift_card' or 'prepay'
  const [recipientEmail, setRecipientEmail] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handlePayment = async (token: any) => {
    if (purchaseType === "gift_card" && !recipientEmail) {
      setStatus("Please enter a recipient email address.");
      return;
    }

    setStatus("Processing secure payment...");

    try {
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: token.token,
          amount: amount,
          type: purchaseType,
          recipient: recipientEmail, // This sends the email to your backend
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus(
          `Success! Your ${purchaseType === "gift_card" ? "Gift Card" : "Prepayment"} has been processed.`,
        );
        setRecipientEmail(""); // Clear form on success
      } else {
        setStatus("Payment failed. Please check your card details.");
      }
    } catch (error) {
      setStatus("Error connecting to Square. Please try again.");
    }
  };

  return (
    <div className='min-h-screen bg-black text-white selection:bg-pink-500/30'>
      <Header />

      <main className='max-w-5xl mx-auto py-12 px-6'>
        <div
          className='text-center mb-12'
          data-aos='fade-down'
        >
          <h1 className='text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4'>
            Shop <span className='text-pink-600'>Smooth & Simple</span>
          </h1>
          <p className='text-zinc-500 uppercase tracking-widest text-xs font-bold'>
            Secure Square Checkout
          </p>
        </div>

        {/* 1. SELECTION TABS */}
        <div
          className='flex flex-col md:flex-row gap-4 mb-12'
          data-aos='fade-up'
        >
          <button
            onClick={() => setPurchaseType("gift_card")}
            className={`flex-1 p-6 rounded-3xl border-2 transition-all text-left group ${
              purchaseType === "gift_card"
                ? "border-pink-600 bg-pink-600/10 shadow-[0_0_30px_rgba(219,39,119,0.1)]"
                : "border-zinc-800 bg-zinc-900"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-1 ${purchaseType === "gift_card" ? "text-pink-500" : "text-white"}`}
            >
              Digital Gift Card
            </h3>
            <p className='text-sm text-gray-400'>
              Perfect for birthdays or special surprises.
            </p>
          </button>

          <button
            onClick={() => setPurchaseType("prepay")}
            className={`flex-1 p-6 rounded-3xl border-2 transition-all text-left ${
              purchaseType === "prepay"
                ? "border-pink-600 bg-pink-600/10 shadow-[0_0_30px_rgba(219,39,119,0.1)]"
                : "border-zinc-800 bg-zinc-900"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-1 ${purchaseType === "prepay" ? "text-pink-500" : "text-white"}`}
            >
              Prepay Service
            </h3>
            <p className='text-sm text-gray-400'>
              Apply credit directly to your patient profile.
            </p>
          </button>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
          {/* 2. CONFIGURATION COLUMN */}
          <div
            className='space-y-8'
            data-aos='fade-right'
          >
            <div>
              <h2 className='text-2xl font-bold mb-6 italic uppercase tracking-tight'>
                1. Choose Amount
              </h2>
              <div className='grid grid-cols-2 gap-4'>
                {[50, 100, 200, 500].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-5 rounded-2xl font-black text-xl transition-all border-2 ${
                      amount === val
                        ? "bg-pink-600 border-pink-600 text-white"
                        : "bg-zinc-900 border-zinc-800 text-gray-500 hover:border-zinc-700"
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>

            {/* CONDITIONAL RECIPIENT FIELD */}
            {purchaseType === "gift_card" && (
              <div className='animate-in fade-in slide-in-from-left-4'>
                <h2 className='text-2xl font-bold mb-4 italic uppercase tracking-tight'>
                  2. Recipient Details
                </h2>
                <input
                  type='email'
                  placeholder='Recipient Email Address'
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className='w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-4 text-white focus:border-pink-600 outline-none transition-all'
                  required
                />
              </div>
            )}
          </div>

          {/* 3. SQUARE PAYMENT COLUMN */}
          <div
            className='bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl'
            data-aos='fade-left'
          >
            <div className='mb-8'>
              <h2 className='text-black text-2xl font-black uppercase tracking-tight'>
                Checkout
              </h2>
              <p className='text-gray-500 font-medium'>
                Total:{" "}
                <span className='text-black font-bold'>${amount}.00 CAD</span>
              </p>
            </div>

            <PaymentForm
              applicationId='YOUR_APP_ID'
              locationId='YOUR_LOCATION_ID'
              cardTokenizeResponseReceived={handlePayment}
            >
              <CreditCard
                buttonProps={{
                  css: {
                    backgroundColor: "#db2777",
                    color: "#fff",
                    borderRadius: "9999px",
                    padding: "18px",
                    fontWeight: "900",
                    width: "100%",
                    cursor: "pointer",
                    border: "none",
                    marginTop: "20px",
                    boxShadow: "0 10px 15px -3px rgba(219, 39, 119, 0.4)",
                    "&:hover": { backgroundColor: "#be185d" },
                  },
                }}
              />
            </PaymentForm>

            {status && (
              <div
                className={`mt-6 text-center text-sm font-bold p-4 rounded-xl ${
                  status.includes("Success")
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : "bg-zinc-100 text-zinc-800"
                }`}
              >
                {status}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
