import { SquareClient, SquareEnvironment } from "square";
import { NextResponse } from "next/server";

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment: SquareEnvironment.Production,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sourceId, amount, type, billing } = body;

    // Server-side console log to see what exactly arrived from the frontend
    console.log("Processing Payment for:", billing?.email);

    const { payment } = await client.payments.create({
      sourceId,
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: BigInt(Math.round(amount * 100)), // Convert dollars to cents
        currency: "CAD",
      },
      billingAddress: {
        addressLine1: billing.address || "",
        administrativeDistrictLevel1: billing.province || "ON",
        postalCode: (billing.postalCode || "").toUpperCase().replace(/\s/g, ""),
        country: "CA",
        firstName: billing.firstName || "",
        lastName: billing.lastName || "",
      },
      buyerEmailAddress: billing.email,
      note:
        type === "gift_card"
          ? `Gift Card for ${billing.recipientEmail}`
          : `Prepay: ${billing.firstName} ${billing.lastName}`,
    });

    // BigInt Fix: Convert BigInts to strings before sending to Next.js
    const safePayment = JSON.parse(
      JSON.stringify(payment, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );
    return NextResponse.json({ success: true, payment: safePayment });
  } catch (error: any) {
    // This logs the SPECIFIC Square error code (e.g., 'INVALID_VALUE') to your Vercel/Terminal logs
    console.error("❌ SQUARE API ERROR:", error.errors || error);

    return NextResponse.json(
      {
        success: false,
        error: error.errors?.[0]?.detail || "Square API Error",
      },
      { status: 400 },
    );
  }
}
