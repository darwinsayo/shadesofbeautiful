module.exports = function (eleventyConfig) {
  // Copy images and CSS straight through to the built site
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

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

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
