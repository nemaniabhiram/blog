---
title: "Hello, world"
description: "First post — and a rendering test for every Markdown feature on this site."
publishDate: 2026-02-18
tags:
  - meta
  - astro
---

{{TODO:hello-world-body}}

This first post doubles as a rendering test: everything below exercises a
Markdown feature so the site's styles can be verified at a glance.

## A second-level heading

Prose can be **bold**, _italic_, or **_both at once_**. It can carry
[a link to somewhere](https://nemaniabhiram.dev/about/) and `inline code`
mid-sentence. Here is a highlight with <mark>a marked phrase</mark> and a
keyboard hint: press <kbd>Ctrl</kbd> + <kbd>K</kbd>.

### A third-level heading

> A blockquote, set in serif italic as a deliberate contrast against the
> mono body. It should feel quiet but distinct.

#### A fourth-level heading

An unordered list:

- First item
- Second item, with a nested list:
  - Nested one
  - Nested two
- Third item

An ordered list:

1. Step one
2. Step two
3. Step three

A table:

| Feature      | Supported | Notes                    |
| ------------ | --------- | ------------------------ |
| Headings     | Yes       | h2–h4 exercised here     |
| Code blocks  | Yes       | Shiki, dual theme        |
| Tables       | Yes       | Horizontal scroll on sm  |

A fenced TypeScript block:

```ts
type Wave = { rows: number; cols: number };

function crest(v: number): boolean {
  // letters surface only at the peaks
  return v > 0.82;
}
```

An image with a caption:

![The site's Telugu monogram](/favicon.svg)

_A decorative caption, styled small and muted._

---

That horizontal rule marks the end of the feature demo.
