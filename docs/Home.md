<!-- markdownlint-disable MD041 -->

## What is Costro?

Costro is a new framework with a different approach: helping you **build fast web applications** with a **low level of dependency**. If you are concerned about your app's loading performance, this library makes sense as it is extremely lightweight compared to the competition (only 3 KB).

Costro allows you to create components, store and router, in a single **small** package.

```bash
npm install costro
```

## Motivation

### Virtual DOM

Costro does not use virtual DOM because it is, by definition, slower than carefully crafted manual updates.

> Virtual DOM is pure overhead.
> -- <cite>[Rich Harris](https://svelte.dev/blog/virtual-dom-is-pure-overhead)</cite>

> Virtual DOM is ultimately a round-about way of performing DOM updates.
> -- <cite>[Hajime Yamasaki Vukelic](https://medium.com/@hayavuk/why-virtual-dom-is-slower-2d9b964b4c9e)</cite>

### Template syntax

Costro templates can be write in template string or with JSX, according to your needs.

### Local and global store

Each components has a local store and Costro allows you to access it from any components.
