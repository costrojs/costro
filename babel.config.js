module.exports = (api) => {
	const presets = [
		[
			'@babel/preset-env',
			{
				targets: {
					node: '12.14.0'
				}
			}
		]
	]

	const plugins = [
		// '@babel/plugin-proposal-class-properties',
		[
			'@babel/plugin-transform-react-jsx',
			{
				pragma: 'createElement',
				pragmaFrag: 'Fragment'
			}
		]
	]

	api.cache.using(() => process.env.NODE_ENV)

	if (api.env('test')) {
		plugins.push('babel-plugin-dynamic-import-node')
	}

	return {
		presets,
		plugins
	}
}
