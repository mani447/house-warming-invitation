import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generateCSV } from "@/lib/utils";

function isAuthorized(request: NextRequest): boolean {
  const password = request.headers.get("x-admin-password");
  return password === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch RSVPs." }, { status: 500 });
  }

  // Check if CSV download requested
  const isCSV = request.nextUrl.searchParams.get("format") === "csv";
  if (isCSV) {
    const csv = generateCSV(data || []);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=rsvps-${new Date().toISOString().slice(0, 10)}.csv`,
      },
    });
  }

  // Check if this is a verify request (for login)
  const isVerify = request.nextUrl.searchParams.get("verify") === "1";
  if (isVerify) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json(data || []);
}
