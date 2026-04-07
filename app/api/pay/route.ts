import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    // 1. Try to grab the token from multiple possible process paths
    const token = process.env.SQUARE_TOKEN;
    const env = process.env.SQUARE_ENV || "sandbox";

    // SERVER-SIDE LOG: View this in Vercel Dashboard -> Logs
    console.log("--- SECURE CONFIG CHECK ---");
    console.log("Environment Mode:", env);
    console.log(
      "Token Detected:",
      token ? "YES (Length: " + token.length + ")" : "NO",
    );

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Payment configuration is missing. Please ensure SQUARE_TOKEN is set in Vercel.",
        },
        { status: 500 },
      );
    }

    // 2. Initialize Client
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
    const amountCents = BigInt(Math.round(numericTotal * 100));

    // 3. Process Payment
    const { payment } = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
      sourceId,
      amountMoney: {
        amount: amountCents,
        currency: "CAD",
      },
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
