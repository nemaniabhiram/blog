# CLAUDE.md — agent guide for nemaniabhiram.dev

A minimal, fast, zero-backend personal blog. Astro 7, static output, plain CSS.
Push to `master` → Cloudflare Pages rebuilds and publishes.

## Golden rules

- **pnpm only.** Never `npm` or `bun`. `pnpm-lock.yaml` is committed; keep it in
  sync. `packageManager` is pinned in `package.json`.
- **No new frameworks.** Plain CSS with custom properties only — no Tailwind, no
  CSS preprocessors, no React/CMS. Styling lives in `src/styles/global.css` plus
  scoped `<style>` blocks in `.astro` files.
- **All colors come from CSS variables** defined in `src/styles/global.css`
  (`--color-*`, `--space-*`, `--radius-*`, fonts). Never hardcode a hex color in
  a component. No pure `#000` / `#fff` for backgrounds or body text.
- **The Telugu wave in `src/components/TeluguWave.astro` is a feature, not dead
  code — do not remove it.** It renders in every footer (an animated ASCII wave
  drawn with Telugu letters). Its glyph ramps live in `src/data/telugu.ts` and
  are shared with the OG image generator.
- **Keep `{{TODO:…}}` tokens verbatim** until the owner supplies real content.
  They mark content the owner must fill in (see the bottom of this file). Do not
  invent content for them.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server (drafts visible; OG images are build-only) |
| `pnpm check` | `astro check` — must be 0 errors / 0 warnings / 0 hints |
| `pnpm build` | Static build into `dist/` (also generates OG PNGs) |
| `pnpm preview` | Serve the built `dist/` locally |

## Writing a post

1. Add `src/blog/my-post.md`. The filename is the slug → `/posts/my-post/`.
2. Frontmatter (schema in `src/content.config.ts`): `title`, `publishDate`,
   `description` (10–160 chars, required); optional `tags`, `coverImage`,
   `ogImage`, `draft`.
3. Images: put files in `public/` and reference with a leading slash:
   `![caption](/photo.jpg)`.
4. Commit, push to `master`. `draft: true` posts are excluded from production
   builds (index, tags, sitemap, `llms.txt`, OG) but visible in `pnpm dev`.

## Layout of the code

- `src/data/` — `constants.ts` (SITE, MENU_LINKS, SOCIAL_LINKS) and `telugu.ts`
  (glyph ramps for the wave + OG glyph row).
- `src/utils/` — `date.ts` (formatting), `posts.ts` (draft-filtering, sort,
  tags), `og.ts` (satori → resvg OG renderer).
- `src/layouts/` — `Base.astro` (head/header/footer shell), `BlogPost.astro`
  (hero + prose + sticky TOC rail + back-to-top).
- `src/components/` — Header, Footer, ThemeToggle, SocialList, PostPreview,
  Paginator, Toc, BackToTop, TeluguWave, BaseHead.
- `src/integrations/og-images.ts` — build hook that writes `dist/og-image/*.png`.

## Things worth knowing (non-obvious)

- **Markdown processor.** Astro 7's default Markdown engine changed (Sätteri).
  To run our rehype plugins we use `markdown.processor: unified({...})` from
  `@astrojs/markdown-remark`; `shikiConfig` stays top-level and still applies.
- **OG images are a build hook, not a route.** `trailingSlash: "always"` (which
  we keep for clean page URLs) appends a slash to dynamic `.png` endpoints in
  Astro 7 and breaks them. So `src/integrations/og-images.ts` renders PNGs in
  `astro:build:done` instead. satori needs **static (non-variable) WOFF** fonts —
  hence the `@fontsource/*` (non-variable) packages alongside the variable ones
  used for the site UI.
- **Theme.** Class-based dark mode (`.dark` on `<html>`); a blocking inline
  script in `BaseHead.astro` sets it before first paint to avoid a flash.

## Deploy

Cloudflare Pages: build `pnpm build`, output `dist`, `NODE_VERSION=22`. Every
push to `master` deploys.

## Owner TODO tokens (grep `{{TODO`)

`site-description`, `about-bio`, `github-url`, `x-url`, `linkedin-url`, `email`,
`hello-world-body`.
