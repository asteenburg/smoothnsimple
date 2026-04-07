import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const token = process.env.SQUARE_ACCESS_TOKEN?.trim();
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID?.trim();

    const client = new SquareClient({
      token: token || "",
      environment: SquareEnvironment.Production,
    });

    const body = await request.json();
    const { total, sourceId } = body;

    const { payment } = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
      sourceId: sourceId,
      locationId: locationId,
      amountMoney: {
        amount: BigInt(Math.round(parseFloat(total) * 100)),
        currency: "CAD",
      },
    });

    return NextResponse.json({
      success: true,
      payment: JSON.parse(
        JSON.stringify(payment, (k, v) =>
          typeof v === "bigint" ? v.toString() : v,
        ),
      ),
    });
  } catch (error: any) {
    const detail = error.errors?.[0]?.detail || "Authorization Failed";
    return NextResponse.json(
      { success: false, error: detail },
      { status: 500 },
    );
  }
}
