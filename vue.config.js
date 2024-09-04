const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/imdbAPI": {
        target: "https://sg.media-imdb.com/suggests",
        changeOrigin: true,
        pathRewrite: { "^/imdbAPI": "" },
      },

      "/omdbAPI": {
        target: "https://www.omdbapi.com/",
        changeOrigin: true,
        pathRewrite: { "^/omdbAPI": "" },
      },
    },
  },
});
