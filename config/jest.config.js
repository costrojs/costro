module.exports = {
	clearMocks: true,
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/tests/fixtures'],
	moduleFileExtensions: ['js', 'ts', 'css'],
	moduleNameMapper: {
		'^@src(.*)$': '<rootDir>/src$1'
	},
	modulePaths: ['<rootDir>/src'],
	preset: 'ts-jest/presets/js-with-babel',
	resetMocks: true,
	resetModules: true,
	rootDir: '../',
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/tests/unit/*.test.js'],
	transform: {
		'^.+\\.(ts|tsx|js)$': [
			'ts-jest',
			{
				babelConfig: {
					plugins: [],
					presets: [
						'@babel/preset-env',
						'@babel/preset-typescript',
						[
							'@babel/preset-react',
							{
								importSource: 'jsx-dom-cjs',
								runtime: 'automatic'
							}
						]
					]
				}
			}
		]
	},
	verbose: true
}
