import path from 'path'
import typescript from '@rollup/plugin-typescript'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'

const isProduction = process.env.ENV === 'production'
const dir = path.resolve(__dirname, './dist')

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: `${dir}/tunnel.js`,
				format: 'umd',
				name: 'Tunnel'
			},
			{
				file: `${dir}/tunnel.esm-bundlers.js`,
				format: 'es'
			},
			{
				file: `${dir}/tunnel.cjs-bundlers.js`,
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
		input: 'src/jsx.js',
		output: [
			{
				file: `${dir}/jsx.js`,
				format: 'umd',
				name: 'JSX'
			}
		],
		plugins: [
			typescript({
				include: 'src/**',
				typescript: require('typescript')
			}),
			buble({ objectAssign: 'Object.assign' })
		].concat(isProduction ? [terser()] : [])
	}
]
