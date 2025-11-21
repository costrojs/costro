import type { privateGetExternalStore, RouteComponent } from './types'
import { extend } from './utils'

class Component {
	store: Map<string, object>
	props: any
	route: RouteComponent
	__getExternalStore!: privateGetExternalStore

	constructor(props?: any) {
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

	/**
	 * Set the component store
	 * @param data Data to store
	 */
	setStore(data: any) {
		const keys = Object.keys(data) as string[]
		for (let i = 0, length = keys.length; i < length; i++) {
			const key = keys[i]
			// Merge store data if key already exists
			if (this.store.has(key)) {
				const value = this.store.get(key)
				const newValue = extend(true, { [key]: value }, { [key]: data[key] })
				this.store.set(key, newValue[key])
			} else {
				this.store.set(key, data[key])
			}
		}
	}

	/**
	 * Get store from a key
	 * Store can be retrieved from an external Component
	 * @param key Store key
	 * @param path Cmponent path
	 * @returns Content of the store key
	 */
	getStore(key: string, path?: string): object | undefined | null {
		if (key) {
			if (path) {
				return this.__getExternalStore(key, path)
			}

			return this.store.get(key)
		}

		return null
	}
}

// @ts-expect-error
Component.prototype.__isComponent = true

// Used by jsx-dom to check if the function is a class component
// The class will be initialized and the render function automatically called
// @ts-expect-error
Component.prototype.isReactComponent = {}

export default Component
