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
		hot: true,
		open: true,
		host: "app.rocketbank.com",
		port: "auto",
		historyApiFallback: true,
		static: "./src/assets",
		server: {
			type: "https",
			options: {
				key: "./https/app.key.pem",
				cert: "./https/app.pem",
			},
		},
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
