import { defineField, defineType } from "sanity";

export const readerComment = defineType({
  name: "readerComment",
  title: "Reader comment",
  type: "document",
  fields: [
    defineField({
      name: "targetType",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Blog post", value: "blog" },
          { title: "Book review", value: "bookReview" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "targetSlug",
      title: "Slug (from URL)",
      type: "string",
      description: "e.g. the-fig-tree or listening-to-the-wild-weyward",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "message",
      title: "Comment",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().max(5000),
    }),
  ],
  preview: {
    select: {
      authorName: "authorName",
      targetType: "targetType",
      targetSlug: "targetSlug",
      message: "message",
    },
    prepare({ authorName, targetType, targetSlug, message }) {
      const snippet =
        typeof message === "string"
          ? message.replace(/\s+/g, " ").slice(0, 60)
          : "";
      return {
        title: authorName || "Anonymous",
        subtitle: `${targetType} · ${targetSlug}${snippet ? ` — ${snippet}…` : ""}`,
      };
    },
  },
});
