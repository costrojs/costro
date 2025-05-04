import type { RouteComponent } from './types'

class Component {
	store: Map<string, object>
	props: any
	route: RouteComponent

	// @ts-ignore
	constructor(props?: any) {
		// @ts-ignore
		this.props = props
		this.route = {
			params: {},
			path: ''
		}
		this.store = new Map()
	}

	/**
	 * Life cycle hook
	 */
	beforeRender() {
		// Lifecycle hook: before rendering the component
	}

	/**
	 * Life cycle hook
	 */
	afterRender() {
		// Lifecycle hook: after rendering the component
	}

	/**
	 * Life cycle hook
	 */
	beforeDestroy() {
		// Lifecycle hook: before the component is destroyed
	}

	/**
	 * Life cycle hook
	 */
	afterDestroy() {
		// Lifecycle hook: after the destruction of the component
	}

	/**
	 * Required function in the child class
	 */
	render() {
		throw new Error('You have to implement the function "render" for the component.')
	}
}

// @ts-ignore
Component.prototype.__isComponent = true

// Used by jsx-dom to check if the function is a class component
// The class will be initialized and the render function automatically called
// @ts-ignore
Component.prototype.isReactComponent = {}

export default Component
