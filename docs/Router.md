<!-- markdownlint-disable MD041 -->

## Getting started

```js
// 1. Define components.
// The "component" can either be a Function component or a Class Component.
// These can be imported from other files.
function Home() {
  return <h2>Home</h2>;
}
class About extends Component {
  render() {
    return <h2>About</h2>;
  }
}

// 2. Define routes.
// Each route should map to a component.
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  }
];

// 3. Create the application instance and pass the routes
const app = new App({
  target: document.querySelector('#app'),
  routes
});
```

You can also check out the live example on [CodeSandbox](https://codesandbox.io).

## Dynamic Routing

Dynamic routes can be achieved by dynamic segments declared in the `path` of the route. Dynamic segments start with a colon. You can have multiple segments in the same route, and they will mapped to the corresponding fields on `this.route.params` in the component class.

In addition to `this.route.params`, the `this.route` object also exposes other useful information such as `this.route.path` (current path in URL). You can see all the details in the [Component reference](Component.md#Component-route-data).

```js
const routes = [
  {
    path: '/person/:id',
    component: Home
  }
];
```

### Not found route

If no route path matches, the active component is automatically destroyed. To display a template instead, declare a component **without** the `path` in the route configuration passed to the app instance.

```js
function NotFound() {
  return <h2>Not found</h2>;
}

const routes = [
  {
    component: NotFound
  }
];
```

## Linking between pages

### Link component

We use the `<Link>` custom component to create links that match route path in the template. This allows the router to change the url without reloading the page.

**Import**

```js
import { Link } from 'costro';
```

**Signature:**

```ts
export declare function Link(options: Options, isHtml: boolean): HTMLElement | string;

type Options = {
  to: string;
  children: any[];
  attrs: {
    [key: string]: string;
  };
};
```

**Parameters**

| Parameter        |           Type            | Description                      |
| ---------------- | :-----------------------: | -------------------------------- |
| options.to       |         `String`          | Route path                       |
| options.children | `(HTMLElement\|String)[]` | The children of the element      |
| options.attrs    |        `...Object`        | The attributes of the element    |
| isHtml           |         `Boolean`         | The function is called from HTML |

**Return**

The output generated as an `HTMLElement` for JSX or a `string` for HTML.

#### Links in JSX

Simple link element

```js
<Link to="/about">About</Link>
// <a href="/about">About</a>
```

Link element with attributes and children.

```js
<Link to="/about" class="link" data-status>
  <span>About</span>
</Link>
// <a href="/about" class="link" data-status><span>About</span></a>
```

#### Links in template string

Simple link element

```js
`${Link(
  {
    to: '/about',
    children: ['About']
  },
  true
)}`;
// <a href="/about">About</a>;
```

Link element with attributes and children.

```js
`${Link(
  {
    to: '/about',
    children: ['About'],
    class: 'link',
    'data-status': true
  },
  true
)}`;
// <a href="/about" class="link" data-status><span>About</span></a>;
```

### navigate

We use the `navigate` function to trigger navigation changes. It can be used with event handling or anywhere in component.

**Import**

```jsx
import { navigate } from 'costro';
```

**Signature:**

```ts
navigate(to: string): void;
```

#### Navigate in event handling

```jsx
<button onClick={() => navigate('/about')}>About</button>
```

#### Navigate in the component

```js
class Home extends Component {
  handleClick() {
    navigate('/about');
  }

  render() {
    return <button onClick={() => this.handleClick()}>About</button>;
  }
}
```

## History mode

The router's default mode is `hash` mode. It uses URL hash to perform URL navigation without reloading the page, e.g. `https://example.com/#/about`.

To not use hash, we can use the router's `history` mode, based on the `history.pushState` API to perform the same behavior, e.g. `https://example.com/about`.

```js
const app = new App({
  mode: 'history',
  target: document.querySelector('#app'),
  routes: []
});
```

When using `history` mode, you need to add a fallback route to your server. If the URL does not match any static element, it must serve the same `index.html` page that your application resides on.

### Example server configurations

The following examples assume you are serving your app from the root folder. If you are deploying to a subfolder, you need to adjust the examples below to use the subfolder path instead of the root folder path (e.g. for Apache, replace `RewriteBase /` with `RewriteBase /subfolder-path/`).

#### Apache

```ini
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### nginx

```ìnit
location / {
  try_files $uri $uri/ /index.html;
}
```
