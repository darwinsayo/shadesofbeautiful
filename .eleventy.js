module.exports = function (eleventyConfig) {
  // Copy images and CSS straight through to the built site
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });

  // Dates are read as UTC so a post never shows the day before
  eleventyConfig.addFilter("dateDisplay", (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("dateISO", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("otherPosts", (arr, url, n) => arr.filter((p) => p.url !== url).slice(0, n));
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  // Journal posts, newest first. Posts live in src/journal/*.md
  eleventyConfig.addCollection("journal", (api) =>
    api
      .getFilteredByGlob("src/journal/*.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  // Gear page items: src/gear/*.md, ordered by the "order" field
  eleventyConfig.addCollection("gear", (api) =>
    api
      .getFilteredByGlob("src/gear/*.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => (a.data.order || 99) - (b.data.order || 99))
  );
  eleventyConfig.addFilter("byCategory", (arr, cat) => arr.filter((p) => p.data.category === cat));

  // Every real page, for the sitemap
  eleventyConfig.addCollection("sitemap", (api) =>
    api.getAll().filter((p) => p.url && p.url !== false && !p.url.endsWith(".xml") && !p.url.endsWith(".txt") && !p.data.draft)
  );

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
