# Store

The component store is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object declared locally in the component itself as a class property.

Components can view, set and get data in their store and also get data from another component.

The store is accessible in the whole context of the Component class, including the lifecycle hooks.

## Store methods​

### store

View the content of the store of the component.

**Signature:**

```ts
store: Map<string, object>
```

**Example:**

```js
import { Component } from 'router';

class Home extends Component {
  constructor(props) {
    super(props);

    console.log(this.store);
  }
}
```

### setStore

Add data to the store of the current component.

**Signature:**

```ts
setStore(data: object): void
```

**Parameters**

| Parameter |   Type   | Description                                                                     |
| --------- | :------: | ------------------------------------------------------------------------------- |
| `data`    | `object` | The data to add in the store. Each keys will be added associated to their value |

**Example:**

```js
import { Component } from 'router';

class Home extends Component {
  constructor(props) {
    super(props);

    this.setStore({
      name: 'John Doe',
      age: 42
    });
  }
}
```

The JSON representation of the component store will be:

```json
{
  "name": "John Doe",
  "age": 42
}
```

### getStore

Get the data associated to the key in the store of the current component or in another component if the optional `path` parameter is specifiated.

**Signature:**

```ts
getStore(key: string, path?: string)
```

**Parameters**

| Parameter |   Type   | Description                                                                                                           |
| --------- | :------: | --------------------------------------------------------------------------------------------------------------------- |
| `key`     | `string` | The key of the data to search in the store                                                                            |
| `path`    | `string` | (Optional) The path of the external component. It must correspond to a valid route path (associated with a component) |

**Returns**

The data associated to the key.

**Examples:**

```js
import { Component } from 'router';

class Home extends Component {
  constructor(props) {
    super(props);

    // Store key "name" from the current component
    this.getStore('name');

    // Store key "name" from the component with the path "/about"
    this.getStore('name', '/about');
  }
}
```
