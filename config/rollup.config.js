import path from 'path'
import typescript from '@rollup/plugin-typescript'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'

const isProduction = process.env.ENV === 'production'
const dir = path.resolve(__dirname, '../dist')
const banner =
	'/*!\n' +
	` * Tunnel v${require('../package.json').version}\n` +
	` * (c) 2020-${new Date().getFullYear()} Yoriiis\n` +
	' * Released under the MIT License.\n' +
	' */'

export default [
	{
		// external: ['tslib'], // Used to remove Microsoft copyright from tslib
		input: 'src/index.ts',
		output: [
			{
				banner,
				file: `${dir}/tunnel.js`,
				format: 'umd',
				name: 'Tunnel'
			},
			{
				banner,
				file: `${dir}/tunnel.esm.js`,
				format: 'es'
			},
			{
				banner,
				file: `${dir}/tunnel.cjs.js`,
				format: 'cjs'
			}
		],
		plugins: [
			typescript({
				include: 'src/**',
				typescript: require('typescript')
			}),
			buble()
		].concat(isProduction ? [terser()] : [])
	},
	{
		// external: ['tslib'], // Used to remove Microsoft copyright from tslib
		input: 'src/jsx.ts',
		output: [
			{
				banner,
				file: `${dir}/jsx.js`,
				format: 'umd',
				name: 'Tunnel.jsx'
			},
			{
				banner,
				file: `${dir}/jsx.esm.js`,
				format: 'es'
			},
			{
				banner,
				file: `${dir}/jsx.cjs.js`,
				format: 'cjs'
			}
		],
		plugins: [
			typescript({
				include: 'src/**',
				typescript: require('typescript')
			}),
			buble()
		].concat(isProduction ? [terser()] : [])
	}
]
