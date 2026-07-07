import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"post">;

/** All posts, with drafts filtered out in production builds. */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection("post", ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true,
  );
  return sortByDate(posts);
}

/** Newest first by publishDate. */
export function sortByDate(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
}

/** Sorted, unique, lowercased tags across the given posts. */
export function uniqueTags(posts: Post[]): string[] {
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b));
}

/** Map of tag -> number of posts carrying it. */
export function tagCounts(posts: Post[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
}
