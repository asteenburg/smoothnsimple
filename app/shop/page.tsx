"use client";

import { useState, useEffect } from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// 1. Define strict types for your billing data
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  province: string;
  postalCode: string;
  phone: string;
  recipientEmail: string;
};

export default function Shop() {
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState(100);
  const [purchaseType, setPurchaseType] = useState<"gift_card" | "prepay">(
    "gift_card",
  );

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    province: "ON",
    postalCode: "",
    phone: "",
    recipientEmail: "",
  });

  // Environment Variables
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

  const validateForm = () => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "address",
      "postalCode",
    ];
    const isMissingFields = required.some(
      (field) => !formData[field as keyof FormData].trim(),
    );

    if (isMissingFields) {
      setStatus("Please fill in all required billing fields.");
      return false;
    }
    if (purchaseType === "gift_card" && !formData.recipientEmail.trim()) {
      setStatus("Recipient email is required for Gift Cards.");
      return false;
    }
    return true;
  };

  const handlePayment = async (tokenResult: any) => {
    if (!validateForm()) return;

    if (tokenResult.status !== "OK") {
      setStatus("Payment validation failed. Please check your card.");
      return;
    }

    setStatus("Processing secure payment...");

    try {
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: tokenResult.token,
          amount,
          type: purchaseType,
          billing: {
            ...formData,
            postalCode: formData.postalCode.toUpperCase().replace(/\s/g, ""),
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("SUCCESS! Your payment has been processed.");
      } else {
        setStatus(data.error || "Payment failed. Please try again.");
      }
    } catch (error) {
      setStatus("Server error. Please check your connection.");
    }
  };

  const inputStyle =
    "w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-4 text-white focus:border-pink-600 outline-none transition-all placeholder:text-zinc-600";
  const labelStyle =
    "block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-2";

  return (
    <div className='min-h-screen bg-black text-white selection:bg-pink-500/30'>
      <Header />

      <main className='max-w-6xl mx-auto py-12 px-6'>
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
          {/* LEFT: Configuration & Billing */}
          <div
            className='lg:col-span-7 space-y-12'
            data-aos='fade-right'
          >
            <section>
              <h2 className='text-2xl font-black uppercase italic mb-6'>
                01. Service Type
              </h2>
              <div className='grid grid-cols-2 gap-4'>
                {(["gift_card", "prepay"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPurchaseType(type)}
                    className={`p-6 rounded-3xl border-2 transition-all text-left ${
                      purchaseType === type
                        ? "border-pink-600 bg-pink-600/5"
                        : "border-zinc-900 bg-zinc-900/50 hover:border-zinc-800"
                    }`}
                  >
                    <span
                      className={`text-lg font-bold uppercase ${purchaseType === type ? "text-pink-500" : "text-zinc-500"}`}
                    >
                      {type.replace("_", " ")}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-black uppercase italic mb-6'>
                02. Select Amount
              </h2>
              <div className='grid grid-cols-4 gap-3'>
                {[50, 100, 200, 500].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-4 rounded-xl font-black border-2 transition-all ${
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

            <section className='bg-zinc-900/30 p-8 rounded-[2rem] border border-zinc-900'>
              <h2 className='text-2xl font-black uppercase italic mb-8'>
                03. Billing Details
              </h2>
              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <label className={labelStyle}>First Name *</label>
                  <input
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder='Jane'
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Last Name *</label>
                  <input
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder='Doe'
                    className={inputStyle}
                  />
                </div>
                <div className='md:col-span-2'>
                  <label className={labelStyle}>Email Address *</label>
                  <input
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder='jane@example.com'
                    className={inputStyle}
                  />
                </div>
                <div className='md:col-span-2'>
                  <label className={labelStyle}>Street Address *</label>
                  <input
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder='123 Smooth Ave'
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Province</label>
                  <select
                    name='province'
                    value={formData.province}
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
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder='A1B 2C3'
                    className={inputStyle}
                  />
                </div>

                {purchaseType === "gift_card" && (
                  <div className='md:col-span-2 p-6 bg-pink-600/10 rounded-2xl border border-pink-600/20'>
                    <label className={labelStyle}>
                      Recipient Email Address *
                    </label>
                    <input
                      name='recipientEmail'
                      type='email'
                      value={formData.recipientEmail}
                      onChange={handleInputChange}
                      placeholder='Who receives the card?'
                      className={inputStyle}
                    />
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT: Summary & Square */}
          <div className='lg:col-span-5'>
            <div
              className='sticky top-8 space-y-6'
              data-aos='fade-left'
            >
              <div className='bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl text-black'>
                <h2 className='text-3xl font-black uppercase italic mb-2'>
                  Summary
                </h2>
                <p className='text-zinc-400 font-bold text-xs tracking-widest uppercase mb-8'>
                  Production Checkout
                </p>

                <div className='flex justify-between mb-8 pb-6 border-b border-zinc-100'>
                  <span className='font-bold text-zinc-500'>Amount Due:</span>
                  <span className='font-black text-2xl'>
                    ${amount}.00 <span className='text-sm'>CAD</span>
                  </span>
                </div>

                {/* The "isMounted" check prevents the SDK from crashing before IDs load */}
                {isMounted && appId && locId ? (
                  <PaymentForm
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
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "#be185d",
                            transform: "translateY(-2px)",
                          },
                        },
                      }}
                    />
                  </PaymentForm>
                ) : (
                  <div className='p-8 text-center bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200'>
                    <p className='text-zinc-400 font-bold text-xs animate-pulse uppercase'>
                      Initializing Square...
                    </p>
                  </div>
                )}

                {status && (
                  <div
                    className={`mt-8 p-4 rounded-2xl text-center text-xs font-black uppercase tracking-tighter ${
                      status.includes("SUCCESS")
                        ? "bg-green-100 text-green-700"
                        : "bg-zinc-100 text-zinc-800"
                    }`}
                  >
                    {status}
                  </div>
                )}
              </div>
              <p className='text-center text-[10px] text-zinc-600 uppercase tracking-widest font-bold'>
                100% Secure &bull; Encrypted &bull; Smooth N Simple
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
