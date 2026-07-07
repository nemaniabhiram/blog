import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeUnwrapImages from "rehype-unwrap-images";
import ogImages from "./src/integrations/og-images";

// https://astro.build
export default defineConfig({
  site: "https://nemaniabhiram.dev",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap(), ogImages()],
  markdown: {
    // Dual-theme Shiki; backgrounds are overridden to the site palette in CSS.
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: { light: "vitesse-light", dark: "vitesse-dark" },
      defaultColor: false,
    },
    // Astro 7's default processor is Sätteri; opt into the remark/rehype
    // (`unified`) processor so our rehype plugins run. Shiki + syntaxHighlight
    // above are still applied to this processor.
    processor: unified({
      rehypePlugins: [
        rehypeSlug,
        rehypeUnwrapImages,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            properties: { className: ["heading-anchor"], ariaHidden: "true", tabIndex: -1 },
            // Empty anchor; the visible "#" comes from CSS (.heading-anchor::after)
            // so it doesn't leak into Astro's collected heading text (the TOC).
            content: [],
          },
        ],
        [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
      ],
    }),
  },
});
