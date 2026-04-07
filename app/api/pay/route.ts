import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import crypto from "crypto";

const client = new SquareClient({
  token: process.env.SQUARE_TOKEN!,
  environment:
    process.env.SQUARE_ENV === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { total, sourceId, billing } = body;

    if (!sourceId) throw new Error("Card token missing");

    // Ensure we have a clean integer for cents
    // Example: 56.50 -> 5650
    const amountCents = BigInt(Math.round(parseFloat(total) * 100));

    // Process the payment
    const { result } = await client.paymentsApi.createPayment({
      idempotencyKey: crypto.randomUUID(), // New key for every single attempt
      sourceId: sourceId,
      amountMoney: {
        amount: amountCents,
        currency: "CAD",
      },
      buyerEmailAddress: billing?.email,
      note: "Smooth N Simple Web Purchase",
      shippingAddress: {
        addressLine1: billing?.addressLine1 || "",
        locality: billing?.city || "",
        administrativeDistrictLevel1: billing?.state || "",
        postalCode: billing?.postalCode || "",
        country: "CA",
      },
    });

    // Square returns BigInts which native JSON.stringify crashes on
    const responseData = JSON.parse(
      JSON.stringify(result.payment, (k, v) =>
        typeof v === "bigint" ? v.toString() : v,
      ),
    );

    return NextResponse.json({ success: true, payment: responseData });
  } catch (error: any) {
    // This logs the ACTUAL error from Square in your Vercel terminal
    console.error(
      "❌ SQUARE API REJECTION:",
      error.result?.errors || error.message,
    );

    const detail = error.result?.errors?.[0]?.detail || error.message;
    return NextResponse.json(
      { success: false, error: detail },
      { status: 500 },
    );
  }
}
