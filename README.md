# nemaniabhiram.dev

A minimal, fast, zero-backend personal blog for **Abhiram Nemani**.
Built with [Astro 7](https://astro.build), plain CSS, and self-hosted fonts —
fully static, no database, no server runtime.

## Features

- Markdown posts in `src/blog/` — `git push` to `master` publishes.
- Warm monochrome palette (cream light / charcoal dark, ink/off-white accent),
  class-based dark mode with a no-flash theme toggle.
- Mono-first UI (JetBrains Mono) with Inter for display headings.
- Post pages with a sticky, scroll-spied table of contents and per-post Open
  Graph images.
- A signature easter egg: an animated ASCII wave rendered in **Telugu letters**
  in every footer.
- Paginated blog index, tags, `llms.txt`, sitemap, and dual-theme Shiki code.

## Develop

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm check      # astro check (0 errors/warnings/hints)
pnpm build      # static output in dist/ (also renders OG images)
pnpm preview    # serve dist/ locally
```

Requires **Node ≥ 22** and **pnpm** (see `packageManager` in `package.json`).

## Writing posts

Add `src/blog/my-post.md` with frontmatter (`title`, `publishDate`,
`description`, optional `tags`/`coverImage`/`ogImage`/`draft`). The filename is
the slug → `/posts/my-post/`. See [CLAUDE.md](./CLAUDE.md) for full details and
contributor conventions.

## Deploy

Cloudflare Pages (free tier): build command `pnpm build`, output `dist`,
`NODE_VERSION=22`. Every push to `master` deploys.

## License

Source © Abhiram Nemani. Fonts are OFL (Inter, JetBrains Mono, Noto Sans
Telugu, via Fontsource).
