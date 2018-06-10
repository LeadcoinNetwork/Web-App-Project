const Autoprefixer = require("autoprefixer")

module.exports = {
  plugins: [
    new Autoprefixer({
      browsers: [`last 15 versions`],
    }),
  ],
}
