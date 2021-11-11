import Hash from './location/hash';
import History from './location/history';
import { RouteData, interfaceLocationInstances, Route } from './interface';

const LOCATION_INSTANCES: interfaceLocationInstances = {
	hash: Hash,
	history: History
};

export default class Tunnel {
	target: HTMLElement;
	mode: string;
	routes: Map<string, RouteData>;
	location: any;
	currentRoute: undefined | RouteData;
	previousRoute: undefined | RouteData;

	constructor({
		target,
		mode = 'hash',
		routes
	}: {
		target: HTMLElement;
		mode: string;
		routes: Array<Route>;
	}) {
		this.mode = mode;
		this.target = target;
		this.currentRoute = undefined;
		this.previousRoute = undefined;

		this.routes = this.createRoutesMap(routes);

		this.onNavigate = this.onNavigate.bind(this);

		const LocationInstance = this.getLocationInstance(mode);
		this.location = new LocationInstance({
			onRouteChange: this.onRouteChange.bind(this)
		});
		this.location.addEvents();

		this.addEvents();
		this.onRouteChange({
			currentPath: this.location.getPath()
		});
	}

	createRoutesMap(routes: Array<Route>): Map<string, RouteData> {
		return new Map(
			routes.map((route: Route) => {
				const component = new route.component();
				this.setComponentInjection(component);
				return [
					route.path,
					{
						component
					}
				];
			})
		);
	}

	/**
	 * Push new function inside step context to change the route
	 */
	setComponentInjection(component: any) {
		component.getPath = (): null | string => {
			return this.location.getPath();
		};
		component.navigate = (path: string): void => {
			const route = this.routes.get(path);
			route && this.navigate(path);
		};
		component.getExternalStore = (path: string): any | null => {
			const route = this.routes.get(path);
			return route ? route.component.getStore() : null;
		};
	}

	getLocationInstance(mode: string): any {
		const LocationInstance: any = LOCATION_INSTANCES[mode];
		if (LocationInstance) {
			return LocationInstance;
		}
		throw new Error(`Router :: Unknown mode "${mode}"`);
	}

	addEvents() {
		document.addEventListener('navigate', this.onNavigate);
	}

	onNavigate(e: Event) {
		const { path } = (<CustomEvent>e).detail;
		typeof path === 'string' && this.navigate(path);
	}

	navigate(path: string) {
		this.location.setPath(path);
	}

	/**
	 * Event listener for the hash change
	 * @param {Event} e Event data
	 */
	onRouteChange({
		currentPath,
		previousPath = null
	}: {
		currentPath: string;
		previousPath?: null | string;
	}) {
		if (currentPath) {
			this.currentRoute = this.routes.get(currentPath);

			// Check if route exist
			if (this.currentRoute) {
				if (previousPath) {
					this.previousRoute = this.routes.get(previousPath);
					if (this.previousRoute) {
						this.previousRoute && this.destroyComponent(this.previousRoute);
					}
				}
				this.createComponent(this.currentRoute);
			} else {
				console.warn('Unknown route');
			}
		}
	}

	/**
	 * Destroy the step
	 * @param {Object} route Route to destroy
	 */
	destroyComponent(route: RouteData) {
		route.component.beforeDestroy();
		this.target.replaceChildren();
		route.component.afterDestroy();
	}

	/**
	 * Create the step
	 * @param {Object} route Route
	 */
	createComponent(route: RouteData) {
		route.component.beforeRender();
		this.render(route.component.render());
		route.component.afterRender();
	}

	/**
	 * Render the step template
	 * @param {HTMLElement} template Step template
	 */
	render(template: HTMLElement | string) {
		if (template instanceof HTMLElement) {
			this.target.appendChild(template);
		} else {
			this.target.insertAdjacentHTML('beforeend', template);
		}
	}
}
