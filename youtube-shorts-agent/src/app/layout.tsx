import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agentic Shorts Architect",
  description:
    "Generate cinematic, suspense-driven YouTube Shorts scripts, shocking facts, and Sora 2 prompts in seconds.",
  metadataBase: new URL("https://agentic-0b8a79fd.vercel.app"),
  openGraph: {
    title: "Agentic Shorts Architect",
    description:
      "Your automation agent for viral faceless Shorts—shock angles, suspense scripts, and Sora-ready visuals.",
    url: "https://agentic-0b8a79fd.vercel.app",
    siteName: "Agentic Shorts Architect",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agentic Shorts Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Shorts Architect",
    description:
      "Generate shocking true stories, viral scripts, and Sora prompts for cinematic Shorts.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
