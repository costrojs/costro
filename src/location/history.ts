export default class History {
	currentPath: string;
	previousPath: null|string;
	onRouteChange: Function

	constructor({ onRouteChange }: {onRouteChange: Function}) {
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

	setPath(path: string) {
		this.previousPath = this.getPath();
		this.currentPath = path;

		window.history.pushState(
			{
				path: this.currentPath
			},
			'',
			`${path}`
		);

		this.onRouteChange({
			currentPath: this.currentPath,
			previousPath: this.previousPath
		});
	}

	getPath():string {
		return window.location.pathname;
	}

	addEvents() {
		window.addEventListener('popstate', this.onPopState);
	}

	onPopState() {
		this.previousPath = this.currentPath;
		this.currentPath = this.getPath();

		this.onRouteChange({
			currentPath: this.currentPath,
			previousPath: this.previousPath
		});
	}
}
