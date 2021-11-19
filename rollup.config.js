import path from 'path'
import typescript from '@rollup/plugin-typescript'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'

const isProduction = process.env.ENV === 'production'
const outputTarget = path.resolve(__dirname, './dist')
const plugins = [
	typescript({
		include: 'src/**',
		typescript: require('typescript')
	})
]

isProduction && plugins.push(terser())

const builds = {
	'cjs-bundlers': {
		file: `${outputTarget}/tunnel.cjs.js`,
		format: 'cjs'
	},
	'esm-browsers': {
		file: `${outputTarget}/tunnel.esm.browser.js`,
		format: 'es'
	},
	'esm-bundlers': {
		file: `${outputTarget}/tunnel.esm.js`,
		format: 'es'
	},
	'umd-browsers': {
		file: `${outputTarget}/tunnel.js`,
		format: 'umd',
		name: 'Tunnel'
	}
}

const target = isProduction ? Object.keys(builds) : ['umd-browsers']
const selectedTargets = Object.keys(builds).filter((key) => target.includes(key))
export default selectedTargets.map((key) => ({
	input: 'src/index.ts',
	output: builds[key],
	plugins: [
		typescript({
			include: 'src/**',
			typescript: require('typescript')
		})
	].concat(
		key !== 'esm-browsers'
			? [
					buble({
						transforms: { forOf: false }
					})
			  ]
			: []
	)
}))
