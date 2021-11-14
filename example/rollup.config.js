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
		transforms: ['jsx'],
		jsxPragma: 'createElement',
		jsxFragmentPragma: 'Fragment'
	}),
	buble({
		exclude: ['node_modules/jsx-dom/**'] // Exclude transpilation from jsx-dom
	})
]

if (process.env.ENV === 'production') {
	plugins.push(terser())
}

export default [
	{
		input: path.resolve(__dirname, './src/demo.js'),
		output: [
			{
				file: `${outputTarget}/demo.js`,
				format: 'umd'
			}
		],
		plugins
	}
]
