import postcssImport from 'postcss-import'
import postcssPresetEnv from 'postcss-preset-env'
import postcssNested from 'postcss-nested'
import postcssCustomMedia from 'postcss-custom-media'

export default {
	plugins: [
		postcssImport(),
		postcssPresetEnv({
			features: {
				'custom-properties': {
					preserve: false,
					warnings: true
				}
			},
			stage: 2
		}),
		postcssNested(),
		postcssCustomMedia()
	]
}
