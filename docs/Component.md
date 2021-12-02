<!-- markdownlint-disable MD041 -->

## Function and Class Components

The simplest way to define a component is to write a JavaScript function:

Component as a function

```js
function Welcome(props) {
  return <h2>Hello, {props.name}</h2>;
}
```

Component as an ES6 Class

```js
import { Component } from 'costro';

class Welcome extends Component {
  render() {
    return <h2>Hello, {this.props.name}</h2>;
  }
}
```

## Transform a Function to a Class

You can transform a function component to a class component with the following steps:

1. Create an ES6 class with the same name, that extends `Component`.
2. Add a single method `render()`.
3. Move the content of the function into the `render()` method.
4. Replace `props` with `this.props` in the `render()` content.

## Props

Props are inputs accepted by components.

The function component accepts a single `props` object argument with data as a parameter. The class component has the same principle except that the `props` are exposed in the context of the class with `this.props`.

For example, the following code renders "Hello, John Doe" on the page.

Props on a function component

```js
const Home = (props) => `<h2>Hello, ${props.name}</h2>`;
```

Props on a class component

```js
const Home = class Home extends Component {
  render() {
    return `<h2>Hello, ${this.props.name}</h2>`;
  }
};
```

Inject props in the route

```js
new App({
  target: document.querySelector('#app'),
  routes: [
    {
      path: '/',
      component: Home,
      props: {
        name: 'John Doe'
      }
    }
  ]
});
```

Try it on [CodeSandbox](https://codesandbox.io/s/costro-props-9noop).

## Lifecycle hooks

Lifecycle hooks are available on **Class Components** only.

We can declare special methods on the component class to run some code when a component is rendered or destroyed.

Try it on [CodeSandbox](https://codesandbox.io/s/costro-lifecycle-5v9d8).

### beforeRender

The `beforeRender()` method runs before the component output has been rendered to the DOM.

```js
class Welcome extends Component {
  beforeRender() {
    // The component is not yet rendered to the DOM
  }

  render() {
    return <h2>Welcome</h2>;
  }
}
```

### afterRender

The `afterRender()` method runs after the component output has been rendered to the DOM.

```js
class Welcome extends Component {
  render() {
    return <h2>Welcome</h2>;
  }

  afterRender() {
    // The component is rendered to the DOM
  }
}
```

### beforeDestroy

The `beforeDestroy()` method runs before the component has been removed to the DOM.

```js
class Welcome extends Component {
  beforeDestroy() {
    // The component is not yet removed from the DOM
  }

  render() {
    return <h2>Welcome</h2>;
  }
}
```

### afterDestroy

The `afterDestroy()` method runs after the component has been removed to the DOM.

```js
class Welcome extends Component {
  render() {
    return <h2>Welcome</h2>;
  }

  afterDestroy() {
    // The component is removed from the DOM
  }
}
```

## Update the view

Updating the view manually during state changes is much faster than using a virtual DOM with diff algorithms.

The following example updates the UI every second.

```js
class Clock extends Component {
  render() {
    return (
      <h2>
        It is <span id="time">{new Date().toLocaleTimeString()}</span>.
      </h2>
    );
  }

  afterRender() {
    const element = document.getElementById('time');
    this.timer = setInterval(() => {
      element.textContent = new Date().toLocaleTimeString();
    }, 1000);
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }
}
```

Try it on [CodeSandbox](https://codesandbox.io/s/costro-clock-4tilh).

## Component route data

The component class exposes the `route` data as a class property.

**Signature:**

<!-- prettier-ignore -->
```ts
type route = {
  path: string
  params: {
    [key: string]: string
  };
};
```

**Returns**

Current path in URL and list of dynamic segments with their values.

```json
// Route path "/person/:id"
{
  "path": "/person/42",
  "params": {
    "id": 42
  }
}
```

**Example:**

```js
class Person extends Component {
  render() {
    return <h2>Person ID: {this.route.params.id}</h2>;
  }
}
```

Try it on [CodeSandbox](https://codesandbox.io/s/costro-dynamic-segments-3q8up).
