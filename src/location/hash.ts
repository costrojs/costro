export default class Hash {
	#defaultHash: string
	currentPath: string
	previousPath: null | string
	#onRouteChange: Function

	constructor({ onRouteChange }: { onRouteChange: Function }) {
		this.#onRouteChange = onRouteChange

		// Get path can returns an empty string and not matched the "/" path
		this.#defaultHash = '/'

		this.currentPath = this.getPath()
		this.previousPath = null

		// this.hashChanged = this.hashChanged.bind(this)
	}

	setPath(path: string) {
		this.previousPath = this.getPath()
		this.currentPath = path

		window.location.hash = path
	}

	getPath(): string {
		return window.location.hash.substr(1) || this.#defaultHash
	}

	addEvents() {
		window.addEventListener('hashchange', this.#hashChanged)
	}

	#hashChanged = (e: Event) => {
		this.previousPath = this.getPreviousPath(e as HashChangeEvent)
		this.currentPath = this.getPath()

		this.#onRouteChange({
			currentPath: this.currentPath,
			previousPath: this.previousPath
		})
	}

	/**
	 * Get the previous route
	 * @param {Event} e Event data
	 * @returns {(String|null)} Previous route or null
	 */
	getPreviousPath(e: HashChangeEvent): string | null {
		return e && e.oldURL ? e.oldURL.split('#')[1] || this.#defaultHash : null
	}
}
