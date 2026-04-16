import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    // Atomically mark as used only if unused
    const { data, error } = await supabase
      .from("referrals")
      .update({ used: true })
      .eq("discount_code", code)
      .eq("used", false)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: "Invalid or already used code" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      discount: data.discount_code,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
