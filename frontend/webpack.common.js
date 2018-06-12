const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")

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
          href:
            "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,600",
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
    alias: {
      Actions: path.resolve(__dirname, "src/actions/"),
      Components: path.resolve(__dirname, "src/components/"),
      Containers: path.resolve(__dirname, "src/containers/"),
      HOC: path.resolve(__dirname, "src/HOC/"),
      Images: path.resolve(__dirname, "src/images/"),
      Mocks: path.resolve(__dirname, "src/mocks/"),
      Redusers: path.resolve(__dirname, "src/reducers"),
      Sagas: path.resolve(__dirname, "src/sagas"),
      Styles: path.resolve(__dirname, "src/styles/"),
      Utils: path.resolve(__dirname, "src/utils/"),
    },
  },
}
