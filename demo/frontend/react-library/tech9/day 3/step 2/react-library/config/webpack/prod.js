// production config
const merge = require("webpack-merge");
const { resolve } = require("path");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  entry: [
    "react-hot-loader/patch", // activate HMR for React
    "webpack-dev-server/client?http://localhost:4200", // bundle the client for webpack-dev-server and connect to the provided endpoint
    "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
    "./index.tsx" // the entry point of our app
  ],
  devServer: {
    hot: true, // enable HMR on the server
    port: 4200,
    historyApiFallback: true
  },
  output: {
    filename: "js/bundle.[hash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: "source-map",
  plugins: []
});
