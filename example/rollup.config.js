import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sucrase from '@rollup/plugin-sucrase'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const outputTarget = path.resolve(__dirname, './dist')
const plugins = [
	resolve(),
	commonjs({
		include: ['node_modules/**', 'dist/**']
	}),
	sucrase({
		transforms: ['jsx'],
		jsxPragma: 'createElement',
		jsxFragmentPragma: 'Fragment'
	}),
	getBabelOutputPlugin({
		configFile: path.resolve(__dirname, '../babel.config.js'),
		allowAllFormats: true
	})
]

if (process.env.ENV === 'production') {
	plugins.push(terser())
}

export default [
	{
		input: './example/src/scripts/demo.js',
		output: [
			{
				file: `${outputTarget}/demo.js`,
				format: 'umd'
			}
		],
		plugins
	}
]
