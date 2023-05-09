module.exports = {
	config: {
		MD013: false, // Line length
		MD024: false, // Multiple headers with the same content
		MD033: false, // No inline HTML
		MD036: false // No emphasis as header
	},
	ignores: ['**/node_modules/**', '.github/PULL_REQUEST_TEMPLATE.md']
}
