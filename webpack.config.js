const path = require("path");
const packageJson = require("./package.json");

module.exports = {
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules|testing/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".css"],
  },
  output: {
    filename: `feedback-v${packageJson.version}.js`,
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: true,
  },
};
