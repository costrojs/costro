import { App, Link, Component } from '../../dist/tunnel'
import { h, F } from '../../dist/jsx'

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
			<li>
				<Link to="/svg-html-element">svgHtmlElement</Link>
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

	beforeRender() {
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
				<p>{this.name}</p>
			</>
		)
	}

	beforeRender() {
		this.name = this.getStore('name', '/custom-component-1')
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

const svgHtmlElement = (
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		x="0"
		y="0"
		viewBox="0 0 48 48"
		width="50px"
		height="50px"
	>
		<g>
			<circle id="Oval" className="st0" cx="24" cy="24" r="24" fill="#fbd971" />
			<path
				className="st1"
				d="M24 41.1c-7.6 0-13.7-6.2-13.7-13.7 0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 6.3 5.1 11.4 11.4 11.4s11.4-5.1 11.4-11.4c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1.2 7.6-5.9 13.7-13.5 13.7z"
				fill="#d8b11a"
			/>
			<path
				fill="#e64c3c"
				d="M14.3 12.2c.5-1.1 1.6-1.9 3-1.9 1.8 0 3.1 1.5 3.2 3.2 0 0 .1.4-.1 1.2-.3 1.1-.9 2-1.7 2.8l-4.4 3.8-4.3-3.8c-.8-.7-1.4-1.7-1.7-2.8-.2-.8-.1-1.2-.1-1.2.2-1.8 1.5-3.2 3.2-3.2 1.4 0 2.4.8 2.9 1.9z"
			/>
			<path
				fill="#e64c3c"
				d="M33.6 12.2c.5-1.1 1.6-1.9 3-1.9 1.8 0 3.1 1.5 3.2 3.2 0 0 .1.4-.1 1.2-.3 1.1-.9 2-1.7 2.8l-4.4 3.8-4.3-3.8c-.8-.7-1.4-1.7-1.7-2.8-.2-.8-.1-1.2-.1-1.2.2-1.8 1.5-3.2 3.2-3.2 1.3 0 2.4.8 2.9 1.9z"
			/>
		</g>
	</svg>
)

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
	},
	{
		component: svgHtmlElement,
		path: '/svg-html-element'
	}
]

// eslint-disable-next-line no-unused-vars
const app = new App({
	mode: 'history',
	routes,
	target: document.querySelector('#app')
})

window.app = app
