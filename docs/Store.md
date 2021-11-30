<!-- markdownlint-disable MD041 -->

The component store is a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object declared locally in the component itself as a class property. Components can view, set and get data in their store and also get data from another component. The store is accessible in the whole context of the Component class, including the lifecycle hooks.

## Store property

### store

View the content of the store of the component.

**Signature:**

<!-- prettier-ignore -->
```ts
type store = Map<string, object>
```

**Example:**

```js
class Home extends Component {
  constructor(props) {
    super(props);

    console.log(this.store);
  }
}
```

## Store methods​

### setStore

Add data to the store of the component.

**Signature:**

```ts
setStore(data: object): void
```

**Parameters**

| Parameter |   Type   | Description                                                                     |
| --------- | :------: | ------------------------------------------------------------------------------- |
| `data`    | `object` | The data to add to the store. Each key will be added associated with its value. |

**Example:**

```js
class Home extends Component {
  constructor(props) {
    super(props);

    this.setStore({
      name: 'John Doe'
    });
  }
}
```

The JSON representation of the component store will be:

```json
{
  "name": "John Doe"
}
```

### getStore

Get the data associated with the key in the component store or in another component if the optional `path` parameter is specified.

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
class Home extends Component {
  constructor(props) {
    super(props);

    // The "name" key in the component store
    this.getStore('name');

    // The "name" key in the external component "/about"
    this.getStore('name', '/about');
  }
}
```

Try it on [CodeSandbox](https://codesandbox.io).
