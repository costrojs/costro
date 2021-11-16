module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
	rules: {
		'declaration-colon-newline-after': null,
		indentation: ['tab', { ignore: 'inside-parens' }],
		'prettier/prettier': true,
		'unit-allowed-list': ['em', 'rem', '%', 'px', 's', 'deg', 'fr', 'vh', 'vw', 'ms'],
		'value-list-comma-newline-after': null
	}
}
