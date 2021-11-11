export default class Hash {
	onRouteChange: Function;
	defaultHash: string;

	constructor({ onRouteChange }: { onRouteChange: Function }) {
		this.onRouteChange = onRouteChange;

		// Get path can returns an empty string and not matched the "/" path
		this.defaultHash = '/';

		this.hashChanged = this.hashChanged.bind(this);
	}

	setPath(path: string) {
		window.location.hash = path;
	}

	getPath(): string {
		return window.location.hash.substr(1) || this.defaultHash;
	}

	addEvents() {
		window.addEventListener('hashchange', this.hashChanged);
	}

	hashChanged(e: Event) {
		this.onRouteChange({
			currentPath: this.getPath(),
			previousPath: this.getPreviousPath(e as HashChangeEvent)
		});
	}

	/**
	 * Get the previous route
	 * @param {Event} e Event data
	 * @returns {(String|null)} Previous route or null
	 */
	getPreviousPath(e: HashChangeEvent): string | null {
		return e && e.oldURL ? e.oldURL.split('#')[1] || this.defaultHash : null;
	}
}
