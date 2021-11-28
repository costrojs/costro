# Component

## Creating an Application Instance

Every Router application starts by creating a new application instance with the `App` function:

```js
import { App } from 'router';

const app = App({
  target: document.querySelector('#app'),
  routes: [],
  mode: 'hash'
});
```

The `App` constructor accepts the following parameters:

| Arguments |     Type      | Default | Description                                   |
| --------- | :-----------: | :-----: | --------------------------------------------- |
| target    | `HTMLElement` | `null`  | Unique `HTMLElement` to build the application |
| routes    |  `string[]`   |  `[]`   | List of route definition                      |
| mode      |   `string`    | `hash`  | Router mode (`hash\|history`)                 |

## Components and Props

Function and Class Components

The simplest way to define a component is to write a JavaScript function:

Function Component

```js
function Welcome(props) {
  return <h2>Hello, {props.name}</h2>;
}
```

ES6 Class Component

```js
class Welcome extends Component {
  render() {
    return <h2>Hello, {this.props.name}</h2>;
  }
}
```

Class component have life cycle hooks

And expose the following properties

| Property                              | Description                           |
| ------------------------------------- | ------------------------------------- |
| `store`                               | Component store (`key`, `value`)      |
| `setStore(key: string, value: any)`   | Set data to the store                 |
| `getStore(key: string, path: string)` | Get data from local or external store |
| `route`                               | Get route data (`path`, `params`)     |

```js
this.store;
this.setStore();
this.getStore();
this.route; // => path and params
```
