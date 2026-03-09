import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mm-house-warming-invitation.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Housewarming Ceremony | Manideep & Meghana",
  description:
    "You are cordially invited to celebrate our Housewarming Ceremony on April 12, 2026 at 09:30 AM. Monroe, WA.",
  openGraph: {
    title: "Housewarming Ceremony | Manideep & Meghana",
    description:
      "Join us to celebrate our new home! April 12, 2026 at 09:30 AM.",
    type: "website",
    images: [
      {
        url: "/invitation-bg.png",
        width: 800,
        height: 1200,
        alt: "Housewarming Ceremony Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
