"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PaymentForm from "../../components/PaymentForm";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    province: "ON",
    postalCode: "",
    phone: "",
    recipientEmail: "",
  });
  const [status, setStatus] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setBilling((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = async (tokenResult: any) => {
    if (!billing.email || !billing.address || !billing.postalCode) {
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
          amount: total,
          billing,
          items: cart,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("SUCCESS! Transaction complete.");
        clearCart();
      } else setStatus(data.error || "Payment failed.");
    } catch {
      setStatus("Connection error.");
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-black text-white'>
      <Header />
      <main className='max-w-5xl mx-auto px-6 py-12'>
        <h1 className='text-4xl font-bold mb-8 text-pink-500'>Checkout</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {/* BILLING FORM */}
            <div className='grid md:grid-cols-2 gap-6 mb-6'>
              {[
                { label: "First Name *", name: "firstName", type: "text" },
                { label: "Last Name *", name: "lastName", type: "text" },
                { label: "Email *", name: "email", type: "email" },
                { label: "Street Address *", name: "address", type: "text" },
                { label: "Phone", name: "phone", type: "tel" },
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
                { label: "Postal Code *", name: "postalCode", type: "text" },
                {
                  label: "Recipient Email",
                  name: "recipientEmail",
                  type: "email",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className='block text-xs font-bold uppercase text-zinc-500 mb-2'>
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      onChange={handleInputChange}
                      className='w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-4 text-white'
                    >
                      {field.options?.map((opt) => (
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
                      type={field.type}
                      name={field.name}
                      onChange={handleInputChange}
                      className='w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-4 text-white'
                    />
                  )}
                </div>
              ))}
            </div>

            {/* PAYMENT FORM */}
            <PaymentForm
              amount={total}
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
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
