import { Configuration } from "webpack";
import path from "path";
import "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        historyApiFallback: {
            index: "/index.html"
        },
        port: "auto",
        hot: true,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: false,
        }),
    ]
} as Configuration;
