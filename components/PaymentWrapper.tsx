"use client";

import dynamic from "next/dynamic";

const PaymentForm = dynamic(() => import("./PaymentForm"), { ssr: false });

export default function PaymentWrapper() {
  return <PaymentForm />;
}
