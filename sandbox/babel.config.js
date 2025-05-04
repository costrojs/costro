module.exports = (api) => {
	const presets = [
		['@babel/preset-env'],
		[
			'@babel/preset-react',
			{
				runtime: 'automatic',
				// pragma: 'h',
				// pragmaFrag: 'F',
				importSource: 'costro'
			}
		]
	]

	api.cache.using(() => process.env.NODE_ENV)

	if (api.env('test')) {
		plugins.push('babel-plugin-dynamic-import-node')
	}

	return {
		presets
	}
}
