"use client";

import { useState, useEffect } from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.address.trim() ||
      !formData.postalCode.trim()
    ) {
      setStatus("Please fill in all required billing fields.");
      return false;
    }
    if (purchaseType === "gift_card" && !formData.recipientEmail.trim()) {
      setStatus("Please enter a recipient email.");
      return false;
    }
    return true;
  };

  const handlePayment = async (tokenResult: any) => {
    const data = await response.json();

    if (data.success) {
      setStatus("Success! Transaction complete.");
    } else {
      // ⚠️ This will change "Payment failed" to the SPECIFIC reason (e.g., "Invalid Postal Code")
      setStatus(data.error || "Payment failed.");
      console.error("SQUARE_ERROR_DETAILS:", data.error);
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
          billing: formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Success! Transaction complete.");
      } else {
        setStatus(data.error || "Payment failed.");
      }
    } catch (error) {
      setStatus("Error connecting to payment server.");
    }
  };

  const inputStyle =
    "w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-4 text-white focus:border-pink-600 outline-none transition-all placeholder:text-zinc-600";
  const labelStyle =
    "block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-2";

  if (!isMounted) return null;

  return (
    <div className='min-h-screen bg-black text-white'>
      <Header />
      <main className='max-w-6xl mx-auto py-12 px-6'>
        <div
          className='text-center mb-16'
          data-aos='fade-down'
        >
          <h1 className='text-5xl md:text-7xl font-black uppercase italic italic'>
            Checkout <span className='text-pink-600'>Center</span>
          </h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div
            className='lg:col-span-7 space-y-12'
            data-aos='fade-right'
          >
            {/* Service Selection */}
            <section>
              <h2 className='text-2xl font-black uppercase italic mb-6 text-pink-600'>
                01. Service
              </h2>
              <div className='grid grid-cols-2 gap-4'>
                {["gift_card", "prepay"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPurchaseType(type as any)}
                    className={`p-6 rounded-3xl border-2 transition-all ${purchaseType === type ? "border-pink-600 bg-pink-600/10" : "border-zinc-900 bg-zinc-900"}`}
                  >
                    <span className='font-bold uppercase'>
                      {type.replace("_", " ")}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Amount Selection */}
            <section>
              <h2 className='text-2xl font-black uppercase italic mb-6 text-pink-600'>
                02. Amount
              </h2>
              <div className='grid grid-cols-4 gap-3'>
                {[1, 100, 200, 500].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-4 rounded-xl font-black border-2 ${amount === val ? "bg-pink-600 border-pink-600" : "bg-zinc-900 border-zinc-800 text-zinc-500"}`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </section>

            {/* Billing Form */}
            <section className='bg-zinc-900/30 p-8 rounded-[2rem] border border-zinc-900'>
              <h2 className='text-2xl font-black uppercase italic mb-8'>
                03. Details
              </h2>
              <div className='grid md:grid-cols-2 gap-6'>
                <input
                  name='firstName'
                  onChange={handleInputChange}
                  placeholder='First Name *'
                  className={inputStyle}
                />
                <input
                  name='lastName'
                  onChange={handleInputChange}
                  placeholder='Last Name *'
                  className={inputStyle}
                />
                <input
                  name='email'
                  onChange={handleInputChange}
                  placeholder='Email *'
                  className={`${inputStyle} md:col-span-2`}
                />
                <input
                  name='address'
                  onChange={handleInputChange}
                  placeholder='Address *'
                  className={`${inputStyle} md:col-span-2`}
                />
                <input
                  name='postalCode'
                  onChange={handleInputChange}
                  placeholder='Postal Code *'
                  className={inputStyle}
                />
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
                {purchaseType === "gift_card" && (
                  <input
                    name='recipientEmail'
                    onChange={handleInputChange}
                    placeholder='Recipient Email *'
                    className={`${inputStyle} md:col-span-2 border-pink-600/30`}
                  />
                )}
              </div>
            </section>
          </div>

          {/* Checkout Column */}
          <div className='lg:col-span-5'>
            <div className='sticky top-8 bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl text-black'>
              <h2 className='text-3xl font-black mb-6 italic uppercase'>
                Summary
              </h2>
              <div className='flex justify-between mb-8 border-b pb-4'>
                <span className='font-bold text-zinc-400 uppercase text-sm'>
                  Total Due
                </span>
                <span className='font-black text-xl'>${amount}.00 CAD</span>
              </div>

              {appId && locId ? (
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
                        borderRadius: "1rem",
                        padding: "18px",
                        fontWeight: "900",
                        width: "100%",
                        cursor: "pointer",
                        border: "none",
                        marginTop: "10px",
                      },
                    }}
                  />
                </PaymentForm>
              ) : (
                <div className='text-red-500 font-bold text-center'>
                  Missing Credentials
                </div>
              )}

              {status && (
                <div
                  className={`mt-6 p-4 rounded-xl text-center text-xs font-bold uppercase ${status.includes("Success") ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-900"}`}
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
