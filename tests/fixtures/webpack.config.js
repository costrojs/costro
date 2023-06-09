const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	context: __dirname,
	entry: {
		demo: './demo.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							configFile: false,
							plugins: [],
							presets: [
								'@babel/preset-env',
								'@babel/preset-typescript',
								[
									'@babel/preset-react',
									{
										importSource: 'jsx-dom-cjs',
										runtime: 'automatic'
									}
								]
							]
						}
					}
				]
			}
		]
	},
	optimization: {
		chunkIds: 'deterministic',
		mergeDuplicateChunks: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false
			})
		],
		providedExports: false,
		removeAvailableModules: true,
		removeEmptyChunks: true,
		splitChunks: false
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist')
	},
	stats: {
		modules: false
	}
}
