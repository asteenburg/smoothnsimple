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
    const amountCents = BigInt(Math.round(parseFloat(total) * 100));

    // Using client.payments.create (The version your build worker expects)
    const { payment } = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
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

    // Handle BigInt conversion for the response
    const responseData = JSON.parse(
      JSON.stringify(payment, (k, v) =>
        typeof v === "bigint" ? v.toString() : v,
      ),
    );

    return NextResponse.json({ success: true, payment: responseData });
  } catch (error: any) {
    // Log the full error to Vercel console
    console.error("❌ SQUARE API ERROR:", error);

    const detail = error.errors ? error.errors[0].detail : error.message;
    return NextResponse.json(
      { success: false, error: detail },
      { status: 500 },
    );
  }
}
