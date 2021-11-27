import { extend } from './utils'
import { privateGetExternalStore, RouteComponent } from './interface'

class Component {
	store: Map<string, object>
	props: any
	route: RouteComponent
	__getExternalStore!: privateGetExternalStore

	// @ts-ignore
	constructor(props) {
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

	/**
	 * Set the component store
	 * @param {Object} data Data to store
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
	 * @param {String} key Store key
	 * @param {String} path Cmponent path
	 * @returns {(any|null)} Content of the store key
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

// @ts-ignore
Component.prototype.__isComponent = true

export default Component
