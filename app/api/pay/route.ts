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

    if (!sourceId) throw new Error("Card token missing from request");

    const amountCents = BigInt(Math.round(parseFloat(total) * 100));

    // Process using the version your build specifically asked for
    const { payment } = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
      sourceId: sourceId,
      amountMoney: {
        amount: amountCents,
        currency: "CAD",
      },
      buyerEmailAddress: billing?.email || "",
      note: "Smooth N Simple Purchase",
      shippingAddress: {
        addressLine1: billing?.addressLine1 || "",
        locality: billing?.city || "",
        administrativeDistrictLevel1: billing?.state || "",
        postalCode: billing?.postalCode || "",
        country: "CA",
      },
    });

    const responseData = JSON.parse(
      JSON.stringify(payment, (k, v) =>
        typeof v === "bigint" ? v.toString() : v,
      ),
    );

    return NextResponse.json({ success: true, payment: responseData });
  } catch (error: any) {
    console.error("❌ SQUARE API REJECTION:", error);

    // Deep dive into the error object to find the human-readable reason
    let errorMessage = "Unknown Square Error";

    if (error.errors && error.errors[0]) {
      errorMessage = error.errors[0].detail || error.errors[0].category;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
