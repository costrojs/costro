import { onRouteChangeFunction } from './interface'

export default class Location {
	callback: onRouteChangeFunction
	mode: string
	basePath: string
	isHashMode: boolean
	currentPath: string

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Function} options.callback On route change callback function
	 * @param {Boolean} options.mode Location mode (hash|history)
	 * @param {Boolean} options.basePath Site base path
	 */
	constructor({
		callback,
		mode,
		basePath
	}: {
		basePath: string
		callback: onRouteChangeFunction
		mode: string
	}) {
		this.callback = callback
		this.mode = mode
		this.basePath = this.normalizeBasePath(basePath)
		this.isHashMode = this.mode === 'hash'

		this.currentPath = this.getPath()

		this.onRouteChange = this.onRouteChange.bind(this)
	}

	/**
	 * Normalize the site base path
	 * Add leading slash and remove trailing slash
	 * @param {String} basePath Base path
	 * @returns {String} Normalized base path
	 */
	normalizeBasePath(basePath: string): string {
		return basePath.replace(/\/+$/, '').replace(/^\/*/, '/')
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
	 * In history mode, the path does not contains the base path
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
			return this.stripBasePath(window.location.pathname, this.basePath)
		}
	}

	/**
	 * Extract the base path from the pathname
	 * @param {String} pathname Loation pathname
	 * @param {String} basePath Normalized base path
	 * @returns {String} Pathname without the base path
	 */
	stripBasePath(pathname: string, basePath: string): string {
		// Default base path
		if (basePath === '/') return pathname

		if (!pathname.toLowerCase().startsWith(basePath.toLowerCase())) {
			throw new Error(
				'Location::stripBasePath | Invalid basepath, the pathname does not start with base path'
			)
		}

		return pathname.slice(basePath.length) || '/'
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
			let newPath = this.currentPath

			// Concatenate base path only if not default
			if (this.basePath !== '/') {
				newPath = this.basePath + this.currentPath
			}

			window.history.pushState({ path: newPath }, '', newPath)
			this.callback(this.currentPath)
		}
	}

	/**
	 * Destroy the location
	 */
	destroy() {
		window.removeEventListener(this.isHashMode ? 'hashchange' : 'popstate', this.onRouteChange)
		// @ts-ignore Use only for the destroy context
		this.currentPath = null
	}
}
