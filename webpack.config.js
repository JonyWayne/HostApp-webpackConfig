const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Настрйки для host приложения
const { ModuleFederationPlugin } = require("webpack").container;
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "auto",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // Для TypeScript настройки:
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        remoteApp: "remoteApp@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, eager: true }, // Измените на eager: true
        "react-dom": { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ReactRefreshWebpackPlugin({
      overlay: false, // Отключаем overlay для remote
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
    liveReload: false,
    client: {
      overlay: {
        errors: false, // Полностью отключаем overlay
        warnings: false,
        runtimeErrors: false,
      },
      logging: "error",
      reconnect: 5,
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};
