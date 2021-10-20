export default class Hash {
	onRouteChange: Function

	constructor({ onRouteChange }: {onRouteChange: Function}) {
		this.onRouteChange = onRouteChange;

		this.hashChanged = this.hashChanged.bind(this);
	}

	setPath(path: string) {
		window.location.hash = path;
	}

	getPath():string {
		return window.location.hash.substr(1);
	}

	addEvents() {
		// window.addEventListener('hashchange', this.hashChanged);
	}

	hashChanged(e: HashChangeEvent) {
		this.onRouteChange({
			currentPath: this.getPath(),
			previousPath: this.getPreviousPath(e) || '/' // todo: why '/'?
		});
	}

	/**
	 * Get the previous route
	 * @param {Event} e Event data
	 * @returns {(String|null)} Previous route or null
	 */
	getPreviousPath(e: HashChangeEvent): string|null {
		return e && e.oldURL ? e.oldURL.split('#')[1] : null;
	}
}
