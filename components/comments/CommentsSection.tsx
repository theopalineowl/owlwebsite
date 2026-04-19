"use client";

import { useCallback, useEffect, useState } from "react";
import { formatDate } from "@/lib/sanity/format";
import type { CommentTargetType, PublicComment } from "@/lib/comments/types";

type Props = {
  targetType: CommentTargetType;
  slug: string;
};

export function CommentsSection({ targetType, slug }: Props) {
  const [comments, setComments] = useState<PublicComment[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitOk, setSubmitOk] = useState(false);

  const load = useCallback(async () => {
    setLoadError(null);
    try {
      const res = await fetch(
        `/api/comments?targetType=${encodeURIComponent(targetType)}&slug=${encodeURIComponent(slug)}`,
        { cache: "no-store" },
      );
      const data = (await res.json()) as {
        comments?: PublicComment[];
        error?: string;
      };
      if (!res.ok) {
        setLoadError(data.error ?? "Could not load comments.");
        setComments([]);
        return;
      }
      setComments(data.comments ?? []);
    } catch {
      setLoadError("Could not load comments.");
      setComments([]);
    }
  }, [slug, targetType]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    setSubmitOk(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType,
          slug,
          authorName,
          message,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong.");
        return;
      }
      setAuthorName("");
      setMessage("");
      setSubmitOk(true);
      await load();
    } catch {
      setSubmitError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="border-t border-white/10 pt-8 mt-10 md:mt-12 max-w-3xl mx-auto w-full">
      <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--text-primary)] mb-3">
        Comments
      </h3>

      {comments && comments.length > 0 ? (
        <ul className="space-y-4 mb-8">
          {comments.map((c) => (
            <li
              key={c._id}
              className="rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur-md px-5 py-4"
            >
              <p className="text-sm text-[var(--text-muted)] mb-1">
                <span className="font-medium text-[var(--text-primary)]">
                  {c.authorName}
                </span>
                <span className="mx-2 text-white/25">·</span>
                <time dateTime={c._createdAt}>{formatDate(c._createdAt)}</time>
              </p>
              <p className="text-[var(--text-primary)]/95 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                {c.message}
              </p>
            </li>
          ))}
        </ul>
      ) : comments && comments.length === 0 && !loadError ? (
        <p className="text-sm text-[var(--text-muted)] mb-6">
          No comments yet. Be the first.
        </p>
      ) : null}

      {loadError ? (
        <p className="text-sm text-amber-200/90 mb-6">{loadError}</p>
      ) : null}

      <div className="rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-md p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor={`comment-name-${slug}`}
              className="block text-xs font-medium text-[var(--text-muted)] mb-1.5"
            >
              Name
            </label>
            <input
              id={`comment-name-${slug}`}
              name="authorName"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/70 outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,58,237,0.55)]"
            />
          </div>
          <div>
            <label
              htmlFor={`comment-body-${slug}`}
              className="block text-xs font-medium text-[var(--text-muted)] mb-1.5"
            >
              Comment
            </label>
            <textarea
              id={`comment-body-${slug}`}
              name="message"
              required
              rows={4}
              maxLength={5000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thoughts…"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/70 outline-none focus-visible:ring-2 focus-visible:ring-[rgba(126,58,237,0.55)] resize-y min-h-[6rem]"
            />
          </div>
          {submitError ? (
            <p className="text-sm text-red-300/95">{submitError}</p>
          ) : null}
          {submitOk ? (
            <p className="text-sm text-emerald-300/95">
              Thanks — your comment was posted.
            </p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-white/15 hover:bg-white/20 border border-white/20 px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] disabled:opacity-50 disabled:pointer-events-none transition-colors"
          >
            {submitting ? "Posting…" : "Post comment"}
          </button>
        </form>
      </div>
    </div>
  );
}
