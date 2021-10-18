export default class History {
	constructor({ onRouteChange }) {
		this.currentPath = this.getPath();
		this.previousPath = null;

		this.onRouteChange = onRouteChange;

		// Set initial state
		window.history.replaceState(
			{
				path: this.currentPath
			},
			''
		);

		this.onPopState = this.onPopState.bind(this);
	}

	setPath(path) {
		this.previousPath = this.getPath();
		this.currentPath = path;

		window.history.pushState(
			{
				path: this.currentPath
			},
			null,
			`${path}`
		);

		this.onRouteChange({
			currentPath: this.currentPath,
			previousPath: this.previousPath
		});
	}

	getPath() {
		return window.location.pathname;
	}

	addEvents() {
		window.addEventListener('popstate', this.onPopState);
	}

	onPopState(e) {
		this.previousPath = this.currentPath;
		this.currentPath = this.getPath();

		this.onRouteChange({
			currentPath: this.currentPath,
			previousPath: this.previousPath
		});
	}
}
