import path from 'path'
import typescript from '@rollup/plugin-typescript'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'

const isProduction = process.env.ENV === 'production'
const dir = path.resolve(__dirname, '../dist')
const banner =
	'/*!\n' +
	` * Costro v${require('../package.json').version}\n` +
	` * (c) 2020-${new Date().getFullYear()} Yoriiis\n` +
	' * Released under the MIT License.\n' +
	' */'

// Use custom Terser configuration to remove the Microsoft copyright from tslib and keep the banner plugin
// Terser is executed after the banner plugin
const terserConfig = terser({
	format: {
		comments: (node, comment) => {
			if (comment.type === 'comment2') {
				return /Yoriiis/i.test(comment.value)
			}
		}
	}
})

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				banner,
				exports: 'named',
				file: `${dir}/costro.js`,
				format: 'umd',
				name: 'Costro'
			},
			{
				banner,
				exports: 'named',
				file: `${dir}/costro.esm.js`,
				format: 'es'
			},
			{
				banner,
				exports: 'named',
				file: `${dir}/costro.cjs.js`,
				format: 'cjs'
			}
		],
		plugins: [
			typescript({
				include: 'src/**',
				typescript: require('typescript')
			}),
			buble({ transforms: { forOf: false } })
		].concat(isProduction ? [terserConfig] : [])
	},
	{
		input: 'src/jsx.ts',
		output: [
			{
				banner,
				file: `${dir}/jsx.js`,
				format: 'umd',
				name: 'Costro.jsx'
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
		].concat(isProduction ? [terserConfig] : [])
	}
]
