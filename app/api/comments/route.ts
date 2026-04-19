import { NextResponse } from "next/server";
import { listCommentsForPage } from "@/lib/comments/queries";
import type { CommentTargetType } from "@/lib/comments/types";
import { getSanityWriteClient } from "@/lib/sanity/write-client";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const targetType = searchParams.get("targetType");
  const slug = searchParams.get("slug");

  if (targetType !== "blog" && targetType !== "bookReview") {
    return badRequest("Invalid targetType");
  }
  if (!slug || !SLUG_RE.test(slug) || slug.length > 120) {
    return badRequest("Invalid slug");
  }

  try {
    const comments = await listCommentsForPage(
      targetType as CommentTargetType,
      slug,
    );
    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json(
      { error: "Could not load comments." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const write = getSanityWriteClient();
  if (!write) {
    return NextResponse.json(
      { error: "Comments are not configured on this server." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid JSON");
  }

  if (!body || typeof body !== "object") return badRequest("Invalid body");

  const targetType = (body as { targetType?: unknown }).targetType;
  const slug = (body as { slug?: unknown }).slug;
  const authorName = (body as { authorName?: unknown }).authorName;
  const message = (body as { message?: unknown }).message;

  if (targetType !== "blog" && targetType !== "bookReview") {
    return badRequest("Invalid targetType");
  }
  if (typeof slug !== "string" || !SLUG_RE.test(slug) || slug.length > 120) {
    return badRequest("Invalid slug");
  }
  if (typeof authorName !== "string") return badRequest("Invalid name");
  if (typeof message !== "string") return badRequest("Invalid comment");

  const nameTrim = authorName.trim();
  const msgTrim = message.trim();
  if (nameTrim.length < 1 || nameTrim.length > 100) {
    return badRequest("Name must be 1–100 characters.");
  }
  if (msgTrim.length < 1 || msgTrim.length > 5000) {
    return badRequest("Comment must be 1–5000 characters.");
  }

  try {
    const doc = await write.create({
      _type: "readerComment",
      targetType,
      targetSlug: slug,
      authorName: nameTrim,
      message: msgTrim,
    });

    return NextResponse.json({
      ok: true,
      comment: {
        _id: doc._id,
        authorName: nameTrim,
        message: msgTrim,
        _createdAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not save comment. Try again later." },
      { status: 500 },
    );
  }
}
