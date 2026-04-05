import { SquareClient, SquareEnvironment } from "square";
import { NextResponse } from "next/server";

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Production,
});

export async function POST(request: Request) {
  try {
    const { sourceId, amount, type, billing } = await request.json();

    console.log("Billing received:", billing);

    const response = await client.payments.create({
      sourceId,
      idempotencyKey: crypto.randomUUID(),

      amountMoney: {
        amount: BigInt(amount * 100),
        currency: "CAD",
      },

      // ✅ REQUIRED FOR AVS / CARD APPROVAL
      billingAddress: {
        addressLine1: billing.address,
        administrativeDistrictLevel1: billing.province,
        postalCode: billing.postalCode.replace(/\s/g, ""),
        country: "CA",
      },

      // ✅ Helps approval rates
      buyerEmailAddress: billing.email,

      note:
        type === "gift_card"
          ? `Gift Card for ${billing.recipientEmail}`
          : "Service Prepayment",
    });

    return NextResponse.json({ success: true, result: response });
  } catch (error: any) {
    console.error("🔥 FULL SQUARE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.errors?.[0]?.detail || error?.message || "Payment Failed",
      },
      { status: 500 },
    );
  }
}
