import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tahiya Zareen — AI/ML Engineer & Software Developer",
  description:
    "The portfolio of Tahiya Zareen: AI and machine learning research, offline-first academic assistance, retrieval-augmented generation, and software engineering.",
  applicationName: "Tahiya Zareen Portfolio",
  keywords: [
    "Tahiya Zareen",
    "AI engineer",
    "machine learning",
    "software developer",
    "EduGuard",
    "RAG",
    "Next.js",
  ],
  openGraph: {
    title: "Tahiya Zareen — AI/ML Engineer & Software Developer",
    description:
      "Selected AI research and software engineering projects by Tahiya Zareen.",
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
