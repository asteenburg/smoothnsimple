// app/api/pay/route.ts
import { NextResponse } from "next/server";
import { Client as SquareClient, Environment as SquareEnvironment } from "square";
import crypto from "crypto";

// -----------------------------
// 1️⃣ Check that environment variables exist
console.log("💡 SQUARE_ENV:", process.env.SQUARE_ENV);
console.log("💡 SQUARE_TOKEN length:", process.env.SQUARE_TOKEN?.length);

// -----------------------------
// 2️⃣ Initialize Square client
const client = new SquareClient({
  accessToken: process.env.SQUARE_TOKEN!,
  environment:
    process.env.SQUARE_ENV === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("💳 Payment request body:", body);

    const { total, sourceId, billing } = body;

    if (!sourceId) throw new Error("Missing card token (sourceId)");
    const numericTotal = Number(total);
    if (!total || numericTotal <= 0) throw new Error("Invalid total amount");

    const amountCents = BigInt(Math.round(numericTotal * 100));

    let customerId: string | undefined;

    // -----------------------------
    // 3️⃣ Create Square Customer (optional)
    if (billing?.firstName || billing?.email) {
      try {
        const customerResponse = await client.customers.create({
          givenName: billing.firstName,
          familyName: billing.lastName,
          emailAddress: billing.email,
          address: {
            addressLine1: billing.addressLine1,
            locality: billing.city,
            administrativeDistrictLevel1: billing.state,
            postalCode: billing.postalCode,
            country: billing.country || "CA",
          },
        });

        customerId = customerResponse.customer?.id;
        console.log("✅ Customer created:", customerId);
      } catch (custError) {
        console.warn("⚠️ Customer creation skipped:", custError);
      }
    }

    // -----------------------------
    // 4️⃣ Create Payment
    const paymentResponse = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
      sourceId,
      amountMoney: {
        amount: amountCents,
        currency: "CAD",
      },
      customerId,
      buyerEmailAddress: billing?.email,
    });

    // -----------------------------
    // 5️⃣ Convert BigInt safely
    const responseData = JSON.parse(
      JSON.stringify(paymentResponse.payment, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );

    console.log("✅ Payment success:", responseData);

    return NextResponse.json({
      success: true,
      payment: responseData,
    });
  } catch (error: any) {
    console.error("❌ Square Error FULL:", error);

    let userMessage = "Payment processing failed.";

    if (error.errors && error.errors.length > 0) {
      userMessage = error.errors[0].detail || userMessage;
    }

    return NextResponse.json(
      { success: false, error: userMessage },
      { status: 500 },
    );
  }
}
