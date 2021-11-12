module.exports = {
	plugins: [
		require('postcss-import')(),
		require('postcss-preset-env')({
			stage: 2,
			features: {
				'custom-properties': {
					warnings: true,
					preserve: false
				}
			}
		}),
		require('postcss-nested')(),
		require('postcss-custom-media')()
	]
}
