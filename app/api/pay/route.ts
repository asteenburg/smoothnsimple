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
    const { total, sourceId } = body;

    if (!sourceId) throw new Error("Card token missing");

    // Simplest possible amount conversion
    const amountCents = BigInt(Math.round(Number(total) * 100));

    // Direct Payment - No complex Order API linking
    const { payment } = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
      sourceId,
      amountMoney: {
        amount: amountCents,
        currency: "CAD",
      },
    });

    const responseData = JSON.parse(
      JSON.stringify(payment, (k, v) =>
        typeof v === "bigint" ? v.toString() : v,
      ),
    );

    return NextResponse.json({ success: true, payment: responseData });
  } catch (error: any) {
    const message = error.errors ? error.errors[0].detail : error.message;
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
