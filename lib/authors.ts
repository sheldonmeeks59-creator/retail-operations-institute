import type { Author } from "@/types/content";

export const authors: Record<string, Author> = {
  "sheldon-meeks": {
    slug: "sheldon-meeks",
    name: "Sheldon Meeks",
    role: "Founder, Retail Operations Institute",
    bio: "Writes on retail systems thinking, store operations, and execution frameworks for operators and consulting teams.",
  },
};

export function getAuthor(slug: string): Author {
  const author = authors[slug];
  if (!author) {
    throw new Error(`Unknown author: ${slug}`);
  }
  return author;
}
