import { ComponentProps } from './interface'
import { extend } from './utils'

class Component {
	store: Map<string, object>
	isReactComponent = true
	props: ComponentProps

	// @ts-ignore
	constructor(props) {
		// @ts-ignore
		this.props = props
		this.store = new Map()

		// Inject functions as class property
		const keys = Object.keys(this.props.dependencies) as string[]
		for (let i = 0, length = keys.length; i < length; i++) {
			const key = keys[i]
			// @ts-ignore
			this[keys[i]] = this.props.dependencies[keys[i]]
		}
	}

	/**
	 * Life cycle hook
	 */
	beforeRender() {}

	/**
	 * Life cycle hook
	 */
	afterRender() {}

	/**
	 * Life cycle hook
	 */
	beforeDestroy() {}

	/**
	 * Life cycle hook
	 */
	afterDestroy() {}

	/**
	 * Required function in the child class
	 */
	render() {
		throw new Error('You have to implement the function "render" for the component.')
	}

	/**
	 * Required function in the child class
	 */
	setStore(data: any) {
		const keys = Object.keys(data)
		for (var i = 0, length = keys.length; i < length; i++) {
			// Merge store data if key already exists
			if (this.store.has(keys[i])) {
				const store = this.store.get(keys[i])
				const newStore = extend(true, store, data[keys[i]])
				this.store.set(keys[i], newStore)
			} else {
				this.store.set(keys[i], data[keys[i]])
			}
		}
	}

	getStore(key: string) {
		return key ? this.store.get(key) : this.store
	}
}

// @ts-ignore
Component.prototype.isReactComponent = {}

export default Component
