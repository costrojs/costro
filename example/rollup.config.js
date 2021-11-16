import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sucrase from '@rollup/plugin-sucrase'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'

const outputTarget = path.resolve(__dirname, './dist')
const plugins = [
	resolve(),
	commonjs({
		include: ['node_modules/**', 'dist/**'] // Include the library development dist directory
	}),
	sucrase({
		jsxFragmentPragma: 'Fragment',
		jsxPragma: 'createElement',
		transforms: ['jsx']
	}),
	buble({
		exclude: ['node_modules/jsx-dom/**'] // Exclude transpilation from jsx-dom
	})
]

const isProduction = process.env.ENV === 'production'

if (isProduction) {
	plugins.push(terser())
}

export default [
	{
		input: path.resolve(__dirname, './src/demo.js'),
		onwarn: (warning, warn) => {
			// Skip certain warnings
			if (['THIS_IS_UNDEFINED', 'SOURCEMAP_ERROR'].includes(warning.code)) return

			// Use default for everything else
			warn(warning)
		},
		output: [
			{
				file: `${outputTarget}/demo.js`,
				format: 'umd'
				// sourcemap: false
			}
		],
		plugins
	}
]
