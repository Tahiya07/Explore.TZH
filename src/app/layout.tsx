import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "TAHIYA // AI LAB — AI Researcher, Engineer, Builder",
  description:
    "Explore Tahiya's AI laboratory: a spatial portfolio for research, engineering systems, and future intelligent projects.",
  applicationName: "TAHIYA // AI LAB",
  keywords: ["AI research", "engineering", "machine learning", "portfolio", "Tahiya"],
  openGraph: {
    title: "TAHIYA // AI LAB",
    description: "An immersive portfolio for AI research, engineering, and intelligent systems.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
