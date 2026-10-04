import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tahiya Zareen Hiya — AI/ML Engineer & Software Developer",
  description:
    "Portfolio of Tahiya Zareen Hiya, a Computer Science & Engineering student working across AI/ML research, software development, retrieval systems, and lightweight local AI.",
  applicationName: "Tahiya Zareen Portfolio",
  keywords: [
    "Tahiya Zareen Hiya",
    "AI/ML engineer",
    "software developer",
    "Computer Science and Engineering",
    "University of Asia Pacific",
    "machine learning",
    "NLP",
    "RAG",
    "EduGuard",
    "Next.js",
  ],
  openGraph: {
    title: "Tahiya Zareen Hiya — AI/ML Engineer & Software Developer",
    description:
      "Selected AI research and software engineering projects by Tahiya Zareen Hiya.",
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
