import Hash from './location/hash';
import History from './location/history';
import { RouteData, interfaceLocationInstances, Route } from './interface';
import Component from './component';

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
		routes: Route[];
	}) {
		this.mode = mode;
		this.target = target;
		this.currentRoute = undefined;
		this.previousRoute = undefined;

		this.routes = this.createRoutesData(routes);
		console.log(this.routes);
		if (!this.routes.size) {
			throw new Error('Tunnel::Invalid routes');
		}

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

	createRoutesData(routes: Route[]): Map<string, RouteData> {
		return new Map(
			routes
				.filter((route): Boolean => route.component instanceof Function)
				.map((route: Route): any => {
					let instance = undefined;

					if (route.component.prototype instanceof Component) {
						instance = new route.component() as any;
						this.setComponentInjection(instance);
					} else {
						instance = route.component();
					}

					return [
						route.path,
						{
							component: instance,
							componentType: this.getComponentType(instance)
						}
					];
				})
				.filter((item): Boolean => {
					const result = !!item[1].component && !!item[1].componentType;
					return result;
				})
		);
	}

	getComponentType(instance: any): string | null {
		if (Object.getPrototypeOf(instance) instanceof Component) {
			return 'Component';
		} else if (instance instanceof HTMLElement) {
			return 'HTMLElement';
		} else if (instance instanceof DocumentFragment) {
			return 'DocumentFragment';
		} else if (typeof instance === 'string') {
			return 'String';
		}

		return null;
	}

	/**
	 * Push new function inside step context to change the route
	 */
	setComponentInjection(instance: any) {
		instance.getPath = (): null | string => {
			return this.location.getPath();
		};
		instance.navigate = (path: string): void => {
			const route = this.routes.get(path);
			route && this.navigate(path);
		};
		instance.getExternalStore = (path: string): any | null => {
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
		if (route.componentType === 'Component') {
			route.component.beforeDestroy();
			this.target.replaceChildren();
			route.component.afterDestroy();
		} else {
			this.target.replaceChildren();
		}
	}

	/**
	 * Create the step
	 * @param {Object} route Route
	 */
	createComponent(route: RouteData) {
		if (route.componentType === 'Component') {
			route.component.beforeRender();
			this.target.appendChild(route.component.render());
			route.component.afterRender();
		} else if (route.componentType === 'HTMLElement') {
			this.target.appendChild(route.component);
		} else if (route.componentType === 'DocumentFragment') {
			this.target.appendChild(route.component);
		} else if (route.componentType === 'String') {
			this.target.insertAdjacentHTML('beforeend', route.component);
		}
	}
}
