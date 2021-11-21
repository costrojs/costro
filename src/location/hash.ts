import { onRouteChangeFunction } from '../interface'

export default class Hash {
	#defaultHash: string
	currentPath: null | string
	previousPath: null | string
	#onRouteChange: onRouteChangeFunction

	/**
	 * @constructor
	 * @param {Function} onRouteChange On route change callback function
	 */
	constructor(onRouteChange: onRouteChangeFunction) {
		this.#onRouteChange = onRouteChange

		// The getPath function can returns an empty string and not matched the "/" path
		this.#defaultHash = '/'

		this.currentPath = this.getPath()
		this.previousPath = null
	}

	/**
	 * Inititlize the location
	 */
	init() {
		this.addEvents()
	}

	/**
	 * Add events listeners
	 */
	addEvents() {
		window.addEventListener('hashchange', this.#hashChanged)
	}

	/**
	 * On hash change event
	 * @private
	 * @param {Event}  e Event data
	 */
	#hashChanged = (e: Event) => {
		this.previousPath = this.getPreviousPath(e as HashChangeEvent)
		this.currentPath = this.getPath()

		this.#onRouteChange({
			currentPath: this.currentPath,
			previousPath: this.previousPath
		})
	}

	/**
	 * Get the previous path
	 * @param {Event} e Event data
	 * @returns {(String|null)} Previous route or default hash or null
	 */
	getPreviousPath(e: HashChangeEvent): string | null {
		return e && e.oldURL ? e.oldURL.split('#')[1] || this.#defaultHash : null
	}

	/**
	 * Get the current path
	 * @returns {String} Current path or default path
	 */
	getPath(): string {
		// Get the path differently according to the Firefox bug
		// https://bugzilla.mozilla.org/show_bug.cgi?id=378962
		const href = window.location.href
		const index = href.indexOf('#')

		return index >= 0 ? href.slice(index + 1) : this.#defaultHash
	}

	/**
	 * Set the new path
	 * @param {String} path New path
	 */
	setPath(path: string) {
		this.previousPath = this.getPath()
		this.currentPath = path

		window.location.hash = path
	}

	/**
	 * Destroy the location
	 */
	destroy() {
		window.removeEventListener('hashchange', this.#hashChanged)
		this.currentPath = null
		this.previousPath = null
	}
}
