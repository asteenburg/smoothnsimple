// app/api/pay/route.ts
import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import crypto from "crypto";

// 1️⃣ Initialize Square client
const client = new SquareClient({
  token: process.env.SQUARE_TOKEN!,
  environment:
    process.env.SQUARE_ENV === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

export async function POST(request: Request) {
  // 2️⃣ Log environment variables
  console.log("💡 SQUARE_TOKEN set?", !!process.env.SQUARE_TOKEN);
  console.log("💡 SQUARE_ENV:", process.env.SQUARE_ENV);

  try {
    // 3️⃣ Parse request body
    const { total, sourceId, billing } = await request.json();
    console.log("💳 Payment request body:", { total, sourceId, billing });

    // 4️⃣ Validate
    if (!sourceId) throw new Error("Missing card token");
    const numericTotal = Number(total);
    if (!total || numericTotal <= 0) throw new Error("Invalid total amount");

    const amountCents = BigInt(Math.round(numericTotal * 100));
    console.log("💳 Creating payment for amount (cents):", amountCents);

    let customerId: string | undefined;

    // 5️⃣ Optional: create customer if billing info is provided
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

    // 6️⃣ Create payment
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
    console.log("✅ Payment response received:", paymentResponse.payment);

    // 7️⃣ Serialize BigInt safely
    const responseData = JSON.parse(
      JSON.stringify(paymentResponse.payment, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );

    return NextResponse.json({ success: true, payment: responseData });
  } catch (error: any) {
    // 8️⃣ Log full error
    console.error(
      "❌ Square Error FULL:",
      JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
    );

    let userMessage = "Payment processing failed.";
    if (error.errors && error.errors.length > 0) {
      userMessage = error.errors[0].detail || userMessage;
    } else if (error.message) {
      userMessage = error.message;
    }

    return NextResponse.json({ success: false, error: userMessage }, { status: 500 });
  }
}
