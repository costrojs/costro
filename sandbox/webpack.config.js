const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'

	const plugins = [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: resolveApp('src/index.html'),
			inject: false,
			chunks: ['index'],
			minify: true
		})
	]

	if (!isProduction) {
		plugins.push(new webpack.ProgressPlugin())
	}

	return {
		entry: {
			index: resolveApp('src/index.js')
		},
		output: {
			path: resolveApp('dist'),
			filename: 'static/[name].js',
			sourceMapFilename: 'static/[file].map',
			clean: true
		},
		module: {
			rules: [
				{
					include: [resolveApp('src')],
					test: /\.js$/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								configFile: resolveApp('babel.config.js')
							}
						}
					]
				},
				{
					include: [resolveApp('src')],
					test: /\.css$/,
					use: [
						{
							loader: 'css-loader'
						}
					]
				},
				{
					generator: {
						filename: '[name][ext]'
					},
					include: resolveApp('src'),
					test: /\.svg$/i,
					type: 'asset/source'
				}
			]
		},
		devtool: isProduction ? false : 'source-map',
		stats: {
			assets: true,
			assetsSort: '!size',
			children: false,
			chunkModules: false,
			chunks: false,
			colors: true,
			entrypoints: false,
			excludeAssets: /.map$/,
			hash: false,
			modules: false,
			timings: true
		},
		devServer: {
			static: {
				directory: 'build'
			},
			historyApiFallback: true,
			port: 3000,
			compress: true,
			hot: true
		},
		plugins,
		optimization: {
			chunkIds: 'deterministic', // or 'named'
			mergeDuplicateChunks: true,
			minimizer: [
				new TerserPlugin({
					extractComments: false,
					parallel: true,
					terserOptions: {
						compress: {
							// Drop console.log|console.info|console.debug
							// Keep console.warn|console.error
							pure_funcs: ['console.log', 'console.info', 'console.debug']
						}
					}
				}),
				new CssMinimizerPlugin()
			],
			providedExports: false,
			removeAvailableModules: true,
			removeEmptyChunks: true,
			splitChunks: false
		}
	}
}
