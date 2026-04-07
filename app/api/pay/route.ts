import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const token = process.env.SQUARE_ACCESS_TOKEN?.trim();
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID?.trim();

    if (!token || !locationId) {
      return NextResponse.json(
        { success: false, error: "Server Configuration Error: Missing Keys" },
        { status: 500 },
      );
    }

    const client = new SquareClient({
      token: token,
      environment: SquareEnvironment.Production,
    });

    const body = await request.json();
    const { total, sourceId, billing } = body;

    // Convert string total to BigInt cents for Square
    const amountCents = BigInt(Math.round(parseFloat(total) * 100));

    // This formatted note appears in the "Notes" section of your Square Dashboard
    const internalNote = `
--- CUSTOMER DETAILS ---
Name: ${billing.firstName} ${billing.lastName}
Phone: ${billing.phone}
Email: ${billing.email}

--- SHIPPING/BILLING ---
${billing.addressLine1}
${billing.addressLine2 ? billing.addressLine2 : ""}
${billing.city}, ${billing.state}
${billing.postalCode}
    `.trim();

    const { payment } = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
      sourceId: sourceId,
      locationId: locationId,
      amountMoney: {
        amount: amountCents,
        currency: "CAD",
      },
      // 1. Assigns the email to the Square Customer Profile
      buyerEmailAddress: billing.email,

      // 2. Populates the 'Notes' field in your Transaction history
      note: internalNote,

      // 3. This STYLES the Invoice/Receipt in Square's system
      billingAddress: {
        firstName: billing.firstName,
        lastName: billing.lastName,
        addressLine1: billing.addressLine1,
        addressLine2: billing.addressLine2 || "",
        locality: billing.city,
        administrativeDistrictLevel1: billing.state,
        postalCode: billing.postalCode,
        country: "CA",
      },
    });

    // Cleanly serialize the response (handling BigInt conversion)
    const responseData = JSON.parse(
      JSON.stringify(payment, (k, v) =>
        typeof v === "bigint" ? v.toString() : v,
      ),
    );

    return NextResponse.json({ success: true, payment: responseData });
  } catch (error: any) {
    console.error("❌ SQUARE PRODUCTION ERROR:", error);

    // Extract the most helpful error message for the user
    const detail =
      error.errors?.[0]?.detail || error.message || "Payment Processing Failed";

    return NextResponse.json(
      { success: false, error: detail },
      { status: 500 },
    );
  }
}
