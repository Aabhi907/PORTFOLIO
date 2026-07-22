import type { Metadata } from "next";
import { Archivo_Black, DM_Sans, Instrument_Serif } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-serif" });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "Aabishkar Shrestha — Creative Professional",
    description: "Kathmandu-based videographer, editor, creative head and social media analyst making brands shine through visuals that connect.",
    keywords: ["Aabishkar Shrestha", "videographer Nepal", "video editor Kathmandu", "creative professional", "social media strategy"],
    authors: [{ name: "Aabishkar Shrestha" }],
    openGraph: {
      title: "Aabishkar Shrestha — Creative Professional",
      description: "Visual stories, strategic content and memorable digital experiences.",
      type: "website",
      locale: "en_NP",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Aabishkar Shrestha creative portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Aabishkar Shrestha — Creative Professional",
      description: "Making brands shine through visuals that connect.",
      images: [`${origin}/og.png`],
    },
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
