"use client";

import {
  CreditCard,
  PaymentForm as SquareProvider,
} from "react-square-web-payments-sdk";

interface PaymentFormProps {
  amount: number;
  handlePayment: (tokenResult: any) => Promise<void>;
}

export default function PaymentForm({
  amount,
  handlePayment,
}: PaymentFormProps) {
  const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!;
  const locId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;

  return (
    <SquareProvider
      applicationId={appId}
      locationId={locId}
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
