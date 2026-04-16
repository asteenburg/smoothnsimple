"use client";

import { useState } from "react";

export default function RedeemBox() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleRedeem = async () => {
    const res = await fetch("/api/redeem", {
      method: "POST",
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    if (data.error) {
      setMessage(data.error);
    } else {
      setMessage("✅ 10% discount applied!");
    }
  };

  return (
    <div className='p-4 border rounded-lg'>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder='Enter discount code'
        className='border px-3 py-2 mr-2'
      />

      <button onClick={handleRedeem}>Apply</button>

      <p>{message}</p>
    </div>
  );
}
