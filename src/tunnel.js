import Hash from './location/hash';
import History from './location/history';

export const LIFECYCLE_HOOKS = ['beforeRender', 'afterRender', 'beforeDestroy', 'afterDestroy'];

export default class Tunnel {
	constructor({ target, routes, mode = 'hash' }) {
		this.mode = mode;

		this.routes = new Map(
			routes.map((route) => {
				const component = new route.component(); // eslint-disable-line new-cap

				// Push new function inside step context to change the route
				component.getRoute = () => {
					const path = this.location.getPath();
					return this.getRouteFromPath(path);
				};
				component.navigate = (route) => {
					const path = this.routes.get(route).path;
					this.navigate(path);
				};
				component.getExternalStore = (route) => {
					return this.routes.get(route).component.getStore();
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
		this.previousRoute = null;
		this.currentPath = null;

		this.onNavigate = this.onNavigate.bind(this);
		this.onUpdateLinkHref = this.onUpdateLinkHref.bind(this);
		const location = {
			hash: Hash,
			history: History
		};

		this.location = new location[this.mode]({
			onRouteChange: this.onRouteChange.bind(this)
		});
		this.location.addEvents();

		this.addEvents();
		this.onRouteChange({
			currentPath: this.location.getPath()
		});
	}

	addEvents() {
		document.addEventListener('navigate', this.onNavigate);
		document.addEventListener('updateLinkHref', this.onUpdateLinkHref);
	}

	onNavigate(e) {
		const { path, route } = e.detail;
		this.navigate(path || this.routes.get(route).path);
	}

	onUpdateLinkHref(e) {
		const { element, route } = e.detail;
		element.setAttribute('href', this.routes.get(route).path);
	}

	navigate(path) {
		this.location.setPath(path);
	}

	/**
	 * Event listener for the hash change
	 * @param {Event} e Event data
	 */
	onRouteChange({ currentPath, previousPath = null }) {
		this.currentRoute = this.getRouteFromPath(currentPath);
		this.previousRoute = this.getRouteFromPath(previousPath);

		const currentComponent = this.routes.get(this.currentRoute);

		// Check if route exist
		if (currentComponent) {
			// Check if previous route exist
			if (this.previousRoute) {
				// Destroy the previous step
				this.destroyComponent(this.previousRoute);
			}

			// Create the new step
			this.createComponent(this.currentRoute);
		} else {
			console.warn('Unknown route');
		}
	}

	/**
	 * Get route name from route path
	 * @param {String} path Route path
	 * @returns {String} Route name
	 */
	getRouteFromPath(path) {
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
	destroyComponent(route) {
		const Step = this.routes.get(route).component;

		Step.beforeDestroy();
		this.target.replaceChildren();
		Step.afterDestroy();
	}

	/**
	 * Create the step
	 * @param {Object} options
	 * @param {String} route Route
	 */
	createComponent(route) {
		const Step = this.routes.get(route).component;

		Step.beforeRender();
		this.render(Step.render());
		Step.afterRender();
	}

	/**
	 * Render the step template
	 * @param {HTMLElement} template Step template
	 */
	render(template) {
		if (template instanceof HTMLElement) {
			this.target.appendChild(template);
		} else {
			this.target.insertAdjacentHTML('beforeend', template);
		}
	}
}
