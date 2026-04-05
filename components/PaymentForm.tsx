"use client";
import {
  CreditCard,
  PaymentForm as SquareProvider,
} from "react-square-web-payments-sdk";

export default function PaymentForm({ amount, handlePayment }: any) {
  return (
    <SquareProvider
      applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!}
      locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!}
      cardTokenizeResponseReceived={handlePayment}
    >
      <CreditCard
        buttonProps={{
          /* your styles here */
          content: `Pay $${amount}.00`,
        }}
      />
    </SquareProvider>
  );
}
