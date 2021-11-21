import { onRouteChangeFunction } from '../interface'

export default class History {
	onRouteChange: onRouteChangeFunction
	currentPath: null | string
	previousPath: null | string

	/**
	 * @constructor
	 * @param {Function} onRouteChange On route change callback function
	 */
	constructor(onRouteChange: onRouteChangeFunction) {
		this.onRouteChange = onRouteChange
		this.currentPath = this.getPath()
		this.previousPath = null

		// Set initial state
		window.history.replaceState(
			{
				path: this.currentPath
			},
			''
		)
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
		window.addEventListener('popstate', this.onPopState)
	}

	/**
	 * On pop state event
	 */
	onPopState = () => {
		this.previousPath = this.currentPath
		this.currentPath = this.getPath()

		this.onRouteChange({
			currentPath: this.currentPath,
			previousPath: this.previousPath
		})
	}

	/**
	 * Get the current path
	 * @returns {String} Current path or default path
	 */
	getPath(): string {
		return window.location.pathname
	}

	/**
	 * Set the new path
	 * @param {String} path New path
	 */
	setPath(path: string) {
		this.previousPath = this.getPath()
		this.currentPath = path

		window.history.pushState({ path: this.currentPath }, '', `${path}`)

		this.onRouteChange({
			currentPath: this.currentPath,
			previousPath: this.previousPath
		})
	}

	/**
	 * Destroy the location
	 */
	destroy() {
		window.removeEventListener('popstate', this.onPopState)
		this.currentPath = null
		this.previousPath = null
	}
}
