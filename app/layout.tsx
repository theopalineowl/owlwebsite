import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const siteDescription =
  "Grounded spiritual education for seekers ready to cultivate personal practices rooted in awareness, nature, and inner wisdom.";

/** Canonical URL for OG / metadata; override with NEXT_PUBLIC_SITE_URL if needed. */
const productionSiteUrl = "https://www.theopalineowl.org";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.VERCEL_ENV === "production"
      ? productionSiteUrl
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : productionSiteUrl);

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

const fontMagic = Cormorant_Garamond({
  variable: "--font-magic",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  /** Only `.magic-title` on the home hero uses this face — avoid root preload on other routes. */
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Opaline Owl",
  description: siteDescription,
  manifest: "/faviconjenny/site.webmanifest",
  icons: {
    icon: [
      { url: "/faviconjenny/favicon.ico", sizes: "any" },
      { url: "/faviconjenny/favicon.svg", type: "image/svg+xml" },
      { url: "/faviconjenny/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/faviconjenny/apple-touch-icon.png",
  },
  appleWebApp: {
    title: "The Opaline Owl",
  },
  openGraph: {
    title: "The Opaline Owl",
    description: siteDescription,
    siteName: "The Opaline Owl",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/faviconjenny/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "The Opaline Owl",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "The Opaline Owl",
    description: siteDescription,
    images: ["/faviconjenny/web-app-manifest-512x512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMagic.variable}`}>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <div className="grain-overlay" aria-hidden />
        {children}
      </body>
    </html>
  );
}
