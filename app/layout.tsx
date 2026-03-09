import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Housewarming Ceremony | Manideep & Meghana",
  description:
    "You are cordially invited to celebrate our Housewarming Ceremony on April 12, 2026.",
  openGraph: {
    title: "Housewarming Ceremony | Manideep & Meghana",
    description:
      "Join us to celebrate our new home! April 12, 2026 at 09:30 AM.",
    images: ["/invitation-bg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-serif antialiased bg-cream text-warm-text">
        {children}
      </body>
    </html>
  );
}
