import { onRouteChangeFunction } from './interface'

export default class Location {
	callback: onRouteChangeFunction
	mode: string
	isHashMode: boolean
	currentPath: null | string

	/**
	 * @constructor
	 * @param {Function} callback On route change callback function
	 * @param {Boolean} mode Location mode (hash|history)
	 */
	constructor(callback: onRouteChangeFunction, mode: string) {
		this.callback = callback
		this.mode = mode
		this.isHashMode = this.mode === 'hash'

		this.currentPath = this.getPath()

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

	/**
	 * On route change
	 */
	onRouteChange() {
		this.currentPath = this.getPath()
		this.callback(this.currentPath)
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

			// In case of empty string, return "/" to match this path
			return index >= 0 ? href.slice(index + 1) : '/'
		} else {
			return window.location.pathname
		}
	}

	/**
	 * Set the new path
	 * @param {String} path New path
	 */
	setPath(path: string) {
		this.currentPath = path

		if (this.isHashMode) {
			window.location.hash = this.currentPath
		} else {
			window.history.pushState({ path: this.currentPath }, '', `${path}`)
			this.callback(this.currentPath)
		}
	}

	/**
	 * Destroy the location
	 */
	destroy() {
		window.removeEventListener(this.isHashMode ? 'hashchange' : 'popstate', this.onRouteChange)
		this.currentPath = null
	}
}
