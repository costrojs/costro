export default class Hash {
	constructor({ onRouteChange }) {
		this.onRouteChange = onRouteChange;
		this.hashChanged = this.hashChanged.bind(this);
	}

	setPath(path) {
		window.location.hash = path;
	}

	getPath() {
		return window.location.hash.substr(1);
	}

	addEvents() {
		window.addEventListener('hashchange', this.hashChanged);
	}

	hashChanged(e) {
		this.onRouteChange({
			currentPath: this.getPath(),
			previousPath: this.getPreviousPath(e)
		});
	}

	/**
	 * Get the previous route
	 * @param {Event} e Event data
	 * @returns {(String|null)} Previous route or null
	 */
	getPreviousPath(e) {
		return e && e.oldURL ? e.oldURL.split('#')[1] : null;
	}
}
