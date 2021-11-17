import { Tunnel, Link, Component } from '../../dist/tunnel'
import { createElement, Fragment } from 'jsx-dom'

function Navigation() {
	return (
		<ul>
			<li>
				<Link to="/">htmlElementByFunction</Link>
				{/* <button onClick={() => navigate('/')}>Home</button> */}
			</li>
			<li>
				<Link to="/document-fragment-by-function">documentFragmentByFunction</Link>
			</li>
			<li>
				<Link to="/custom-component-1">CustomComponent 1</Link>
			</li>
			<li>
				<Link to="/custom-component-2">CustomComponent 2</Link>
			</li>
			<li>
				<Link to="/string-by-function">StringByFunction</Link>
			</li>
			<li>
				<Link to="/html-element">htmlElement</Link>
			</li>
			<li>
				<Link to="/document-fragment">documentFragment</Link>
			</li>
			<li>
				<Link to="/string">string</Link>
			</li>
		</ul>
	)
}

function htmlElementByFunction() {
	return (
		<div>
			<Navigation />
			<h2>HTMLElement by Function</h2>
		</div>
	)
}

function documentFragmentByFunction() {
	return (
		<>
			<Navigation />
			<h2>DocumentFragment by Function</h2>
		</>
	)
}

class CustomComponent1 extends Component {
	render() {
		return (
			<>
				<Navigation />
				<h2>Custom Component 1 by Function</h2>
				<p>{this.props.title}</p>
			</>
		)
	}

	afterRender() {
		this.setStore({
			name: this.props.title
		})
	}
}

class CustomComponent2 extends Component {
	render() {
		return (
			<>
				<Navigation />
				<h2>Custom Component 2 by Function</h2>
			</>
		)
	}

	afterRender() {
		console.log(this.getStore('name', '/custom-component-1'))
	}
}

function StringByFunction() {
	return `
        ${Link({ children: ['Home'], to: '/' }, true)}
        <h2>String by Function</h2>
    `
}

const htmlElement = (
	<div>
		<Navigation />
		<h2>HTMLElement</h2>
		{/* <CustomComponent isConnected={true} data={{ name: 'John' }} /> */}
	</div>
)

const documentFragment = (
	<>
		<Navigation />
		<h2>DocumentFragment</h2>
	</>
)

const String = `
    ${Link({ children: ['Home'], to: '/' }, true)}
    <h2>String</h2>
`

const routes = [
	{
		component: htmlElementByFunction,
		path: '/'
	},
	{
		component: documentFragmentByFunction,
		path: '/document-fragment-by-function'
	},
	{
		component: CustomComponent1, // Don't call <CustomComponent isConnected={true} />
		path: '/custom-component-1',
		props: {
			title: 'home'
		}
	},
	{
		component: CustomComponent2, // Don't call <CustomComponent isConnected={true} />
		path: '/custom-component-2'
	},
	{
		component: StringByFunction,
		path: '/string-by-function'
	},
	{
		component: htmlElement,
		path: '/html-element'
	},
	{
		component: documentFragment,
		path: '/document-fragment'
	},
	{
		component: String,
		path: '/string'
	}
]

// eslint-disable-next-line no-unused-vars
const app = new Tunnel({
	mode: 'history',
	routes,
	target: document.querySelector('#app')
})

window.app = app
