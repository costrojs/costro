import { extend } from './utils'
import { privateGetExternalStore } from './interface'

class Component {
	#store: Map<string, object>
	props: any
	__getExternalStore!: privateGetExternalStore

	// @ts-ignore
	constructor(props) {
		// @ts-ignore
		this.props = props
		this.#store = new Map()
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

	setStore(data: any) {
		const keys = Object.keys(data) as string[]
		for (let i = 0, length = keys.length; i < length; i++) {
			// Merge store data if key already exists
			if (this.#store.has(keys[i])) {
				const store = this.#store.get(keys[i])
				const newStore = extend(true, store, data[keys[i]])
				this.#store.set(keys[i], newStore)
			} else {
				this.#store.set(keys[i], data[keys[i]])
			}
		}
	}

	getStore(key: string, path?: string): object | undefined | null {
		if (key) {
			if (path) {
				return this.__getExternalStore(key, path)
			}

			return this.#store.get(key)
		}

		return null
	}
}

// The flag is used by the jsx-dom library to initialize the Component class
// @ts-ignore
Component.prototype.isReactComponent = {}
// @ts-ignore
Component.prototype.__isComponent = {}

export default Component
