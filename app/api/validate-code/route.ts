import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { valid: false, error: "Code required" },
        { status: 400 },
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    // Find code
    const { data, error } = await supabase
      .from("referrals")
      .select("*")
      .eq("discount_code", code)
      .single();

    if (error || !data) {
      return NextResponse.json({ valid: false }, { status: 404 });
    }

    // Check if already used
    if (data.used) {
      return NextResponse.json({
        valid: false,
        error: "Code already used",
      });
    }

    return NextResponse.json({
      valid: true,
      discount: data.discount_code,
    });
  } catch (err) {
    return NextResponse.json(
      { valid: false, error: "Server error" },
      { status: 500 },
    );
  }
}
