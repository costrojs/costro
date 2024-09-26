# CHANGELOG

## 2.2.0

### New features

- Add asynchronous `beforeRender` hook ([#20](https://github.com/costrojs/costro/pull/20))

## 2.1.2

### Fixes

- Fix missing `.mjs` files and Link with JSX runtime ([#11](https://github.com/costrojs/costro/pull/11))

## 2.1.1

### New features

- Add JSX runtime ([#9](https://github.com/costrojs/costro/pull/9))

## 2.0.1

### ⚠️ Breaking changes

- Minimum supported `Node.js` version is `16.20.0` ([#8](https://github.com/costrojs/costro/pull/8))

### Fixes

- Fix `htmlFor` attribute not transformed ([#7](https://github.com/costrojs/costro/pull/7))

## 1.0.6

### Fixes

- Add fallback for `replaceChildren` support ([#6](https://github.com/costrojs/costro/pull/6))

## 1.0.5

### Fixes

- JSX, trim empty class name ([654582c](https://github.com/costrojs/costro/commit/654582c9710de8746cacd4547086ecee48dc4f2f))

## 1.0.4

### Fixes

- JSX, fix array of children ignored ([#5](https://github.com/costrojs/costro/pull/5))

## 1.0.3

### Fixes

- Fix types for the optional parameter `silentOnNotFound` ([cf2c4a9](https://github.com/costrojs/costro/commit/cf2c4a9fa670aa80f8ae11dc9e6b73736072c6bf))

## 1.0.2

### New features

- Add the `silentOnNotFound` parameter. Useful when the route changes and the application wants to ignore these changes ([#4](https://github.com/costrojs/costro/pull/4))

## 1.0.1

### Fixes

- Fix types for the optional parameter `basePath` ([5973658](https://github.com/costrojs/costro/commit/59736586c5561b4da7331ff3f71856fe5119433b))

## 1.0.0

### Fixes

- Fix broken types for the Link component with `@types/react-dom` ([69444e3](https://github.com/costrojs/costro/commit/69444e33905ccf6897ce3f264eb39b28db892eef), [89e0a0c](https://github.com/costrojs/costro/commit/89e0a0c9305b3ecf82ff7802da931a29322f4e79))

### New features

- Add router base path ([#3](https://github.com/costrojs/costro/pull/3))

## 1.0.0-rc.1

### Fixes

- Fix Link with SVG children ([21392bf](https://github.com/costrojs/costro/commit/21392bffe1eae2e1c6af60ca3a72f7d02b1be55c))
- Fix JSX children with type number ([0cb5d03](https://github.com/costrojs/costro/commit/0cb5d03bb8deeaf585bbab26c0760d733e383929))

### New features

- Documentation has been moved from Wiki to [Github pages](https://costro.js.org)
- Add compatibility with nested components ([46b35b7](https://github.com/costrojs/costro/commit/46b35b781b9761077ea8f0be789077f4c7ff46ce))

## 1.0.0-rc.0

### New features

- First Release Candidate of `Costro` 🚀
