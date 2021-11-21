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
							plugins: [
								[
									'@babel/plugin-transform-react-jsx',
									{
										pragma: 'h', // createElement or h
										pragmaFrag: 'F' // Fragment or F
									}
								]
							],
							presets: [['@babel/preset-env']]
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
	}
}
