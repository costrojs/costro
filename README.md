```js
import { Tunnel } from 'tunnel'
import { createElement, Fragment } from 'jsx-dom'

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
	)
}

function Home() {
	return (
		<div>
			<Navigation />
			<h2>Home</h2>
		</div>
	)
}

function About() {
	return (
		<>
			<Navigation />
			<h2>About</h2>
		</>
	)
}

class Contact extends Component {
	render() {
		return (
			<>
				<Navigation />
				<h2>Contact</h2>
			</>
		)
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
]

const app = new Tunnel({
	target: document.querySelector('#app'),
	mode: 'history',
	routes
})
```

Mode: `history`

```
http://example.com/about
```

Mode: `hash`

```
http://example.com/#/about
```
