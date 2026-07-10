export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  _id,
  siteTitle,
  navLinks,
  footerText,
  socialLinks
}`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  body,
  coverImage,
  externalLink
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  coverImage,
  body,
  externalLink
}`;

export const reviewsQuery = `*[_type == "review"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  bookAuthor,
  bookCover,
  rating,
  excerpt
}`;

export const reviewBySlugQuery = `*[_type == "review" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  bookAuthor,
  bookCover,
  rating,
  excerpt,
  body
}`;

export const featuredReviewsQuery = `*[_type == "review"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  bookCover,
  rating
}`;

export const resourcesQuery = `*[_type == "resource"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  description,
  "fileUrl": file.asset->url,
  "fileExtension": file.asset->extension
}`;

export const resourceBySlugQuery = `*[_type == "resource" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  description,
  "fileUrl": file.asset->url,
  "fileExtension": file.asset->extension
}`;
