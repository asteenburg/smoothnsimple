import {
  SquareClient as Client,
  SquareEnvironment as Environment,
} from "square";
import { NextResponse } from "next/server";

const client = new Client({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production,
});

export async function POST(request: Request) {
  try {
    const { sourceId, amount, type, billing } = await request.json();

    // In v34+, the method returns a direct response object.
    // We destructure 'payment' (the actual transaction data) from it.
    const { payment } = await client.payments.create({
      sourceId,
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: BigInt(Math.round(amount * 100)),
        currency: "CAD",
      },
      billingAddress: {
        addressLine1: billing.address,
        administrativeDistrictLevel1: billing.province,
        postalCode: billing.postalCode.toUpperCase().replace(/\s/g, ""),
        country: "CA",
        firstName: billing.firstName,
        lastName: billing.lastName,
      },
      buyerEmailAddress: billing.email,
      note:
        type === "gift_card"
          ? `Gift Card for ${billing.recipientEmail}`
          : `Service Prepay: ${billing.firstName} ${billing.lastName}`,
    });

    // Square objects contain BigInts (like 'amountMoney.amount').
    // Next.js 'NextResponse.json' will throw an error if we don't stringify them first.
    const safeResponse = JSON.parse(
      JSON.stringify(payment, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );

    return NextResponse.json({ success: true, payment: safeResponse });
  } catch (error: any) {
    // Standard Square SDK error handling for v34+
    console.error("Square API Error:", error);

    // If Square returns a validation/auth error, it's in the 'errors' array
    const detail = error.errors
      ? error.errors[0].detail
      : "Payment processing failed";

    return NextResponse.json(
      { success: false, error: detail },
      { status: 400 },
    );
  }
}
