import i18n from "../_data/i18n.js";

export default {
  layout: "layouts/post.njk",
  // `slug` in front matter overrides the file name, e.g. for a translated URL.
  permalink: (data) => `${i18n[data.lang].routes.writing}${data.slug ?? data.page.fileSlug}/`,
};
