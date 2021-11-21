module.exports = {
	coverageDirectory: 'coverage',
	moduleFileExtensions: ['js', 'ts', 'css'],
	moduleNameMapper: {
		'^@src(.*)$': '<rootDir>/src$1'
	},
	modulePaths: ['./src'],
	preset: 'ts-jest/presets/js-with-babel',
	resetModules: true,
	rootDir: '../',
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/tests/unit/*.test.js'],
	transform: {
		'^.+\\.(ts|tsx|js)$': 'ts-jest'
	},
	transformIgnorePatterns: ['node_modules/(?!jsx-dom)'],
	verbose: true
}
