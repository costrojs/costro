# Application

## Creating an Application Instance

Every Costro application starts by creating a new application instance with the `App` class:

```js
import { App } from 'costro';

const app = new App({
  target: document.querySelector('#app'),
  routes: [
    {
      path: '/',
      component: () => '<h2>Home</h2>'
    }
  ]
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
  routes: RouteConfig[]
  mode: string
});
```

Type declaration for RouteConfig:

<!-- prettier-ignore -->
```ts
type RouteConfig = {
  path: string
  component: Component
  props: any
};
```

**Parameter**

| Parameter |      Type       | Description                                    |
| --------- | :-------------: | ---------------------------------------------- |
| target    |  `HTMLElement`  | Unique `HTMLElement` to build the application  |
| routes    | `RouteConfig[]` | Route definition list                          |
| mode      |    `string`     | Router mode (`hash\|history`). Default `hash`. |
