# Costro

![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/costrojs/costro/ci.yml?branch=main&style=for-the-badge) [![Coverage Status](https://img.shields.io/coveralls/github/costrojs/costro?style=for-the-badge)](https://coveralls.io/github/costrojs/costro?branch=main)

<p align="center">
    <a href="https://costro.js.org" title="Costro">
        <img src="https://yoriiis.github.io/cdn/static/costro/costro-1280.png" alt="Costro logo" width="250" />
    </a>
</p>

## What is Costro?

Costro is a new lightweight framework with a different approach: helping you **build fast web applications** with a **low level of dependency**. If you are concerned about your app's loading performance, this library makes sense as it is extremely lightweight compared to the competition _(only 3 KB)_.

Costro allows you to create components with store and a router in one lightweight easy-to-use package. It does not use virtual DOM because it is, by definition, slower than carefully crafted manual updates.

### Motivation

1. Finding the framework that matches your needs without impacting web performance is not that easy these days. Popular librairies generally embed more and more code as the community and popularity increase.
2. Single Web Applications do not benefit from page reloading to improve performance, so the JavaScript code embedded during the first load is heavier.
3. In addition, we do not use 100% of the features included in the frontend frameworks and generally, the dependency part can be larger than the actual written code.

## Features

- [**Components**](https://costro.js.org/docs/component) - Create function and class component.
- [**Router**](https://costro.js.org/docs/router) - Map components to the routes.
- [**Store**](https://costro.js.org/docs/store) - Access component store from any component.
- [**Lifecycle hooks**](https://costro.js.org/docs/component#lifecycle-hooks) - Take advantage of component lifecycle events.
- [**Props**](https://costro.js.org/docs/component#props) - Inject props into components.
- [**Template string or JSX**](https://costro.js.org/docs/template-syntax) - Write your templates in a native Template String or in JSX.
- [**JSX compiler**](https://costro.js.org/docs/template-syntax#jsx-) - Transforms JSX syntax into valid DOM elements _(only 1KB)_.
- [**CLI**](https://costro.js.org/cli) - Create a new Costro app in seconds with an interactive experience.

## Documentation

You can find the Costro documentation and examples on the [Costro website](https://costro.js.org).

## Questions

For questions and support please use the [GitHub Discussions](https://github.com/costrojs/costro/discussions). For bug report or feature request, please use the [issues on GitHub](https://github.com/costrojs/costro/issues).<br />Pull Requests are welcome!

## Used by

- [Prisma Media](https://www.prismamedia.com)

## Browser support

It uses modern JavaScript to be as light as possible and therefore only works on the latest version of modern browsers (e.g. Chrome, Firefox, Edge, Safari, Opera).

## Licence

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2021-present, Yoriiis (Joris DANIEL)
