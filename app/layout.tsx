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
      "Our new home is ready and we'd love to celebrate with you! Please join us for our Housewarming Ceremony on April 12, 2026 at 09:30 AM. Kindly RSVP!",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Housewarming Ceremony Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Housewarming Ceremony | Manideep & Meghana",
    description:
      "Our new home is ready and we'd love to celebrate with you! Please join us for our Housewarming Ceremony on April 12, 2026 at 09:30 AM. Kindly RSVP!",
    images: ["/og-image.jpg"],
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
