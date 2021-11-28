# Application

## Creating an Application Instance

Every Router application starts by creating a new application instance with the `App` class:

```js
import { App } from 'router';

const app = new App({
  target: document.querySelector('#app'),
  routes: [],
  mode: 'hash'
});
```

**Signature:**

```ts
App({
  target,
  routes,
  mode = 'hash'
}: {
  target: HTMLElement
  routes: Route[]
  mode: string
});
```

**Parameter**

| Parameter |     Type      | Description                                    |
| --------- | :-----------: | ---------------------------------------------- |
| target    | `HTMLElement` | Unique `HTMLElement` to build the application  |
| routes    |  `string[]`   | List of route definition                       |
| mode      |   `string`    | Router mode (`hash\|history`). Default `hash`. |
