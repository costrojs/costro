import { onRouteChangeFunction } from '../interface'

export default class History {
	#onRouteChange: onRouteChangeFunction
	currentPath: string
	previousPath: null | string

	constructor(onRouteChange: onRouteChangeFunction) {
		this.#onRouteChange = onRouteChange
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

	init() {
		this.addEvents()
	}

	addEvents() {
		window.addEventListener('popstate', this.#onPopState)
	}

	#onPopState = () => {
		this.previousPath = this.currentPath
		this.currentPath = this.getPath()

		this.#onRouteChange({
			currentPath: this.currentPath,
			previousPath: this.previousPath
		})
	}

	getPath(): string {
		return window.location.pathname
	}

	setPath(path: string) {
		this.previousPath = this.getPath()
		this.currentPath = path

		window.history.pushState({ path: this.currentPath }, '', `${path}`)

		this.#onRouteChange({
			currentPath: this.currentPath,
			previousPath: this.previousPath
		})
	}
}
