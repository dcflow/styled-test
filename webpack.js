const path = require("path");
const webpack = require("webpack");
const { spawn } = require("child_process");

const { dependencies } = require("./package.json");

const publicPath = "http://localhost:1212/dist/";

const indexPath = path.join(__dirname, "src", "renderer.js");

module.exports = {
  externals: Object.keys(dependencies || {}),

  resolve: {
    extensions: [".js", ".jsx", ".json"],
    modules: [__dirname, "node_modules"]
  },

  devtool: "cheap-module-source-map",

  entry: [indexPath],

  output: {
    publicPath: publicPath,
    filename: "bundle.js",
    libraryTarget: "commonjs2"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: {
          cacheDirectory: true
        }
      }
    ]
  },

  plugins: [new webpack.NamedModulesPlugin()],

  devServer: {
    publicPath,
    port: 1212,
    noInfo: false,
    stats: {
      modules: false,
      errors: true
    },
    headers: { "Acess-Control-Allow-Origin": "*" },
    contentBase: path.join(__dirname, "dist"),
    watchOptions: {
      ignored: /node_modules/
    },
    before() {
      if (process.env.MAIN) {
        spawn("yarn", ["start-main"], {
          shell: true,
          env: process.env,
          stdio: "inherit"
        })
          .on("close", code => process.exit(code))
          .on("error", error => console.error(error));
      }
    }
  }
};
