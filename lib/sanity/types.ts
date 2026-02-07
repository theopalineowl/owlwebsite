import type { PortableTextBlock } from "@portabletext/types";

export interface NavLink {
  label?: string;
  href?: string;
}

export interface SocialLink {
  label?: string;
  url?: string;
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  siteTitle?: string;
  navLinks?: NavLink[];
  footerText?: string;
  socialLinks?: SocialLink[];
}

export interface Post {
  _id: string;
  _type: "post";
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  coverImage?: { _ref: string; asset?: { url: string } };
  body?: PortableTextBlock[];
  externalLink?: string;
}

export interface Review {
  _id: string;
  _type: "review";
  title: string;
  slug: { current: string };
  publishedAt: string;
  bookAuthor?: string;
  bookCover?: { _ref: string; asset?: { url: string } };
  rating: number;
  excerpt?: string;
  body?: PortableTextBlock[];
}

/** List item shape (slug is string from GROQ "slug": slug.current) */
export interface ReviewListItem {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  bookCover?: { _ref: string; asset?: { url: string } };
  rating: number;
}
