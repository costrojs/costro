import Hash from './location/hash';
import History from './location/history';

export const LIFECYCLE_HOOKS = ['beforeRender', 'afterRender', 'beforeDestroy', 'afterDestroy'];

const LOCATION = {
	hash: Hash,
	history: History
};

export interface location2 {
	[key: string]: any
}

export interface Route {
	name: string,
	path: string,
	component: any
}

export interface Route2 {
	path: string,
	component: any
}

export default class Tunnel {
	mode: string;
	routes: Map<string, Route2>;
	target: HTMLElement;
	location: any;

	currentRoute: null|string;
	previousRoute: null|string;
	currentPath: null|string;

	constructor({ target, routes, mode = 'hash' }: {target: HTMLElement, routes: Array<Route>, mode: string}) {
		this.mode = mode;

		this.routes = new Map(
			routes.map((route) => {
				const component = new route.component(); // eslint-disable-line new-cap

				// Push new function inside step context to change the route
				component.getRoute = (): null|string => {
					const path = this.location.getPath();
					return this.getRouteFromPath(path);
				};
				component.navigate = (route: string): void => {
					const component = this.routes.get(route);
					component && this.navigate(component.path);
				};
				component.getExternalStore = (route: string): any|null => {
					const component = this.routes.get(route);
					return component ? component.component.getStore() : null;
				};

				return [
					route.name,
					{
						path: route.path,
						component
					}
				];
			})
		);

		this.target = target;
		this.currentRoute = null;
		this.previousRoute = null;
		this.currentPath = null;

		this.onNavigate = this.onNavigate.bind(this);
		this.onUpdateLinkHref = this.onUpdateLinkHref.bind(this);

		this.location = new (LOCATION as location2)[this.mode]({
			onRouteChange: this.onRouteChange.bind(this)
		});
		this.location.addEvents();

		this.addEvents();
		this.onRouteChange({
			currentPath: this.location.getPath()
		});
	}

	addEvents() {
        //@ts-ignore
		document.addEventListener('navigate', this.onNavigate);
        //@ts-ignore
		document.addEventListener('updateLinkHref', this.onUpdateLinkHref);
	}

	onNavigate(e: CustomEvent) {
		const { route } = e.detail;

		if (route) {
			const component = this.routes.get(route);
			if (component) {
				this.navigate(component.path);
			}
		}
	}

	onUpdateLinkHref(e: CustomEvent) {
		const { element, route } = e.detail;
		if (element && route) {
			const component = this.routes.get(route);
			if (component) {
				element.setAttribute('href', component.path);
			}
		}
	}

	navigate(path: string) {
		this.location.setPath(path);
	}

	/**
	 * Event listener for the hash change
	 * @param {Event} e Event data
	 */
	onRouteChange({ currentPath, previousPath = null }: {currentPath: string, previousPath?: null|string}) {
		this.currentRoute = this.getRouteFromPath(currentPath);
		this.previousRoute = this.getRouteFromPath(previousPath);

		if (this.currentRoute) {
			// Check if route exist
			if (this.routes.get(this.currentRoute)) {
				this.previousRoute && this.destroyComponent(this.previousRoute);
				this.createComponent(this.currentRoute);
			} else {
				console.warn('Unknown route');
			}
		}
	}

	/**
	 * Get route name from route path
	 * @param {String} path Route path
	 * @returns {String} Route name
	 */
	getRouteFromPath(path: null|string): null|string {
		let route = null;
		for (const step of this.routes.entries()) {
			if (step[1].path === path) {
				route = step[0];
				break;
			}
		}
		return route;
	}

	/**
	 * Destroy the step
	 * @param {String} route Route to destroy
	 */
	destroyComponent(route: string) {
		const currentComponent = this.routes.get(route);

		if (currentComponent) {
			currentComponent.component.beforeDestroy();
			this.target.replaceChildren();
			currentComponent.component.afterDestroy();
		}
	}

	/**
	 * Create the step
	 * @param {Object} options
	 * @param {String} route Route
	 */
	createComponent(route: string) {
		const currentComponent = this.routes.get(route);

		if (currentComponent) {
			currentComponent.component.beforeRender();
			this.render(currentComponent.component.render());
			currentComponent.component.afterRender();
		}
	}

	/**
	 * Render the step template
	 * @param {HTMLElement} template Step template
	 */
	render(template: HTMLElement|string) {
		if (template instanceof HTMLElement) {
			this.target.appendChild(template);
		} else {
			this.target.insertAdjacentHTML('beforeend', template);
		}
	}
}
