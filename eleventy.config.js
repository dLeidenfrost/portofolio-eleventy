import esbuild from "esbuild";
import markdownIt from "markdown-it";
import Prism from "prismjs";
import loadLanguages from "prismjs/components/index.js";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

import site from "./src/_data/site.js";
import i18n from "./src/_data/i18n.js";

loadLanguages(["typescript", "bash", "json", "toml", "yaml", "markdown"]);

const TS_DIR = "src/assets/ts";

export default function (eleventyConfig) {
  // The theme bootstrap is inlined in <head> so the page never paints in the wrong theme.
  let themeInitScript = "";

  eleventyConfig.on("eleventy.before", async ({ directories, runMode }) => {
    const dev = runMode === "serve" || runMode === "watch";

    await esbuild.build({
      entryPoints: [`${TS_DIR}/main.ts`],
      outfile: `${directories.output}assets/main.js`,
      bundle: true,
      minify: !dev,
      sourcemap: dev,
      target: "es2020",
    });

    const init = await esbuild.build({
      entryPoints: [`${TS_DIR}/theme-init.ts`],
      bundle: true,
      minify: true,
      write: false,
      format: "iife",
      target: "es2020",
    });
    themeInitScript = init.outputFiles[0].text.trim();
  });

  eleventyConfig.addShortcode("themeInitScript", () => themeInitScript);
  eleventyConfig.addShortcode("currentYear", () => String(new Date().getFullYear()));
  eleventyConfig.addWatchTarget(TS_DIR);

  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/files");

  // Markdown: fenced code renders as the design's titled code window.
  // ```js eleventy.config.js  → caption "eleventy.config.js" / "js"
  const md = markdownIt({ html: true, typographer: true });
  md.renderer.rules.fence = (tokens, idx) => {
    const [lang = "", ...rest] = tokens[idx].info.trim().split(/\s+/);
    const filename = rest.join(" ");
    const source = tokens[idx].content.replace(/\n$/, "");
    const grammar = lang && Prism.languages[lang];
    const code = grammar ? Prism.highlight(source, grammar, lang) : md.utils.escapeHtml(source);
    const caption =
      filename || lang
        ? `<figcaption class="code-window__bar"><span>${md.utils.escapeHtml(filename || lang)}</span>${
            filename && lang ? `<span>${md.utils.escapeHtml(lang)}</span>` : ""
          }</figcaption>`
        : "";
    return `<figure class="code-window">${caption}<div class="code-window__scroll"><pre><code${
      lang ? ` class="language-${md.utils.escapeHtml(lang)}"` : ""
    }>${code}</code></pre></div></figure>\n`;
  };
  eleventyConfig.setLibrary("md", md);

  // Collections: posts_<lang> (all, oldest first) and feed_<lang> (published only)
  for (const lang of site.languages) {
    const postsIn = (api) => api.getFilteredByGlob(`src/posts/${lang}/*.md`).sort((a, b) => a.date - b.date);
    eleventyConfig.addCollection(`posts_${lang}`, postsIn);
    eleventyConfig.addCollection(`feed_${lang}`, (api) => postsIn(api).filter((post) => !post.data.draft));
  }

  // Filters
  const pad = (n) => String(n).padStart(2, "0");
  eleventyConfig.addFilter("isoDate", (d) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`);
  eleventyConfig.addFilter("monthDay", (d) => `${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`);
  eleventyConfig.addFilter("newestFirst", (posts = []) => [...posts].reverse());
  eleventyConfig.addFilter("take", (items = [], n) => items.slice(0, n));
  eleventyConfig.addFilter("padEnd", (value, n) => String(value).padEnd(n));
  eleventyConfig.addFilter("readingTime", (html = "") => {
    const words = html.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  });
  eleventyConfig.addFilter("groupByYear", (posts = []) => {
    const groups = new Map();
    for (const post of [...posts].sort((a, b) => b.date - a.date)) {
      const year = post.date.getUTCFullYear();
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(post);
    }
    return [...groups].map(([year, items]) => ({ year, posts: items }));
  });

  // Versions of the current page in every language. Pages match by `routeKey`; posts by
  // `translationKey` (defaults to the file name). Languages without a translation are left out.
  const translationKeyOf = (post) => post.data.translationKey ?? post.page.fileSlug;
  eleventyConfig.addFilter("translations", (collections, { routeKey, post }) =>
    site.languages
      .map((lang) => {
        const url = routeKey
          ? i18n[lang].routes[routeKey]
          : collections[`posts_${lang}`]?.find((other) => translationKeyOf(other) === translationKeyOf(post))?.url;
        return url && { lang, url, hreflang: i18n[lang].htmlLang, switchTo: i18n[lang].switchTo };
      })
      .filter(Boolean),
  );

  for (const lang of site.languages) {
    const t = i18n[lang];
    eleventyConfig.addPlugin(feedPlugin, {
      type: "rss",
      outputPath: t.routes.feed,
      collection: { name: `feed_${lang}`, limit: 20 },
      metadata: {
        language: t.htmlLang,
        title: `${t.writing.title} · ${site.name}`,
        subtitle: t.writing.intro,
        base: new URL(t.routes.home, site.url).href,
        author: { name: site.name, email: site.email },
      },
    });
  }
}

export const config = {
  dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
  templateFormats: ["njk", "md"],
  htmlTemplateEngine: "njk",
  // Posts are plain Markdown so code samples containing {{ }} render untouched.
  markdownTemplateEngine: false,
};
