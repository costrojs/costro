# Router

```js
import { Tunnel } from 'tunnel';
import { createElement, Fragment } from 'jsx-dom';

function Navigation() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
        {/* <button onClick={() => navigate('/')}>Home</button> */}
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  );
}

function Home() {
  return (
    <div>
      <Navigation />
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <>
      <Navigation />
      <h2>About</h2>
    </>
  );
}

class Contact extends Component {
  render() {
    return (
      <>
        <Navigation />
        <h2>Contact</h2>
      </>
    );
  }
}

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/contact',
    component: Contact
  }
];

const app = new Tunnel({
  target: document.querySelector('#app'),
  mode: 'history',
  routes
});
```

Mode: `history`

```text
http://example.com/about
```

Mode: `hash`

```text
http://example.com/#/about
```

## Installation

```html
<script src="https://cdn.jsdelivr.net/npm/router/dist/tunnel.js"></script>
<!-- umd -->
<script>
  const { Link, Component, App, navigate } = Tunnel;
</script>
```

```bash
npm i router
```

```js
import { Link, Component, App, navigate } from 'router';
```

If you add a target="\_blank" to your a element, you must omit the `onClick={() => navigate('/')}` handler.

```ini
# Apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
