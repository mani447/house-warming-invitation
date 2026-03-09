import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { validateRSVP, hasErrors, RSVPFormData } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data: RSVPFormData = {
      name: String(body.name || "").trim(),
      contact: String(body.contact || "").trim(),
      attending: Boolean(body.attending),
      guest_count: body.attending ? Math.max(1, Number(body.guest_count) || 1) : 0,
    };

    const errors = validateRSVP(data);
    if (hasErrors(errors)) {
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("rsvps").insert({
      name: data.name,
      contact: data.contact,
      attending: data.attending,
      guest_count: data.guest_count,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save RSVP." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
