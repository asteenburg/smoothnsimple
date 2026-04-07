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

    if (!sourceId) throw new Error("Missing card token (sourceId)");
    const numericTotal = Number(total);
    if (!total || numericTotal <= 0) throw new Error("Invalid total amount");

    // Convert to cents using BigInt for Square's API
    const amountCents = BigInt(Math.round(numericTotal * 100));

    let customerId: string | undefined;

    // Create Customer in Square
    if (billing?.email) {
      try {
        const { result } = await client.customersApi.createCustomer({
          givenName: billing.firstName,
          familyName: billing.lastName,
          emailAddress: billing.email,
          address: {
            addressLine1: billing.addressLine1,
            locality: billing.city,
            administrativeDistrictLevel1: billing.state,
            postalCode: billing.postalCode,
            country: "CA",
          },
        });
        customerId = result.customer?.id;
      } catch (custError) {
        console.warn("Customer creation skipped:", custError);
      }
    }

    // Process Payment
    const { result } = await client.paymentsApi.createPayment({
      idempotencyKey: crypto.randomUUID(),
      sourceId,
      amountMoney: {
        amount: amountCents,
        currency: "CAD",
      },
      customerId,
      buyerEmailAddress: billing?.email,
    });

    // Safe JSON conversion for BigInt values
    const responseData = JSON.parse(
      JSON.stringify(result.payment, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );

    return NextResponse.json({ success: true, payment: responseData });
  } catch (error: any) {
    console.error("Square Error:", error);
    const message = error.errors ? error.errors[0].detail : error.message;
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
