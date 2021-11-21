module.exports = {
	coverageDirectory: 'coverage',
	moduleFileExtensions: ['js', 'ts', 'css'],
	modulePaths: ['./src'],
	preset: 'ts-jest/presets/js-with-babel',
	resetModules: true,
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(ts|tsx|js)$': 'ts-jest'
	},
	transformIgnorePatterns: ['node_modules/(?!jsx-dom)'],
	verbose: true
}
