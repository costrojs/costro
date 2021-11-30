<!-- markdownlint-disable MD041 -->

Costro templates can be write in template string or with JSX, according to your needs.

## Template string

The template string is the simplest way to define the template of a component.

The component can be a Function component.

```js
const Home = () => {
  return `<h2>Home</h2>`;
};
```

Or, the component can be a ES6 class which extends the `Component` from Costro.

```js
class About extends Component {
  render() {
    return '<h2>About</h2>';
  }
}
```

## JSX ⚡

Out of the box, Costro provides the `createElement()` and `Fragment()` functions to transforms JSX syntax into valid DOM elements.

Import the `costro/jsx` file when using JSX in templates (only 1Kb).

To further optimize the size of the generated file and pay homage to the [hyperscript](https://github.com/hyperhype/hyperscript), short names are available:

- `createElement` => `h`
- `Fragment` => `F`

> 💡 JSX is recommended when building large scale applications with Costro.
>
> Costro is also compatible with the [jsx-dom](https://github.com/proteriax/jsx-dom) package.

**Import**

```jsx
import { h, F } from 'costro/jsx';
```

The component can be a Function component.

```js
const Home = () => {
  return <h2>Home</h2>;
};
```

Or, the component can be a ES6 class which extends the `Component` from Costro.

```js
class About extends Component {
  render() {
    return <h2>About</h2>;
  }
}
```

> You can use `class` or `className` for CSS classes.

### Fragments

```js
class About extends Component {
  render() {
    return (
      <>
        <h2>About</h2>
        <p>Fragment</p>
      </>
    );
  }
}
```

### SVG inside JSX

Costro applies the SVG attributes as they are written. This means that you can copy and paste unmodified SVG directly into your code and have them work right away.

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
