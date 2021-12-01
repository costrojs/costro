<!-- markdownlint-disable MD041 -->

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

Try it on [CodeSandbox](https://codesandbox.io).

**Signature:**

<!-- prettier-ignore -->
```ts
export declare class App {
  constructor(options: Options)
}

type Options = {
  target: HTMLElement
  routes: RouteConfig[]
  mode: string
};

type RouteConfig = {
  path: string
  component: Component
  props: any
};
```

**Parameters**

| Parameter |      Type       | Description                                    |
| --------- | :-------------: | ---------------------------------------------- |
| target    |  `HTMLElement`  | Unique `HTMLElement` to build the application. |
| routes    | `RouteConfig[]` | Route definition. list                         |
| mode      |    `string`     | Router mode (`hash\|history`). Default `hash`. |
