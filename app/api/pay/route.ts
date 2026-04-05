// app/api/pay/route.tsx
import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";

const client = new SquareClient({
  environment: SquareEnvironment.Production, // Use Sandbox for testing
  token: process.env.SQUARE_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const { sourceId, amount, type, billing } = await request.json();

    // Validate billing info
    if (!billing?.email || !billing?.address || !billing?.postalCode) {
      return NextResponse.json(
        { success: false, error: "Missing required billing information." },
        { status: 400 }
      );
    }

    // Create payment
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
        administrativeDistrictLevel1: billing.province || "ON",
        postalCode: billing.postalCode.replace(/\s/g, "").toUpperCase(),
        country: "CA",
      },
      note:
        type === "gift_card"
          ? `Gift Card for ${billing.recipientEmail || ""}`
          : `Service Prepay: ${billing.firstName} ${billing.lastName}`,
    });

    // Convert BigInt to string for JSON
    const safePayment = JSON.parse(
      JSON.stringify(payment, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return NextResponse.json({ success: true, payment: safePayment });
  } catch (err: any) {
    console.error("❌ Square Payment Error:", err);

    // Extract meaningful Square error
    let message = "Payment Failed";
    if (err?.errors && err.errors.length > 0) {
      message = err.errors.map((e: any) => e.detail || e.category).join(", ");
    } else if (err?.message) {
      message = err.message;
    }

    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
