import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    console.log("🚀 API HIT - referral");

    // -----------------------------
    // PARSE BODY
    // -----------------------------
    const body = await req.json();
    console.log("📦 REQUEST BODY:", body);

    const { email, referrerName } = body;

    const cleanName = referrerName?.trim();
    const cleanEmail = email?.trim();

    // -----------------------------
    // VALIDATION
    // -----------------------------
    if (!cleanName || cleanName.length < 2) {
      console.log("❌ NAME VALIDATION FAILED");
      return NextResponse.json(
        { error: "Name is required (min 2 characters)" },
        { status: 400 },
      );
    }

    if (!cleanEmail || !cleanEmail.includes("@")) {
      console.log("❌ EMAIL VALIDATION FAILED");
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 },
      );
    }

    console.log("✅ VALIDATION PASSED");

    // -----------------------------
    // ENV CHECK
    // -----------------------------
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendKey = process.env.RESEND_API_KEY;

    console.log("🔐 ENV CHECK:", {
      supabaseUrl: !!supabaseUrl,
      supabaseKey: !!supabaseKey,
      resendKey: !!resendKey,
    });

    if (!supabaseUrl || !supabaseKey || !resendKey) {
      console.log("❌ ENV MISSING");
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const resend = new Resend(resendKey);

    // -----------------------------
    // CODE GENERATION
    // -----------------------------
    const generateCode = (prefix: string) => {
      const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
      return `${prefix}-${rand}`;
    };

    const referralCode = generateCode("REF");
    const discountCode = generateCode("SN10");

    console.log("🎯 GENERATED CODES:", {
      referralCode,
      discountCode,
    });

    // -----------------------------
    // SUPABASE INSERT (FULL TRACE)
    // -----------------------------
    console.log("🟡 BEFORE SUPABASE INSERT");

    const { data, error } = await supabase
      .from("referrals")
      .insert([
        {
          friend_email: cleanEmail,
          referrer_name: cleanName,
          referral_code: referralCode,
          discount_code: discountCode,
        },
      ])
      .select();

    console.log("🟢 AFTER SUPABASE INSERT");

    console.log("🔥 SUPABASE RESULT:", { data, error });

    if (error) {
      console.error("❌ SUPABASE ERROR FULL:", JSON.stringify(error, null, 2));

      return NextResponse.json(
        {
          error: "Supabase insert failed",
          details: error.message,
        },
        { status: 500 },
      );
    }

    console.log("✅ SUPABASE INSERT SUCCESS");

    // -----------------------------
    // RESEND EMAIL - USER
    // -----------------------------
    console.log("📧 SENDING USER EMAIL");

    await resend.emails.send({
      from: "Smooth N Simple <noreply@smoothnsimple.com>",
      replyTo: "nurseinjectorshelby@gmail.com",
      to: cleanEmail,
      subject: `${cleanName} saved you 10% 🎉`,
      html: `<p>Your discount code: <strong>${discountCode}</strong></p>`,
    });

    console.log("✅ USER EMAIL SENT");

    // -----------------------------
    // RESEND EMAIL - OWNER
    // -----------------------------
    console.log("📧 SENDING OWNER EMAIL");

    await resend.emails.send({
      from: "Smooth N Simple <noreply@smoothnsimple.com>",
      to: "nurseinjectorshelby@gmail.com",
      subject: "New Referral Received 🎉",
      html: `
        <h2>New Referral</h2>
        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Referral Code:</strong> ${referralCode}</p>
        <p><strong>Discount Code:</strong> ${discountCode}</p>
      `,
    });

    console.log("✅ OWNER EMAIL SENT");

    // -----------------------------
    // RESPONSE
    // -----------------------------
    console.log("🏁 REQUEST COMPLETE SUCCESSFULLY");

    return NextResponse.json({
      success: true,
      referralCode,
      discountCode,
    });
  } catch (err) {
    console.error("💥 FATAL ERROR:", err);

    return NextResponse.json(
      {
        error: "Server crash",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
