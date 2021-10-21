module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 6,
		ecmaFeatures: {
			impliedStrict: true,
			experimentalObjectRestSpread: true,
			jsx: true
		},
		sourceType: 'module'
	},

	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true
	},

	extends: ['standard', 'plugin:react/recommended', 'plugin:prettier/recommended'],

	plugins: ['prettier'],

	rules: {
		indent: ['error', 'tab', { ignoredNodes: ['TemplateLiteral > *'] }],
		'no-tabs': 0,
		'no-console': 0,
		semi: [1, 'always'],
		'space-before-function-paren': [
			'error',
			{ anonymous: 'never', named: 'never', asyncArrow: 'always' }
		],
		'react/prop-types': 0,
		'react/display-name': 0,
		'react/jsx-key': 0
	},

	globals: {
		document: false,
		window: false
	},

	settings: {
		react: {
			pragma: 'createElement',
			fragment: 'Fragment',
			version: '0' // Remove the warning of the missing React package
		}
	}
};
