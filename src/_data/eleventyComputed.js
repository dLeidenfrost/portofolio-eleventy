import i18n from "./i18n.js";
import site from "./site.js";

export default {
  // Translation dictionary for the page's language (`lang` comes from pagination or the post folder).
  t: (data) => i18n[data.lang] ?? i18n[site.languages[0]],
};
