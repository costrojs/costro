import { onRouteChangeFunction } from './interface'

export default class Location {
	callback: onRouteChangeFunction
	mode: string
	isHashMode: boolean
	defaultPath: string
	currentPath: null | string
	previousPath: null | string

	/**
	 * @constructor
	 * @param {Function} callback On route change callback function
	 * @param {Boolean} mode Location mode (hash|history)
	 */
	constructor(callback: onRouteChangeFunction, mode: string) {
		this.callback = callback
		this.mode = mode
		this.isHashMode = this.mode === 'hash'

		// The getPath function can returns an empty string and not matched the "/" path
		this.defaultPath = '/'

		this.currentPath = this.getPath()
		this.previousPath = null

		this.onRouteChange = this.onRouteChange.bind(this)
	}

	/**
	 * Initialize the location
	 */
	init() {
		this.addEvents()
	}

	/**
	 * Add events listeners
	 */
	addEvents() {
		window.addEventListener(this.isHashMode ? 'hashchange' : 'popstate', this.onRouteChange)
	}

	onRouteChange = (e: Event) => {
		this.previousPath = this.isHashMode
			? this.getPreviousPath(e as HashChangeEvent)
			: this.currentPath
		this.currentPath = this.getPath()

		this.callback({
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
		return e && e.oldURL ? e.oldURL.split('#')[1] || this.defaultPath : null
	}

	/**
	 * Get the current path
	 * @returns {String} Current path or default path
	 */
	getPath(): string {
		if (this.isHashMode) {
			// Get the path differently according to the Firefox bug
			// https://bugzilla.mozilla.org/show_bug.cgi?id=378962
			const href = window.location.href
			const index = href.indexOf('#')

			return index >= 0 ? href.slice(index + 1) : this.defaultPath
		} else {
			return window.location.pathname
		}
	}

	/**
	 * Set the new path
	 * @param {String} path New path
	 */
	setPath(path: string) {
		this.previousPath = this.getPath()
		this.currentPath = path

		if (this.isHashMode) {
			window.location.hash = path
		} else {
			window.history.pushState({ path: this.currentPath }, '', `${path}`)

			this.callback({
				currentPath: this.currentPath,
				previousPath: this.previousPath
			})
		}
	}

	/**
	 * Destroy the location
	 */
	destroy() {
		window.removeEventListener(this.isHashMode ? 'hashchange' : 'popstate', this.onRouteChange)

		this.currentPath = null
		this.previousPath = null
	}
}
