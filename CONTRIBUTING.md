# Contributing to Costro

Thanks for being interesting on Costro! Before submitting your contribution, be sure to take a moment and read the following guide.

- [How to contribute to Open Source](https://opensource.guide/how-to-contribute)
- [Building welcoming communities](https://opensource.guide/building-community)

## Installation

1. Make sure that [Node.js](https://nodejs.org) **version 12+** and npm are installed.
2. After cloning the repository, run `npm install` at the root of the repository.
3. To start the development server, run `npm run dev`.

List of NPM scripts available:

**Development**

```bash
# Run development server
npm run dev

# Watch while writing tests
npm run dev:test
```

**Tests**

```bash
# Run ESLint linter
npm run test:eslint

# Run TypeScript types linter
npm run test:types

# Run Markdown linter
npm run test:markdown

# Run unit tests (needs npm run build before)
npm run test:unit

# Run fixtures tests (needs npm run build before)
npm run test:fixtures

# Run all tests (eslint, types, markdown, build, unit, fixtures)
npm run test
```

**TypeScript**

```bash
# Generate TypeScript declaration files
npm run tsc:d:only
```

**Production**

```bash
# Build the source code for distribution
npm run build
```

## Project structure

- `./config` - Contains configuration files for ESLint, Jest, Prettier and Rollup.
- `./docs` - Contains the documentation files for the GitHub Wiki.
- `./src` - Contains the source code. The codebase is written in `ES2015` in TypeScript.
- `./tests/fixtures`- Contains fixtures and a demo build with [webpack](https://webpack.js.org).
- `./tests/unit`- Contains all tests. The unit tests are written with [Jest](https://jestjs.io).
- `./types` - Contains TypeScript type definitions.

## Pull requests

You can learn how to work on your first pull request from this series of free video: [How to Contribute to an Open Source project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

To request a new feature or improvement, you can submit an issue with the [feature template](https://github.com/yoriiis/costro/issues/new?template=feature_request.md).

Keep the pull requests as small as possible, it's much easier to review. Make sure the PR only does one thing, otherwise please split it.

Please ensure the following is done when submitting a pull request:

1. Fork [the repository](https://github.com/yoriiis/costro) and create your branch from `main`.
1. Make sure to test your changes.
1. Make sure test passes, run `npm run test`.

## Tests

All tests are located in the `./tests/unit` folder.

```bash
# Watch while writing tests
npm run dev:unit

# Run the test
npm run test:unit
```

## Code conventions

- Add comments [JSDoc](https://jsdoc.app) and annotations [TypeScript](https://www.typescriptlang.org) on all functions.
- Use `camelCase` for the names and methods of public variables.

## License

By contributing to Costro, you agree that your contributions will be licensed under its [MIT license](https://github.com/yoriiis/costro/blob/main/LICENSE).
