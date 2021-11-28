# Template Syntax

Router templates can be write in template string or with JSX, according to your needs.

## Template string

The template string is the simplest way to define the template of a component.

The component can be a Function component.

```js
const Home = () => {
  return `<h2>Home</h2>`;
};
```

Or, the component can be a ES6 class which extends the `Component` from Router.

```js
import { Component } from 'router';

class About extends Component {
  render() {
    return '<h2>About</h2>';
  }
}
```

## JSX

JSX offer many advantages to write template and is recommended when building large scale applications with Router.

Out of the box, Router provides the `createElement()` and `Fragment()` functions thanks to the `router/jsx` file (only 1Kb). It transforms JSX syntax into valid DOM elements. To optimize the transformed code and pay homage to the [hyperscript](https://github.com/hyperhype/hyperscript), short names are available

- `createElement` => `h`
- `Fragment` => `F`

Import them when using JSX in templates.

The component can be a Function component.

```js
import { h, F } from 'router/jsx';

const Home = () => {
  return <h2>Home</h2>;
};
```

Or, the component can be a ES6 class which extends the `Component` from Router.

```js
import { Component } from 'router';
import { h, F } from 'router/jsx';

class About extends Component {
  render() {
    return <h2>About</h2>;
  }
}
```

### Babel configuration

To transpile JSX, you need the Babel plugin `@babel/plugin-transform-react-jsx` that converts JSX to valid JavaScript code.

```bash
npm install @babel/plugin-transform-react-jsx --save-dev
```

Then, update the Babel configuration to register the plugin and the pragmas.

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "h",
        "pragmaFrag": "F"
      }
    ]
  ]
}
```

> 📝 [Documentation of the `@babel/plugin-transform-react-jsx`](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)

### ESLint configuration

ESLint provide support for JSX syntax with the `eslint-plugin-react` package.

```bash
npm install eslint@7 eslint-plugin-react --save-dev
```

When using ESLint and JSX outside of React/Preact, you needs to:

- Disable `react/display-name`, `react/jsx-key`, `react/prop-types` rules and `version` setting.
- Declare the `pragma` and `fragment`

Example of the ESLint configuration:

```json
{
  "extends": ["plugin:react/recommended"],

  "rules": {
    "react/display-name": 0,
    "react/jsx-key": 0,
    "react/prop-types": 0
  },

  "settings": {
    "react": {
      "pragma": "h",
      "fragment": "F",
      "version": "0"
    }
  }
}
```
