"use client";

import { useState, useEffect } from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
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

  useEffect(() => {
    setIsMounted(true);
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleInputChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = async (tokenResult: any) => {
    if (!formData.email || !formData.address || !formData.postalCode) {
      setStatus("Please fill in all required billing fields.");
      return;
    }

    if (tokenResult.status !== "OK") {
      setStatus("Card validation failed.");
      return;
    }

    setStatus("Processing...");

    try {
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: tokenResult.token,
          amount: amount,
          type: purchaseType,
          billing: formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Success! Payment complete.");
      } else {
        // This will now show the actual Square error (e.g. "Value too short")
        setStatus(data.error || "Payment failed.");
      }
    } catch (err) {
      setStatus("Error connecting to server.");
    }
  };

  if (!isMounted) return null;

  return (
    <div className='min-h-screen bg-black text-white'>
      <Header />
      <main className='max-w-6xl mx-auto py-12 px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          {/* Form Side */}
          <div className='lg:col-span-7 space-y-8'>
            <section className='bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800'>
              <h2 className='text-xl font-bold mb-6 italic uppercase text-pink-600'>
                Billing Details
              </h2>
              <div className='grid grid-cols-2 gap-4'>
                <input
                  name='firstName'
                  placeholder='First Name'
                  onChange={handleInputChange}
                  className='bg-black border border-zinc-800 p-4 rounded-xl'
                />
                <input
                  name='lastName'
                  placeholder='Last Name'
                  onChange={handleInputChange}
                  className='bg-black border border-zinc-800 p-4 rounded-xl'
                />
                <input
                  name='email'
                  placeholder='Email'
                  onChange={handleInputChange}
                  className='bg-black border border-zinc-800 p-4 rounded-xl col-span-2'
                />
                <input
                  name='address'
                  placeholder='Street Address'
                  onChange={handleInputChange}
                  className='bg-black border border-zinc-800 p-4 rounded-xl col-span-2'
                />
                <input
                  name='postalCode'
                  placeholder='Postal Code'
                  onChange={handleInputChange}
                  className='bg-black border border-zinc-800 p-4 rounded-xl'
                />
                <select
                  name='province'
                  onChange={handleInputChange}
                  className='bg-black border border-zinc-800 p-4 rounded-xl'
                >
                  <option value='ON'>Ontario</option>
                  <option value='QC'>Quebec</option>
                  <option value='BC'>British Columbia</option>
                </select>
                {purchaseType === "gift_card" && (
                  <input
                    name='recipientEmail'
                    placeholder='Recipient Email'
                    onChange={handleInputChange}
                    className='bg-black border border-pink-900 p-4 rounded-xl col-span-2'
                  />
                )}
              </div>
            </section>
          </div>

          {/* Payment Side */}
          <div className='lg:col-span-5'>
            <div className='bg-white p-8 rounded-[2rem] text-black shadow-xl sticky top-10'>
              <h3 className='text-2xl font-black mb-4'>Total: ${amount}.00</h3>
              <PaymentForm
                applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!}
                locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!}
                cardTokenizeResponseReceived={handlePayment}
              >
                <CreditCard
                  buttonProps={{
                    css: {
                      backgroundColor: "#db2777",
                      color: "#fff",
                      padding: "15px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      width: "100%",
                      cursor: "pointer",
                      border: "none",
                    },
                  }}
                />
              </PaymentForm>
              {status && (
                <p className='mt-4 text-center font-bold text-sm text-pink-600 uppercase tracking-tighter'>
                  {status}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
