// Webpack v4
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const _root = path.resolve();

const PATHS = {
	src: path.resolve(_root, "src"),
	public: path.resolve(_root, "dist"),
	assets: 'assets'
};

module.exports = {
	// BASE config
	externals: {
		paths: PATHS
	},
	entry: {
		app: `${PATHS.src}/launcher.js`
	},
	output: {
		filename: `${PATHS.assets}/[name].[hash].js`,
		path: PATHS.public,
		publicPath: '/'
	},
	resolve: {
		alias: {
			'~': PATHS.src
		}
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true
			})
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		},
		{
			test: /\.jsx$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		},
		{
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: `${PATHS.assets}/fonts`
			}
		},
		{
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: `${PATHS.assets}/img`
			}
		},
		{
			test: /\.(css|less)$/,
			exclude: '/node_modules/',
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: { sourceMap: true }
				},
				{
					loader: "postcss-loader",
					options: {
						sourceMap: true,
						plugins: [
							require('autoprefixer'),
							require('css-mqpacker'),
							require('cssnano')({
								preset: [
									'default', {
										discardComments: {
											removeAll: true,
										}
									}
								]
							})
						]
					}
				},
				{
					loader: 'less-loader',
					options: { sourceMap: true }
				}
			]
		}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`
		}),
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}/[name].[hash].css`
		}),
		new CopyWebpackPlugin([
			// { from: `${PATHS.src}/${PATHS.assets}/img`, to: `${PATHS.assets}/img` },
			{ from: `${PATHS.src}/${PATHS.assets}/fonts`, to: `${PATHS.assets}/fonts` },
			{ from: `${PATHS.src}/static`, to: './' }
		],
			{ debug: false }
		)
	]
};
