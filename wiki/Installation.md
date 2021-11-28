# Installation

Router can be integrated into a project in several ways depending on the needs.

- Import it as a CDN package on the page
- Download the JavaScript files and host them yourself
- Install it using npm

## CDN

You can use Router via the CDN links and a `<script>` tag. The library will be registered as the global variable `window.Router`.

```html
<script src="https://cdn.jsdelivr.net/npm/router@1" crossorigin></script>
```

## Download and self host

If you prefer self host the JavaScript file, you can download it from the CDN and host it using your own web server. You can then include it using a `<script>` tag.

The files can be browsed and downloaded from the [jsDeliver CDN](https://www.jsdelivr.com/package/npm/router).

## NPM

npm is the recommended installation method when building applications with Router. It works well with module bundlers such as [webpack](https://webpack.js.org) or [Rollup](https://rollupjs.org).

```bash
npm install router
# or
yarn add router
```

> ℹ️ System requirements: Node.js v12 or later
