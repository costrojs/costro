# Store

The component store is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object declared locally in the component itself as a class property.

Components can view, set and get data in their store and also get data from another component.

The store is accessible in the whole context of the Component class, including the lifecycle hooks.

## Store methods​

### store

View the content of the store of the component.

```js
import { Component } from 'router';

class Home extends Component {
  render() {
    console.log(this.store);
  }
}
```

### setStore

`setStore(Object):void`

Add data to the store of the current component.

```js
import { Component } from 'router';

class Home extends Component {
  render() {
    this.setStore({
      name: 'John Doe',
      age: 42
    });
  }
}
```

### getStore

`getStore(key: string, path?: string)`

Get the data associated to the key in the current store or in another component if the optional `path` parameter is declared.

The `path` must correspond to a valid route path (associated with a component) defined when creating the application instance.

```js
import { Component } from 'router';

class Home extends Component {
  render() {
    // Store key "name" from the current component
    this.getStore('name');

    // Store key "name" from the component with the path "/about"
    this.getStore('name', '/about');
  }
}
```
