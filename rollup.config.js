import path from 'path'
import typescript from '@rollup/plugin-typescript'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'

const outputTarget = path.resolve(__dirname, './dist')
const plugins = [
	typescript({
		include: 'src/**',
		typescript: require('typescript')
	}),
	buble({
		// transforms: { spreadRest: false }
	})
]

const isProduction = process.env.ENV === 'production'

if (isProduction) {
	plugins.push(terser())
}

export default [
	{
		input: 'src/index.ts',
		output: [
			// CommonJS for bundlers
			{
				file: `${outputTarget}/tunnel.cjs.js`,
				format: 'cjs',
				name: 'Tunnel'
			},
			// ES module for bundlers
			{
				file: `${outputTarget}/tunnel.esm.js`,
				format: 'es',
				name: 'Tunnel'
			},
			// Browser
			{
				file: `${outputTarget}/tunnel.js`,
				format: 'umd',
				name: 'Tunnel'
			}
		],
		plugins
	}
]
