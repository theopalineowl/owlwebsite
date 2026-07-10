import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { getResourceBySlug } from "@/lib/resources/get-resources";

export const revalidate = 60;
export const dynamicParams = true;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) notFound();

  const destination = resource.fileSrc.startsWith("http")
    ? resource.fileSrc
    : new URL(resource.fileSrc, request.url).toString();

  return NextResponse.redirect(destination);
}
