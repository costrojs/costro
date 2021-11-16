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
				<Link to="/custom-component">CustomComponent</Link>
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

class CustomComponent extends Component {
	render() {
		return (
			<>
				<Navigation />
				<h2>Custom Component by Function</h2>
			</>
		)
	}
}

function StringByFunction() {
	return `
        ${Link({ to: '/', children: ['Home'] }, true)}
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
    ${Link({ to: '/', children: ['Home'] }, true)}
    <h2>String</h2>
`

const routes = [
	{
		path: '/',
		component: htmlElementByFunction
	},
	{
		path: '/document-fragment-by-function',
		component: documentFragmentByFunction
	},
	{
		path: '/custom-component',
		component: CustomComponent // Don't call <CustomComponent isConnected={true} />
	},
	{
		path: '/string-by-function',
		component: StringByFunction
	},
	{
		path: '/html-element',
		component: htmlElement
	},
	{
		path: '/document-fragment',
		component: documentFragment
	},
	{
		path: '/string',
		component: String
	}
]

// eslint-disable-next-line no-unused-vars
const app = new Tunnel({
	target: document.querySelector('#app'),
	mode: 'history',
	routes
})

window.app = app
