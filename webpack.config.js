const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/index.js",
    myWorks: "./src/my-works.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.exec\.js$/,
        use: ["script-loader"]
      }
    ]
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Login Page",
      template: "./src/pug/index.pug",
      excludeChunks: ["myWorks"],
      hash: true
    }),
    new HtmlWebpackPlugin({
      title: "My Works",
      filename: "my-works.html",
      template: "./src/pug/my-works.pug",
      chunks: ["myWorks"],
      hash: true
    }),
    new CleanWebpackPlugin(["dist"]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
/*optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};*/
