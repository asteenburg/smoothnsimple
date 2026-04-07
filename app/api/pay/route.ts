import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // 1. SEARCH FOR THE TOKEN (Checking all possible names)
    const token =
      process.env.SQUARE_TOKEN ||
      process.env.NEXT_PUBLIC_SQUARE_TOKEN ||
      process.env.SQUARE_ACCESS_TOKEN;

    const env = process.env.SQUARE_ENV || "sandbox";

    // 2. DETAILED ERROR LOGGING
    if (!token) {
      console.error(
        "❌ TOKEN SEARCH FAILED. Keys found in process.env:",
        Object.keys(process.env).filter((k) => k.includes("SQUARE")),
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Server Configuration Error: The API cannot find your Square Token. Please check your Vercel Environment Variable names.",
        },
        { status: 500 },
      );
    }

    // 3. INITIALIZE CLIENT
    const client = new SquareClient({
      token: token,
      environment:
        env.toLowerCase() === "production"
          ? SquareEnvironment.Production
          : SquareEnvironment.Sandbox,
    });

    const body = await request.json();
    const { total, sourceId } = body;

    if (!sourceId)
      throw new Error("Card sourceId is missing from the request.");

    const amountCents = BigInt(Math.round(parseFloat(total) * 100));

    // 4. CREATE PAYMENT
    const { payment } = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
      sourceId: sourceId,
      amountMoney: {
        amount: amountCents,
        currency: "CAD",
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
    const detail =
      error.errors?.[0]?.detail || error.message || "Payment Processing Failed";
    return NextResponse.json(
      { success: false, error: detail },
      { status: 500 },
    );
  }
}
