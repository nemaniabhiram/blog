import type { AstroIntegration } from "astro";
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { parseFrontmatter } from "@astrojs/markdown-remark";
import { renderOgImage, renderAppleIcon } from "../utils/og";
import { SITE } from "../data/constants";

// OG images are generated in a build hook (not a route) because Astro 7's
// `trailingSlash: "always"` appends a slash to dynamic `.png` endpoints, which
// breaks them. Writing files directly keeps clean `/og-image/<slug>.png` URLs
// while pages keep their trailing slashes. (TRD §12, §16.2)

interface Frontmatter {
  title: string;
  publishDate: string | Date;
  draft?: boolean;
  ogImage?: string;
}

/** Recursively collect `<relative-slug>` -> parsed frontmatter for src/blog. */
function collectPosts(dir: URL, prefix = ""): { slug: string; data: Frontmatter }[] {
  const out: { slug: string; data: Frontmatter }[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      out.push(...collectPosts(new URL(`${entry.name}/`, dir), `${prefix}${entry.name}/`));
    } else if (entry.name.endsWith(".md")) {
      const raw = readFileSync(new URL(entry.name, dir), "utf-8");
      const { frontmatter } = parseFrontmatter(raw);
      out.push({ slug: `${prefix}${entry.name.replace(/\.md$/, "")}`, data: frontmatter as Frontmatter });
    }
  }
  return out;
}

export default function ogImages(): AstroIntegration {
  let srcDir: URL;
  return {
    name: "og-images",
    hooks: {
      "astro:config:done": ({ config }) => {
        srcDir = config.srcDir;
      },
      "astro:build:done": async ({ dir, logger }) => {
        const blogDir = new URL("blog/", srcDir);
        const outDir = new URL("og-image/", dir);
        mkdirSync(outDir, { recursive: true });

        let count = 0;
        for (const { slug, data } of collectPosts(blogDir)) {
          // Drafts are excluded from production builds; custom ogImage overrides
          // don't need a generated card. (mirrors utils/posts filtering)
          if (data.draft || data.ogImage) continue;
          const target = new URL(`${slug}.png`, outDir);
          mkdirSync(new URL(".", target), { recursive: true });
          const png = await renderOgImage({ title: data.title, date: new Date(data.publishDate) });
          writeFileSync(target, png);
          count++;
        }

        // Site-wide default used by non-post pages.
        writeFileSync(new URL("default.png", outDir), await renderOgImage({ title: SITE.title }));

        // apple-touch-icon at the site root (referenced from BaseHead).
        writeFileSync(new URL("apple-touch-icon.png", dir), renderAppleIcon());

        logger.info(`Generated ${count + 1} OG image(s) + apple-touch-icon`);
      },
    },
  };
}
