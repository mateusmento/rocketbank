import { Configuration } from "webpack";
import path from "path";
import "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
    entry: "./src/index.jsx",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    devServer: {
        historyApiFallback: {
            index: "/index.html"
        },
        // host: "app.rocketbank.com",
        port: "auto",
        hot: true,
        open: true,
        static: "./src/assets"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: false,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
} as Configuration;
