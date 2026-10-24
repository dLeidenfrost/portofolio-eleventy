---
title: Rebuilding my site with Eleventy and zero frameworks
description: Why I replaced WordPress with static HTML, plain TypeScript and CSS, and what Eleventy handles for me.
lede: My old WordPress site was slow and I never wanted to touch it. I replaced it with a static site made of plain HTML, TypeScript and CSS, built with Eleventy.
date: 2026-10-23
tags: [eleventy, performance, ai, ai-written]
---

## Why not a framework

I write React and Next.js every day at work. For a personal site with a few pages and a handful of posts, a client-side framework adds JavaScript the reader never needs. Static HTML loads fast, and there is nothing to keep patched.

## Why Eleventy over Hugo

Hugo was the other option. It builds quickly and bundles TypeScript out of the box, but its Go templates were one more thing to learn. Eleventy is JavaScript all the way down, so the config, filters and data files are code I already know how to debug.

## TypeScript with esbuild

Eleventy does not compile TypeScript by itself. A few lines in `eleventy.config.js` run esbuild before every build:

```js eleventy.config.js
import esbuild from "esbuild";

export default function (eleventyConfig) {
  // Bundle and minify the site's TypeScript
  eleventyConfig.on("eleventy.before", async () => {
    await esbuild.build({
      entryPoints: ["src/assets/ts/main.ts"],
      outfile: "_site/assets/main.js",
      bundle: true,
      minify: true,
    });
  });

  eleventyConfig.addPassthroughCopy("src/assets/css");
  return { dir: { input: "src" } };
}
```

## What the browser gets

- HTML generated at build time, one file per page
- One small script, loaded only where a page needs it
- One stylesheet, with custom properties for the light and dark themes

## Results

I ran Lighthouse 13.5 against the live homepage on October 24, 2026. The scores are performance, accessibility, best practices and SEO:

- **Desktop:** 100 / 100 / 100 / 100. Largest contentful paint at 0.4 s.
- **Mobile:** 99 / 100 / 100 / 100. Largest contentful paint at 1.7 s on Lighthouse's simulated slow 4G connection.
- **Both:** 0 ms total blocking time, no layout shift, 6 requests and 61 KiB in total.

The two web fonts make up about 52 KiB of that. The HTML, stylesheet and script together come to under 9 KiB.

The first run scored lower: 88 for performance on mobile, 96 for best practices and 90 for SEO. Four small fixes closed the gap:

- **Self-hosted fonts.** The Google Fonts stylesheet blocked rendering while the browser connected to two more domains. Serving the font files from my own server and preloading them moved mobile contentful paint from 3.1 s to 1.3 s.
- **A favicon.** Without one, the browser asked for `/favicon.ico`, got a 404 and logged a console error.
- **Absolute `hreflang` URLs.** The links between the English and Spanish versions used paths like `/es/`, and `hreflang` requires full URLs.
- **Accessible names that match the visible text.** The language switch showed "es" while screen readers heard "Leer en español", and the theme toggle showed "dark" while they heard "Switch to light mode". Now each label starts with the word on screen.
