export default class Component {
	constructor() {
		this.store = new Map();
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
		throw new Error('You have to implement the function "render" for the component.');
	}

	/**
	 * Required function in the child class
	 */
	setStore(data) {
		const keys = Object.keys(data);
		for (var i = 0, length = keys.length; i < length; i++) {
			this.store.set(keys[i], data[keys[i]]);
		}
	}

	getStore(key) {
		return key ? this.store.get(key) : this.store;
	}
}
