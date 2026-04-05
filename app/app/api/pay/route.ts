// app/api/pay/route.ts
import { SquareClient, SquareEnvironment } from "square";
import { NextResponse } from "next/server";

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!, // <--- must be set
  environment: SquareEnvironment.Production,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sourceId, amount, type, billing } = body;

    const { payment } = await client.payments.create({
      sourceId,
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: BigInt(Math.round(amount * 100)),
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
          ? `Gift Card for ${billing.recipientEmail}`
          : `Prepay: ${billing.firstName} ${billing.lastName}`,
    });

    return NextResponse.json({ success: true, payment });
  } catch (error: any) {
    console.error("SQUARE ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
