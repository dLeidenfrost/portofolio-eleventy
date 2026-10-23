export default {
  layout: "layouts/post.njk",
  permalink: (data) => `/writing/${data.page.fileSlug}/`,
};
