import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    console.log("API HIT - referral");

    // -----------------------------
    // PARSE REQUEST BODY
    // -----------------------------
    const { email, referrerName } = await req.json();

    const cleanName = referrerName?.trim();
    const cleanEmail = email?.trim();

    // NAME REQUIRED (hard stop)
    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { error: "Name is required (min 2 characters)" },
        { status: 400 },
      );
    }

    // OPTIONAL: max length rule
    if (cleanName.length > 20) {
      return NextResponse.json(
        { error: "Name too long (max 20 characters)" },
        { status: 400 },
      );
    }

    // EMAIL REQUIRED
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 },
      );
    }

    // -----------------------------
    // ENV CHECK
    // -----------------------------
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl || !supabaseKey || !resendKey) {
      return NextResponse.json(
        { error: "Server misconfigured (missing env vars)" },
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

    // -----------------------------
    // SUPABASE INSERT
    // -----------------------------
    const { error } = await supabase.from("referrals").insert([
      {
        friend_email: cleanEmail,
        referrer_name: cleanName,
        referral_code: referralCode,
        discount_code: discountCode,
      },
    ]);

    if (error) {
      console.error("SUPABASE ERROR:", error);

      return NextResponse.json(
        {
          error: "Supabase insert failed",
          details: error.message,
        },
        { status: 500 },
      );
    }

    // -----------------------------
    // EMAIL SEND
    // -----------------------------
    await resend.emails.send({
      from: "Smooth N Simple <onboarding@resend.dev>",
      to: cleanEmail,
      subject: `${cleanName} saved you 10% 🎉`,
      html: `
  <div style="
    font-family: Arial, sans-serif;
    background: #0a0a0a;
    padding: 40px 20px;
    color: #ffffff;
  ">
    <!-- Container -->
    <div style="
      max-width: 600px;
      margin: 0 auto;
      background: #111111;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #222;
    ">

      <!-- Header -->
      <div style="
        background: linear-gradient(135deg, #ec4899, #111);
        padding: 30px;
        text-align: center;
      ">
        <h1 style="margin: 0; font-size: 22px;">
          Smooth N Simple
        </h1>
        <p style="margin: 5px 0 0; opacity: 0.8;">
          A friend just saved you 10%
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 30px; text-align: center;">

        <h2 style="margin-bottom: 10px;">
          🎉 You’ve been referred!
        </h2>

        <p style="color: #cccccc; font-size: 14px;">
          <strong style="color: #ffffff;">${cleanName}</strong>
          saved you 10% on your first visit.
        </p>

        <!-- Discount Box -->
        <div style="
          margin: 25px 0;
          padding: 20px;
          background: #000;
          border: 1px dashed #ec4899;
          border-radius: 12px;
        ">
          <p style="margin: 0; font-size: 12px; color: #aaa;">
            YOUR DISCOUNT CODE
          </p>
          <h2 style="margin: 10px 0 0; letter-spacing: 3px;">
            ${discountCode}
          </h2>
        </div>

        <!-- CTA -->
        <a href="https://yourdomain.com/booking"
          style="
            display: inline-block;
            padding: 12px 24px;
            background: #ec4899;
            color: white;
            text-decoration: none;
            border-radius: 999px;
            font-weight: bold;
            margin-top: 10px;
          ">
          Book Your Appointment
        </a>

      </div>

      <!-- PACKAGES SECTION -->
<div style="
  padding: 30px;
  border-top: 1px solid #222;
">

  <h3 style="text-align:center; margin-bottom: 20px; color:#fff;">
    Popular Packages
  </h3>

  <!-- Package 1 -->
  <div style="
    background: #0a0a0a;
    border: 1px solid #222;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 10px;
  ">
    <h4 style="margin: 0; color:#fff;">BOTOX 50</h4>
    <p style="margin: 5px 0; font-size: 13px; color: #aaa;">
      Bank your beauty. Includes 50 units of Botox to use as needed.
    </p>
  </div>

  <!-- Package 2 -->
  <div style="
    background: #0a0a0a;
    border: 1px solid #222;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 10px;
  ">
    <h4 style="margin: 0; color:#fff;">BOTOX 100</h4>
    <p style="margin: 5px 0; font-size: 13px; color: #aaa;">
      The ultimate bank. 100 units for full-face precision and maintenance.
    </p>
  </div>

  <!-- Package 3 -->
  <div style="
    background: #0a0a0a;
    border: 1px solid #222;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 20px;
  ">
    <h4 style="margin: 0; color:#fff;">10 UNIT BOTOX</h4>
    <p style="margin: 5px 0; font-size: 13px; color: #aaa;">
      Precision touch-up. Perfect for subtle brow lifts or fine lines.
    </p>
  </div>

  <!-- CTA BUTTON -->
  <div style="text-align:center;">
    <a href="https://www.smoothnsimple.com/shop"
      style="
        display:inline-block;
        background:#ec4899;
        color:#fff;
        padding:12px 20px;
        border-radius:999px;
        text-decoration:none;
        font-weight:bold;
        font-size:14px;
      ">
      View All Packages
    </a>
  </div>

</div>

      <!-- Footer -->
      <div style="
        padding: 20px;
        text-align: center;
        font-size: 11px;
        color: #666;
        border-top: 1px solid #222;
      ">
        Smooth N Simple • Professional Aesthetic Care
      </div>

    </div>
  </div>
  `,
    });

    // -----------------------------
    // RESPONSE
    // -----------------------------
    return NextResponse.json({
      success: true,
      referralCode,
      discountCode,
    });
  } catch (err) {
    console.error("FATAL ERROR:", err);

    return NextResponse.json(
      {
        error: "Server crash",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}
