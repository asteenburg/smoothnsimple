import { SquareClient, SquareEnvironment } from "square";
import { NextResponse } from "next/server";

const client = new SquareClient({
  // The new way to pass the key:
  token: process.env.SQUARE_ACCESS_TOKEN,
  // The new way to set environment:
  environment: SquareEnvironment.Production,
});

export async function POST(request: Request) {
  try {
    const { sourceId, amount, type, recipient } = await request.json();

    // Use a try-catch block specifically for the Square API call
    const response = await client.payments.create({
      sourceId,
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        // Square now handles the BigInt conversion internally in many cases,
        // but keeping it as a number or BigInt is safe here.
        amount: BigInt(amount * 100),
        currency: "CAD",
      },
      note:
        type === "gift_card"
          ? `Gift Card for ${recipient}`
          : "Service Prepayment",
    });

    return NextResponse.json({ success: true, result: response });
  } catch (error: any) {
    console.error("Square API Error:", error);

    // Improved error reporting for the new SDK structure
    return NextResponse.json(
      {
        success: false,
        error: error.errors ? error.errors[0].detail : "Payment Failed",
      },
      { status: 500 },
    );
  }
}
