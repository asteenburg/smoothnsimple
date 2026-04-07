import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    // 1. Pull values from process.env
    const token = process.env.SQUARE_TOKEN;
    const env = process.env.SQUARE_ENV;

    // DEBUG LOG: This will show up in your Vercel logs (not the browser)
    console.log("System Check - Env:", env);
    console.log(
      "System Check - Token Length:",
      token ? token.length : "MISSING",
    );

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment configuration is missing. Please redeploy.",
        },
        { status: 500 },
      );
    }

    const client = new SquareClient({
      token: token,
      environment:
        env === "production"
          ? SquareEnvironment.Production
          : SquareEnvironment.Sandbox,
    });

    const body = await request.json();
    const { total, sourceId, billing } = body;

    if (!sourceId) throw new Error("Missing card token (sourceId)");

    const numericTotal = Number(total);
    if (isNaN(numericTotal) || numericTotal <= 0)
      throw new Error("Invalid total amount");

    const amountCents = BigInt(Math.round(numericTotal * 100));

    let customerId: string | undefined;

    // Create Customer in Square
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
      } catch (custError) {
        console.warn("⚠️ Customer creation skipped:", custError);
      }
    }

    // Process Payment
    const { payment } = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
      sourceId,
      amountMoney: {
        amount: amountCents,
        currency: "CAD",
      },
      customerId,
      buyerEmailAddress: billing?.email,
    });

    const responseData = JSON.parse(
      JSON.stringify(payment, (key, value) =>
        typeof value === "bigint" ? value.toString() : value,
      ),
    );

    return NextResponse.json({ success: true, payment: responseData });
  } catch (error: any) {
    console.error("❌ Square API Error:", error);
    const message = error.errors ? error.errors[0].detail : error.message;
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
