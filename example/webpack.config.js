const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'

	return {
		devtool: isProduction ? false : 'source-map',
		entry: {
			demo: `${path.resolve(__dirname, './src/demo.js')}`,
			jsx: `${path.resolve(__dirname, './src/jsx.js')}`
		},
		module: {
			rules: [
				{
					include: [path.resolve(__dirname, './src')],
					test: /\.js$/,
					use: [
						{
							loader: 'babel-loader'
						}
					]
				},
				{
					include: [path.resolve(__dirname, './src')],
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								config: {
									path: path.resolve(__dirname, './')
								}
							}
						}
					]
				},
				{
					generator: {
						filename: '[name][ext]'
					},
					include: path.resolve(__dirname, './src/'),
					test: /\.svg$/i,
					type: 'asset/source'
				}
			]
		},
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
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, './dist'),
			sourceMapFilename: '[file].map'
		},
		plugins: [
			new webpack.ProgressPlugin(),
			new MiniCssExtractPlugin({
				chunkFilename: '[name].css',
				filename: '[name].css'
			}),
			new webpack.optimize.ModuleConcatenationPlugin()
		],
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
		watch: !isProduction,
		watchOptions: {
			ignored: /node_modules/
		}
	}
}
