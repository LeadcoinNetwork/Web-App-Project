const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const fs = require("fs")
const webpackUtils = require("./webpack.utils.js")

webpackUtils.JestUpdateModuleResoultionPacker()

module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/index.js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    new Dotenv({ systemvars: true, safe: true }),
    new ExtractTextPlugin("bundle.css"),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      inject: false,
      template: require("html-webpack-template"),
      lang: "en-US",
      title: "Leadcoin",
      links: [
        {
          href: "/fonts/source-sans.css",
          rel: "stylesheet",
        },
      ],
      mobile: true,
      appMountId: "root",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve("@storybook/addon-storysource/loader")],
        enforce: "pre",
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-object-rest-spread",
            "transform-class-properties",
          ],
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        // fallback: "style-loader",
        // use: [
        //   {
        //     loader: "css-loader",
        //     options: {
        //       minimize: true,
        //       sourceMap: true
        //     }
        //   },
        //   {
        //     loader: "postcss-loader",
        //     options: {
        //       sourceMap: true
        //     }
        //   },
        //   {
        //     loader: "sass-loader",
        //     options: {
        //       sourceMap: true
        //     }
        //   }
        // ]
        // })
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[hash].[ext]",
        },
      },
    ],
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")],
    extensions: [".js"],
    alias: webpackUtils.getAliasesFromRootSrcForWebPack(),
  },
}
