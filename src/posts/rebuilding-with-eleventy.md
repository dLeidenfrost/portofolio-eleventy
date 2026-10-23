---
title: Rebuilding my site with Eleventy and zero frameworks
description: Why I replaced WordPress with static HTML, plain TypeScript and CSS, and what Eleventy handles for me.
lede: My old WordPress site was slow and I never wanted to touch it. I replaced it with a static site made of plain HTML, TypeScript and CSS, built with Eleventy.
date: 2026-10-23
draft: true
tags: [eleventy, performance]
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

> [Results: add Lighthouse scores and total page weight once the site is live]
