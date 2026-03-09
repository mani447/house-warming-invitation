import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fdf6e3 0%, #f5e6d0 50%, #fdf6e3 100%)",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            bottom: 16,
            border: "3px solid #b8860b",
            borderRadius: 16,
            display: "flex",
          }}
        />

        {/* Top decorative line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 8,
          }}
        >
          <div style={{ fontSize: 28, display: "flex" }}>✨</div>
          <div
            style={{
              fontSize: 22,
              color: "#8b6914",
              letterSpacing: 4,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Please Join Us For Our
          </div>
          <div style={{ fontSize: 28, display: "flex" }}>✨</div>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#5c3d10",
            marginBottom: 16,
            display: "flex",
          }}
        >
          Housewarming Ceremony
        </div>

        {/* Names */}
        <div
          style={{
            fontSize: 32,
            color: "#8b6914",
            marginBottom: 24,
            display: "flex",
          }}
        >
          Manideep &amp; Meghana
        </div>

        {/* Details row */}
        <div
          style={{
            display: "flex",
            gap: 48,
            alignItems: "center",
            fontSize: 24,
            color: "#5c3d10",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "flex" }}>📅</span>
            <span style={{ display: "flex" }}>April 12, 2026</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "flex" }}>🕤</span>
            <span style={{ display: "flex" }}>09:30 AM</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "flex" }}>📍</span>
            <span style={{ display: "flex" }}>Monroe, WA</span>
          </div>
        </div>

        {/* Bottom decorative */}
        <div
          style={{
            marginTop: 24,
            fontSize: 18,
            color: "#b8860b",
            letterSpacing: 6,
            display: "flex",
          }}
        >
          ★ YOU ARE CORDIALLY INVITED ★
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
