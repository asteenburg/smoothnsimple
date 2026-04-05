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
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
    if (!validateForm()) return;

    if (tokenResult.status !== "OK") {
      console.error(tokenResult.errors);
      setStatus("Card processing failed. Please check your details.");
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
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            address: formData.address.trim(),
            province: formData.province,
            postalCode: formData.postalCode.trim(),
            phone: formData.phone || undefined,
            recipientEmail:
              purchaseType === "gift_card"
                ? formData.recipientEmail.trim()
                : undefined,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Success! Transaction complete.");
      } else {
        setStatus(data.error || "Payment failed.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error connecting to payment server.");
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
        {/* HEADER */}
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
          {/* LEFT SIDE */}
          <div
            className='lg:col-span-7 space-y-12'
            data-aos='fade-right'
          >
            {/* TYPE */}
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
                        ? "border-pink-600 bg-pink-600/5"
                        : "border-zinc-900 bg-zinc-900/50"
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

            {/* AMOUNT */}
            <section>
              <h2 className='text-2xl font-black uppercase italic mb-6'>
                02. Select Amount
              </h2>
              <div className='grid grid-cols-4 gap-3'>
                {[1, 100, 200, 500].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-4 rounded-xl font-black border-2 ${
                      amount === val
                        ? "bg-pink-600 border-pink-600"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500"
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </section>

            {/* BILLING */}
            <section className='bg-zinc-900/30 p-8 rounded-[2rem] border border-zinc-900'>
              <h2 className='text-2xl font-black uppercase italic mb-8'>
                03. Billing Details
              </h2>

              <div className='grid md:grid-cols-2 gap-6'>
                <input
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder='First Name *'
                  className={inputStyle}
                />
                <input
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder='Last Name *'
                  className={inputStyle}
                />
                <input
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Email *'
                  className={inputStyle + " md:col-span-2"}
                />
                <input
                  name='address'
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder='Address *'
                  className={inputStyle + " md:col-span-2"}
                />
                <input
                  name='postalCode'
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder='Postal Code *'
                  className={inputStyle}
                />

                {purchaseType === "gift_card" && (
                  <input
                    name='recipientEmail'
                    value={formData.recipientEmail}
                    onChange={handleInputChange}
                    placeholder='Recipient Email *'
                    className={inputStyle + " md:col-span-2"}
                  />
                )}
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <div className='lg:col-span-5'>
            <div
              className='sticky top-8 space-y-6'
              data-aos='fade-left'
            >
              <div className='bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl text-black'>
                <h2 className='text-3xl font-black mb-6'>Summary</h2>
                <div className='flex justify-between mb-6 font-bold'>
                  <span>Total:</span>
                  <span>${amount}.00 CAD</span>
                </div>

                {appId && locId && (
                  <PaymentForm
                    applicationId={appId}
                    locationId={locId}
                    cardTokenizeResponseReceived={handlePayment}
                  >
                    <CreditCard />
                  </PaymentForm>
                )}

                {status && (
                  <div className='mt-6 text-center text-sm font-bold'>
                    {status}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
