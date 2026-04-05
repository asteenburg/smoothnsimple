"use client";

import {
  CreditCard,
  PaymentForm as SquareProvider,
} from "react-square-web-payments-sdk";

interface PaymentFormProps {
  amount: number;
  handlePayment: (tokenResult: any) => void;
}

export default function PaymentForm({
  amount,
  handlePayment,
}: PaymentFormProps) {
  return (
    <SquareProvider
      applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!}
      locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!}
      cardTokenizeResponseReceived={handlePayment}
    >
      <CreditCard
        buttonProps={{
          content: `Pay $${amount}.00`,
          style: {
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
          },
        }}
      />
    </SquareProvider>
  );
}
