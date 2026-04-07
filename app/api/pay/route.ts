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

    if (!sourceId) throw new Error("Missing card token");
    const amountCents = BigInt(Math.round(Number(total) * 100));

    let customerId: string | undefined;

    // Fixed: Using client.customers.create instead of customersApi
    if (billing?.email) {
      try {
        const { customer } = await client.customers.create({
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
        customerId = customer?.id;
      } catch (e) {
        console.warn("Customer creation skipped");
      }
    }

    // Fixed: Using client.payments.create instead of paymentsApi
    const { payment } = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
      sourceId,
      amountMoney: {
        amount: amountCents,
        currency: "CAD",
      },
      customerId,
    });

    return NextResponse.json({
      success: true,
      payment: JSON.parse(
        JSON.stringify(payment, (k, v) => (typeof v === "bigint" ? v.toString() : v))
      ),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
