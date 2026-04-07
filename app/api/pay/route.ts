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

    const amountCents = BigInt(Math.round(parseFloat(total) * 100));

    // Construct the request object dynamically to avoid sending empty strings
    // This is the most common cause of V1_ERROR
    const paymentBase: any = {
      idempotencyKey: crypto.randomUUID(),
      sourceId: sourceId,
      amountMoney: {
        amount: amountCents,
        currency: "CAD",
      },
      note: "Smooth N Simple Purchase",
    };

    if (billing?.email) paymentBase.buyerEmailAddress = billing.email;

    // Only add shipping if the data actually exists
    if (billing?.addressLine1 || billing?.city || billing?.postalCode) {
      paymentBase.shippingAddress = {
        addressLine1: billing.addressLine1 || undefined,
        locality: billing.city || undefined,
        administrativeDistrictLevel1: billing.state || undefined,
        postalCode: billing.postalCode || undefined,
        country: "CA",
      };
    }

    const { payment } = await client.payments.create(paymentBase);

    const responseData = JSON.parse(
      JSON.stringify(payment, (k, v) =>
        typeof v === "bigint" ? v.toString() : v,
      ),
    );

    return NextResponse.json({ success: true, payment: responseData });
  } catch (error: any) {
    console.error("❌ SQUARE API REJECTION:", error);

    // V1_ERROR fallback
    const detail =
      error.errors?.[0]?.detail ||
      error.message ||
      "Square V1 Validation Error";
    return NextResponse.json(
      { success: false, error: detail },
      { status: 500 },
    );
  }
}
