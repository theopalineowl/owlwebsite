export type CommentTargetType = "blog" | "bookReview";

export type PublicComment = {
  _id: string;
  authorName: string;
  message: string;
  _createdAt: string;
};
