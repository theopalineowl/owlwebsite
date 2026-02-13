import type { Metadata, Viewport } from "next";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sanity Studio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
