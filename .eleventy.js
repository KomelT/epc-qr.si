import bundlerPlugin from "@11ty/eleventy-plugin-bundle";
import postcss from "postcss";
import postcssMinify from "postcss-minify";

export default (eleventyConfig) => {
  eleventyConfig.addPlugin(bundlerPlugin, {
    transforms: [
      async function (content) {
        if (this.type === "css") {
          const result = await postcss([postcssMinify]).process(content, {
            from: this.page.inputPath,
            to: null,
          });
          return result.css;
        }
        return content;
      },
    ],
  });
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
};
