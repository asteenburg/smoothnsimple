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
    const numericTotal = Number(total);
    if (!total || numericTotal <= 0) throw new Error("Invalid total amount");

    const amountCents = BigInt(Math.round(numericTotal * 100));

    let customerId: string | undefined;

    // 1. Create Square Customer
    // FIX: Method is 'create', not 'createCustomer'
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
      } catch (custError) {
        console.warn("⚠️ Customer creation skipped:", custError);
      }
    }

    // 2. Create the Payment
    // FIX: Method is 'create', not 'createPayment'
    const paymentResponse = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
      sourceId: sourceId,
      amountMoney: {
        amount: amountCents,
        currency: "CAD",
      },
      customerId: customerId,
      buyerEmailAddress: billing?.email,
    });

    // 3. SAFE SERIALIZATION for BigInt
    const responseData = JSON.parse(
      JSON.stringify(paymentResponse.payment, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );

    return NextResponse.json({
      success: true,
      payment: responseData,
    });
  } catch (error: any) {
    console.error("❌ Square Error:", error);

    let userMessage = "Payment processing failed.";

    // In newer SDK, errors are usually found in error.errors
    if (error.errors && error.errors.length > 0) {
      userMessage = error.errors[0].detail || userMessage;
    }

    return NextResponse.json(
      { success: false, error: userMessage },
      { status: 500 },
    );
  }
}
