import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookBody = {
  _type?: string;
  slug?: { current?: string } | string | null;
};

export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Revalidation is not configured." },
      { status: 503 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<SanityWebhookBody>(
      req,
      secret,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 },
      );
    }

    const type = body?._type;
    const slugValue =
      typeof body?.slug === "string" ? body.slug : body?.slug?.current;

    const revalidated: string[] = [];

    if (type === "review") {
      revalidatePath("/book-reviews");
      revalidated.push("/book-reviews");
      if (slugValue) {
        revalidatePath(`/book-reviews/${slugValue}`);
        revalidated.push(`/book-reviews/${slugValue}`);
      }
    } else if (type === "post") {
      revalidatePath("/blog");
      revalidated.push("/blog");
      if (slugValue) {
        revalidatePath(`/blog/${slugValue}`);
        revalidated.push(`/blog/${slugValue}`);
      }
    } else {
      revalidatePath("/", "layout");
      revalidated.push("/ (layout)");
    }

    return NextResponse.json({ ok: true, revalidated });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 400 },
    );
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  const path = url.searchParams.get("path");

  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: "Revalidation is not configured." },
      { status: 503 },
    );
  }
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }
  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  revalidatePath(path);
  return NextResponse.json({ ok: true, revalidated: [path] });
}
