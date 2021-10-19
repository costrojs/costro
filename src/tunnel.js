import extend from './extend';
import Hash from './location/hash';
import History from './location/history';

export const LIFECYCLE_HOOKS = ['beforeRender', 'afterRender', 'beforeDestroy', 'afterDestroy'];

export default class Tunnel {
	constructor({ target, routes, mode = 'hash' }) {
		this.mode = mode;
		this.defaultPath = '/';

		this.routes = new Map(
			routes.map((route) => {
				const component = new route.component(); // eslint-disable-line new-cap

				// Push new function inside step context to change the route
				component.currentRoute = () => this.currentRoute;
				component.navigate = (route) => this.navigate(route);
				component.getExternalState = (route) => this.routes.get(route).component.getState();

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

		this.onRouteChanged = this.onRouteChanged.bind(this);
		this.applyPathToElement = this.applyPathToElement.bind(this);
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
		document.addEventListener('routeChange', this.onRouteChanged);
		document.addEventListener('applyPathToElement', this.applyPathToElement);
	}

	onRouteChanged(e) {
		const { path, route } = e.detail;
		this.location.setPath(path || this.routes.get(route).path);
	}

	applyPathToElement(e) {
		const { element, route } = e.detail;
		element.setAttribute('href', this.routes.get(route).path);
	}

	navigate(route) {
		this.location.setPath(this.routes.get(route).path);
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
