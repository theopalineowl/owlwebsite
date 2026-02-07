import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const fontDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const fontBody = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Opaline Owl",
  description:
    "Grounded spiritual education for seekers ready to cultivate personal practices rooted in awareness, nature, and inner wisdom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <div className="grain-overlay" aria-hidden />
        {children}
      </body>
    </html>
  );
}
