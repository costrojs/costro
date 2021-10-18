export default class Component {
	constructor() {
		this.state = new Map();
	}

	/**
	 * Optional function
	 */
	afterRender() {}

	/**
	 * Required function in the child class
	 */
	render() {
		throw new Error('You have to implement the function "render" for the component.');
	}

	/**
	 * Required function in the child class
	 */
	setState(data) {
		Object.keys(data).forEach((key) => this.state.set(key, data[key]));
	}

	getState(key) {
		return key ? this.state.get(key) : this.state;
	}
}
