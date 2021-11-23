import { h, F } from '../../dist/jsx'
import { Component, Link, navigate } from '../../dist/tunnel'

function Navigation() {
	return (
		<ul>
			<li>
				<Link to="/">htmlElement</Link>
			</li>
			<li>
				<button onClick={() => navigate('/document-fragment')}>documentFragment</button>
			</li>
			<li>
				<Link to="/custom-component-1">CustomComponent 1</Link>
			</li>
			<li>
				<Link to="/custom-component-2">CustomComponent 2</Link>
			</li>
			<li>
				<Link to="/string">String</Link>
			</li>
			<li>
				<Link to="/svg">svgHtmlElement</Link>
			</li>
		</ul>
	)
}

function htmlElement() {
	return (
		<div>
			<Navigation />
			<h2>HTMLElement</h2>
		</div>
	)
}

function documentFragment() {
	return (
		<>
			<Navigation />
			<h2>DocumentFragment</h2>
		</>
	)
}

class CustomComponent1 {
	render() {
		return (
			<>
				<Navigation />
				<h2>Custom Component 1</h2>
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

class CustomComponent2 {
	render() {
		return (
			<>
				<Navigation />
				<h2>Custom Component 2</h2>
				<p>{this.name}</p>
			</>
		)
	}

	beforeRender() {
		this.name = this.getStore('name', '/custom-component-1')
	}
}

function String() {
	return `
        ${Link({ children: ['Home'], to: '/' }, true)}
        <h2>String</h2>
    `
}

const svg = () => (
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
		component: htmlElement,
		path: '/'
	},
	{
		component: documentFragment,
		path: '/document-fragment'
	},
	{
		component: CustomComponent1,
		path: '/custom-component-1',
		props: {
			title: 'home'
		}
	},
	{
		component: CustomComponent2,
		path: '/custom-component-2'
	},
	{
		component: String,
		path: '/string'
	},
	{
		component: svg,
		path: '/svg'
	}
]

export default routes
