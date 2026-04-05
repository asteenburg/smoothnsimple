"use client";

import { useState, useEffect } from "react";
import PaymentForm from "../../components/PaymentForm";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

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

    setStatus("Processing...");

    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: tokenResult.token,
          amount,
          type: purchaseType,
          billing: formData,
        }),
      });

      const data = await res.json();
      if (data.success) setStatus("SUCCESS! Transaction complete.");
      else setStatus(data.error || "Payment failed.");
    } catch {
      setStatus("Connection error.");
    }
  };

  if (!isMounted) return null;

  return (
    <div className='min-h-screen bg-black text-white selection:bg-pink-500/30'>
      <Header />
      <main className='max-w-5xl mx-auto py-12 px-6'>
        {/* Title */}
        <div
          className='text-center mb-16'
          data-aos='fade-down'
        >
          <h1 className='text-3xl md:text-5xl tracking-tighter uppercase mb-4 italic'>
            Shopping Cart
          </h1>
          <div className='h-1 w-24 bg-pink-600 mx-auto rounded-full'></div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          {/* Left Column */}
          <div
            className='lg:col-span-7 space-y-12'
            data-aos='fade-right'
          >
            {/* Service Selection */}
            <section>
              <h2 className='text-2xl font-black uppercase italic mb-6'>
                Gift Card
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {(["gift_card"] as const).map((type) => (
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

            {/* Amount Selection */}
            <section>
              <h2 className='text-2xl font-black uppercase italic mb-6'>
                Select Amount
              </h2>
              <div className='grid grid-cols-4 gap-3'>
                {[50, 100, 200, 500].map((val) => (
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

            {/* Billing Form */}
            <section className='bg-zinc-900/30 p-8 rounded-[2rem] border border-zinc-900'>
              <h2 className='text-2xl font-black uppercase italic mb-8'>
                Billing Details
              </h2>
              <div className='grid md:grid-cols-2 gap-6'>
                {[
                  {
                    label: "First Name *",
                    name: "firstName",
                    type: "text",
                    placeholder: "Jane",
                  },
                  {
                    label: "Last Name *",
                    name: "lastName",
                    type: "text",
                    placeholder: "Doe",
                  },
                  {
                    label: "Street Address *",
                    name: "address",
                    type: "text",
                    placeholder: "123 Smooth St",
                    span: 2,
                  },
                  {
                    label: "Email Address *",
                    name: "email",
                    type: "email",
                    placeholder: "jane@example.com",
                    span: 2,
                  },
                  {
                    label: "Phone Number",
                    name: "phone",
                    type: "tel",
                    placeholder: "555-1234",
                  },

                  {
                    label: "Province",
                    name: "province",
                    type: "select",
                    options: [
                      "ON",
                      "QC",
                      "BC",
                      "AB",
                      "MB",
                      "SK",
                      "NS",
                      "NB",
                      "NL",
                      "PE",
                      "NT",
                      "YT",
                      "NU",
                    ],
                  },
                  {
                    label: "Postal Code *",
                    name: "postalCode",
                    type: "text",
                    placeholder: "A1B 2C3",
                  },
                ].map((field) => (
                  <div
                    key={field.name}
                    className={`md:col-span-${field.span || 1}`}
                  >
                    <label className='block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-2'>
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        onChange={handleInputChange}
                        className='w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-4 text-white outline-none transition-all'
                      >
                        {field.options!.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        onChange={handleInputChange}
                        className='w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-4 text-white outline-none transition-all'
                      />
                    )}
                  </div>
                ))}

                {purchaseType === "gift_card" && (
                  <div className='md:col-span-2 mt-4 p-6 bg-pink-600/10 border border-pink-600/20 rounded-2xl'>
                    <label className='block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-2'>
                      Recipient Email *
                    </label>
                    <input
                      name='recipientEmail'
                      type='email'
                      placeholder='who is this for?'
                      onChange={handleInputChange}
                      className='w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-4 text-white outline-none transition-all'
                    />
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Order & Payment */}
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

              <PaymentForm
                amount={amount}
                handlePayment={handlePayment}
              />

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
