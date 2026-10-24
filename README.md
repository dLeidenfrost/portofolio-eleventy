# portfolio-eleventy

Personal site and blog for Daniel Martínez Fernández. It's a static site built with [Eleventy](https://www.11ty.dev/), Nunjucks templates, Markdown posts, plain CSS and a small amount of TypeScript bundled with esbuild. It uses no frameworks and no CSS libraries.

## Running it

Requires Node.js 20+.

```sh
npm install
npm run dev        # dev server with live reload at http://localhost:8080
npm run build      # production build into _site/
npm run typecheck  # type-check the TypeScript (esbuild only strips types)
```

`_site/` is a plain folder of static files and can be deployed to any static host.

## Project layout

```
eleventy.config.js        Eleventy config: esbuild step, Markdown setup, collections, filters, RSS feeds
design/                   Original design files (*.dc.html), kept as the visual spec
src/
  _data/
    site.js               Name, links, email, CV path, site URL, list of languages
    i18n.js               All copy per language (en, es), including routes and work history
    stack.js              Rows of the stack.toml block on the home page
    eleventyComputed.js   Exposes the current language's dictionary as `t`
  _includes/
    layouts/base.njk      HTML shell: <head>, theme bootstrap, header, footer, hreflang links
    layouts/post.njk      Blog post layout (meta, prose, previous/next)
    partials/             header.njk, footer.njk
  index.njk               Home page, rendered once per language
  writing.njk             Post archive grouped by year, rendered once per language
  posts/
    en/*.md               English posts
    es/*.md               Spanish posts
  assets/
    css/main.css          The only stylesheet, copied as is
    ts/                   TypeScript, bundled by esbuild
    files/                Downloads (CV PDF), copied as is
```

## How it works

### Build

Before each build, Eleventy's `eleventy.before` hook runs esbuild twice:

- `src/assets/ts/main.ts` is bundled to `_site/assets/main.js` and loaded with `defer`. It wires up the theme toggle and the copy-email button. In `npm run dev` it is unminified and has source maps.
- `src/assets/ts/theme-init.ts` is bundled to a string and inlined in `<head>`. It applies the saved theme before the first paint so the page never flashes the wrong theme.

The CSS and the files in `src/assets/files/` are copied unchanged.

### Theming

The colors are CSS custom properties (`--bg`, `--fg`, `--muted`, `--line`, `--soft`) defined in `main.css`:

- the light values are on `:root`
- the dark values are on `:root[data-theme="dark"]`
- without JavaScript, a `prefers-color-scheme` media query applies the dark values

The theme script sets `data-theme` on `<html>`. It uses the visitor's choice saved in `localStorage` if there is one, and the OS setting otherwise. It also adds a `js` class to `<html>`; elements marked `.js-only` (the theme toggle and the copy button) are hidden when that class is missing.

### Internationalization

- English is the default language and is served at `/`. Latin American Spanish (`es-419`) is served under `/es/`, with translated paths (`/es/escritos/`).
- The home and writing pages are built once per entry in `site.languages` through Eleventy pagination (`alias: lang`). Each page reads its text from `t`, the dictionary for its language in `i18n.js`. The routes for each language live in that same dictionary (`t.routes`).
- Posts get their language from their folder (`src/posts/<lang>/`). A translated post points to its original with `translationKey: <original file name>` and can set its own URL with `slug:`.
- The `translations` filter in the config finds the other-language versions of the current page. The base layout uses them for the `hreflang` links and the language switch in the nav.
- Each language has its own RSS feed (`/rss.xml`, `/es/rss.xml`).

To add a language, add its code to `site.languages`, add a matching dictionary to `i18n.js`, and create `src/posts/<lang>/` with a `<lang>.11tydata.js` that sets `lang`.

## Writing a post

Create `src/posts/en/my-post.md`:

```md
---
title: My post
description: One-sentence summary shown in the archive.
lede: Optional intro shown under the title (falls back to description).
date: 2026-10-23
draft: true
tags: [eleventy]
---

Content…
```

- **Drafts:** a post with `draft: true` only appears with `npm run dev`, where it is labeled "draft". `npm run build` leaves it out entirely: no page, no listing and no RSS entry. Remove the line to publish the post.
- **Reading time:** worked out from the word count.
- **Code blocks:** they render as the titled code window from the design. Put a file name after the language to show it in the header bar:

  ````md
  ```js eleventy.config.js
  export default function (eleventyConfig) {}
  ```
  ````

- **No template syntax in posts:** Markdown isn't run through Nunjucks, so `{{ }}` in code samples prints as written.

## Before deploying

- Set `url` in `src/_data/site.js` to the production domain. The RSS feeds use it to build absolute links.
