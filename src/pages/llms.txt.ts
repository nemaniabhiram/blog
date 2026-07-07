import type { APIRoute } from "astro";
import { SITE } from "../data/constants";
import { getAllPosts } from "../utils/posts";
import { formatDate } from "../utils/date";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getAllPosts();
  const base = site ?? new URL(SITE.url);

  const lines = [
    `# ${SITE.title}`,
    "",
    SITE.description,
    "",
    "## Posts",
    "",
    ...posts.map((post) => {
      const url = new URL(`/posts/${post.id}/`, base).href;
      return `- [${post.data.title}](${url}) — ${formatDate(post.data.publishDate)}`;
    }),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
