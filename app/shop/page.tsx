// shop/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  CreditCard,
  PaymentForm as SquareProvider,
} from "react-square-web-payments-sdk";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Shop() {
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState(100);
  const [purchaseType, setPurchaseType] = useState<"gift_card" | "prepay">(
    "gift_card",
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    province: "ON",
    postalCode: "",
    phone: "",
    recipientEmail: "",
  });

  const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || "";
  const locId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || "";

  useEffect(() => {
    setIsMounted(true);
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = async (tokenResult: any) => {
    if (!formData.email || !formData.address || !formData.postalCode) {
      setStatus("Missing required billing info.");
      return;
    }

    if (tokenResult.status !== "OK") {
      setStatus("Card invalid. Check details.");
      return;
    }

    setStatus("Processing payment...");

    try {
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: tokenResult.token,
          amount,
          type: purchaseType,
          billing: formData, // your backend handles this
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("✅ Payment SUCCESS!");
      } else {
        setStatus(data.error || "Payment failed.");
      }
    } catch (err) {
      setStatus("Connection error.");
    }
  };

  if (!isMounted) return null;

  const inputStyle =
    "w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-4 text-white focus:border-pink-600 outline-none transition-all placeholder:text-zinc-600";
  const labelStyle =
    "block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-2";

  return (
    <div className='min-h-screen bg-black text-white selection:bg-pink-500/30'>
      <Header />

      <main className='max-w-6xl mx-auto py-12 px-6'>
        {/* Title */}
        <div
          className='text-center mb-16'
          data-aos='fade-down'
        >
          <h1 className='text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 italic'>
            Checkout <span className='text-pink-600'>Center</span>
          </h1>
          <div className='h-1 w-24 bg-pink-600 mx-auto rounded-full'></div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          {/* Left Column: Selection & Billing */}
          <div
            className='lg:col-span-7 space-y-12'
            data-aos='fade-right'
          >
            {/* 01. Selection */}
            <section>
              <h2 className='text-2xl font-black uppercase italic mb-6'>
                01. Select Service
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {(["gift_card", "prepay"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPurchaseType(type)}
                    className={`p-6 rounded-3xl border-2 transition-all text-left ${
                      purchaseType === type
                        ? "border-pink-600 bg-pink-600/5 shadow-lg"
                        : "border-zinc-900 bg-zinc-900/50 hover:border-zinc-800"
                    }`}
                  >
                    <span
                      className={`text-lg font-bold uppercase ${
                        purchaseType === type ? "text-pink-500" : "text-white"
                      }`}
                    >
                      {type.replace("_", " ")}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* 02. Amount */}
            <section>
              <h2 className='text-2xl font-black uppercase italic mb-6'>
                02. Select Amount
              </h2>
              <div className='grid grid-cols-4 gap-3'>
                {[1, 100, 200, 500].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-4 rounded-xl font-black transition-all border-2 ${
                      amount === val
                        ? "bg-pink-600 border-pink-600"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </section>

            {/* 03. Billing */}
            <section className='bg-zinc-900/30 p-8 rounded-[2rem] border border-zinc-900'>
              <h2 className='text-2xl font-black uppercase italic mb-8'>
                03. Billing Details
              </h2>
              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <label className={labelStyle}>First Name *</label>
                  <input
                    name='firstName'
                    placeholder='Jane'
                    onChange={handleInputChange}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Last Name *</label>
                  <input
                    name='lastName'
                    placeholder='Doe'
                    onChange={handleInputChange}
                    className={inputStyle}
                  />
                </div>
                <div className='md:col-span-2'>
                  <label className={labelStyle}>Email Address *</label>
                  <input
                    name='email'
                    type='email'
                    placeholder='jane@example.com'
                    onChange={handleInputChange}
                    className={inputStyle}
                  />
                </div>
                <div className='md:col-span-2'>
                  <label className={labelStyle}>Street Address *</label>
                  <input
                    name='address'
                    placeholder='123 Smooth St'
                    onChange={handleInputChange}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Province</label>
                  <select
                    name='province'
                    onChange={handleInputChange}
                    className={inputStyle}
                  >
                    <option value='ON'>Ontario</option>
                    <option value='QC'>Quebec</option>
                    <option value='BC'>British Columbia</option>
                    <option value='AB'>Alberta</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Postal Code *</label>
                  <input
                    name='postalCode'
                    placeholder='A1B 2C3'
                    onChange={handleInputChange}
                    className={inputStyle}
                  />
                </div>

                {purchaseType === "gift_card" && (
                  <div className='md:col-span-2 mt-4 p-6 bg-pink-600/10 border border-pink-600/20 rounded-2xl'>
                    <label className={labelStyle}>Recipient Email *</label>
                    <input
                      name='recipientEmail'
                      type='email'
                      placeholder='Who is this for?'
                      onChange={handleInputChange}
                      className={inputStyle}
                    />
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary & Square */}
          <div className='lg:col-span-5'>
            <div
              className='sticky top-8 bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl text-black'
              data-aos='fade-left'
            >
              <h2 className='text-3xl font-black mb-6 italic uppercase tracking-tighter'>
                Order Summary
              </h2>
              <div className='flex justify-between mb-8 border-b border-zinc-100 pb-4'>
                <span className='font-bold text-zinc-400'>TOTAL:</span>
                <span className='font-black text-2xl'>
                  ${amount}.00 <span className='text-xs'>CAD</span>
                </span>
              </div>

              {appId && locId ? (
                <SquareProvider
                  applicationId={appId}
                  locationId={locId}
                  cardTokenizeResponseReceived={handlePayment}
                >
                  <CreditCard
                    buttonProps={{
                      css: {
                        backgroundColor: "#db2777",
                        color: "#fff",
                        borderRadius: "1.25rem",
                        padding: "20px",
                        fontWeight: "900",
                        width: "100%",
                        cursor: "pointer",
                        border: "none",
                        fontSize: "1rem",
                        textTransform: "uppercase",
                        "&:hover": { backgroundColor: "#be185d" },
                      },
                      content: `Pay $${amount}.00`,
                    }}
                  />
                </SquareProvider>
              ) : (
                <div className='text-center p-4 bg-zinc-100 rounded-2xl text-zinc-400 text-xs font-bold animate-pulse'>
                  CONFIGURING SECURE GATEWAY...
                </div>
              )}

              {status && (
                <div
                  className={`mt-6 p-4 rounded-xl text-center text-xs font-black uppercase tracking-widest ${
                    status.includes("SUCCESS")
                      ? "bg-green-100 text-green-700"
                      : "bg-zinc-100 text-zinc-900"
                  }`}
                >
                  {status}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
