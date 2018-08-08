const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const webpackUtils = require("./webpack.utils.js")

// webpackUtils.JestUpdateModuleResoultionPacker()

module.exports = {
  entry: {
    app: process.env.WEBPACK_TEST
      ? ["./src/utils/entry-for-test-webpack.js"]
      : ["babel-polyfill", "./src/index.js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: "/",
  },
  plugins: [
    new Dotenv({ systemvars: true, safe: true }),
    new ExtractTextPlugin("bundle.css"),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      inject: false,
      // filename: path.resolve(__dirname, "index.html"),
      template: "./webpack.template.html", // we want to support htmlClass property.
      lang: "en-US",
      htmlClass: "ldc-ltr",
      title: "Leadcoin",
      links: [
        {
          type: "image/png",
          rel: "shortcut icon",
          href: "/images/favicon.png",
        },
        {
          href: "/fonts/source-sans.css",
          rel: "stylesheet",
        },
        {
          href: "https://use.fontawesome.com/releases/v5.0.13/css/all.css",
          rel: "stylesheet",
          integrity:
            "sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp",
          crossorigin: "anonymous",
        },
      ],
      mobile: true,
      appMountId: "root",
    }),
  ],
  module: {
    rules: [
      process.env.WEBPACK_ENV == "production"
        ? // We are in production. // sets by webpack.prod.js
          {
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
              // Do not add RTL. Create simple CSS. the webpack.prod.js, will create RTL Bundle
              use: [
                "css-loader",
                "sass-loader",
                "./webpack.rtl.duplicate.js", //It takes a CSS syntax and returns SASS Syntax
                "sass-loader",
              ],
            }),
          }
        : // We are in development.  Add style-loader
          {
            test: /\.(scss|css)$/,
            use: [
              "style-loader",
              "css-loader",
              "sass-loader",
              "./webpack.rtl.duplicate.js", //It take a CSS syntax and returns SASS Syntax
              "sass-loader",
            ],
          },
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve("@storybook/addon-storysource/loader")],
        enforce: "pre",
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[hash].[ext]",
        },
      },
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")],
    extensions: [".js", ".ts", ".json"],
    alias: webpackUtils.getAliasesFromRootSrcForWebPack(),
  },
}
