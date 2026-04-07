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
    const { total, sourceId, billing } = await request.json();

    if (!sourceId) throw new Error("Missing card token");
    if (!total || Number(total) <= 0) throw new Error("Invalid total amount");

    const amountCents = BigInt(Math.round(Number(total) * 100));
    let customerId: string | undefined;

    // 1️⃣ Create customer if billing info provided
    if (billing && (billing.firstName || billing.email)) {
      try {
        const customerResponse = await client.customers.create({
          givenName: billing.firstName,
          familyName: billing.lastName,
          emailAddress: billing.email,
          address: billing.addressLine1
            ? {
                addressLine1: billing.addressLine1,
                locality: billing.city,
                administrativeDistrictLevel1: billing.state,
                postalCode: billing.postalCode,
                country: billing.country || "CA",
              }
            : undefined,
        });

        customerId = customerResponse.customer?.id;
      } catch (custError) {
        console.warn("⚠️ Customer creation skipped:", custError);
      }
    }

    // 2️⃣ Create the payment
    const paymentResponse = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
      sourceId,
      amountMoney: { amount: amountCents, currency: "CAD" },
      customerId,
      buyerEmailAddress: billing?.email,
    });

    // 3️⃣ Serialize BigInt safely
    const responseData = JSON.parse(
      JSON.stringify(paymentResponse.payment, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );

    return NextResponse.json({ success: true, payment: responseData });
  } catch (error: any) {
    console.error("❌ Square Error:", error);

    let userMessage = "Payment processing failed.";
    if (
      error?.errors &&
      Array.isArray(error.errors) &&
      error.errors.length > 0
    ) {
      userMessage = error.errors[0].detail || userMessage;
    } else if (error.message) {
      userMessage = error.message;
    }

    return NextResponse.json(
      { success: false, error: userMessage },
      { status: 500 },
    );
  }
}
