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

    console.log("Processing payment for:", billing?.email);

    const { payment } = await client.payments.create({
      sourceId,
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: BigInt(Math.round(amount * 100)), // dollars → cents
        currency: "CAD",
      },
      buyerEmailAddress: billing.email,
      billingAddress: {
        addressLine1: billing.address || "",
        postalCode: (billing.postalCode || "").replace(/\s/g, ""),
        administrativeDistrictLevel1: billing.province || "ON",
        country: "CA",
      },
      note:
        type === "gift_card"
          ? `Gift Card for ${billing.recipientEmail || ""}`
          : "Service Prepay",
    });

    // Convert BigInts to strings to avoid JSON errors
    const safePayment = JSON.parse(
      JSON.stringify(payment, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );

    return NextResponse.json({ success: true, payment: safePayment });
  } catch (error: any) {
    console.error("❌ SQUARE API ERROR:", error);
    const errorMessage =
      error?.errors?.[0]?.detail || error?.message || "Payment Failed";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 },
    );
  }
}
