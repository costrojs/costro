module.exports = {
	env: {
		browser: true,
		es6: true,
		jest: true,
		node: true
	},

	extends: [
		'standard',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:typescript-sort-keys/recommended'
	],

	globals: {
		document: false,
		window: false
	},

	// parser: '@babel/eslint-parser',
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			impliedStrict: true,
			jsx: true
		},
		ecmaVersion: 6,
		sourceType: 'module'
	},

	plugins: ['prettier', '@typescript-eslint'],

	rules: {
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		indent: ['error', 'tab', { ignoredNodes: ['TemplateLiteral > *'] }],
		'no-console': 0,
		'no-tabs': 0,
		'react/display-name': 0,
		'react/jsx-key': 0,
		'react/prop-types': 0,
		'sort-keys': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: true }],
		'space-before-function-paren': [
			'error',
			{ anonymous: 'never', asyncArrow: 'always', named: 'never' }
		],
		'typescript-sort-keys/interface': [
			'error',
			'asc',
			{ caseSensitive: true, natural: true, requiredFirst: false }
		]
	},

	settings: {
		react: {
			fragment: 'Fragment',
			pragma: 'createElement',
			version: '0' // Remove the warning of the missing React package
		}
	}
}
