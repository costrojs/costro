export default class History {
	#onRouteChange: Function
	currentPath: string
	previousPath: null | string

	constructor({ onRouteChange }: { onRouteChange: Function }) {
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

	setPath(path: string) {
		this.previousPath = this.getPath()
		this.currentPath = path

		window.history.pushState({ path: this.currentPath }, '', `${path}`)

		this.#onRouteChange({
			currentPath: this.currentPath,
			previousPath: this.previousPath
		})
	}

	getPath(): string {
		return window.location.pathname
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
}
