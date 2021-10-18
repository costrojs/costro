import extend from './extend';
import Hash from './location/hash';

export default class Tunnel {
	constructor({ target, routes }) {
		this.mode = 'hash';

		this.components = new Map(
			routes.map((route) => {
				const component = new route.component(); // eslint-disable-line new-cap

				// Push new function inside step context to change the route
				component.navigate = (route) => this.navigate(route);
				component.getStore = (route) => {
					return this.components.get(route).component.getState();
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
		// this.state = new Map(routes.map((route) => [route, {}]));

		this.target = target;
		this.previousRoute = null;
		this.currentPath = null;

		this.location = new {
			hash: Hash
		}[this.mode]({
			onRouteChange: this.onRouteChange.bind(this)
		});

		this.location.addEvents instanceof Function && this.location.addEvents();

		const path = this.location.getPath();
		if (path !== '') {
			this.onRouteChange({
				currentPath: path
			});
		}
	}

	navigate(route) {
		this.location.setPath(this.components.get(route).path);
	}

	/**
	 * Event listener for the hash change
	 * @param {Event} e Event data
	 */
	onRouteChange({ currentPath, previousPath = null }) {
		this.currentRoute = this.getRouteFromPath(currentPath);
		this.previousRoute = this.getRouteFromPath(previousPath);

		const currentComponent = this.components.get(this.currentRoute);

		// Check if route exist
		if (currentComponent) {
			const dependsOn = currentComponent.component.dependsOn;

			// Check if previous route exist
			if (this.previousRoute) {
				// Set the state with the data from the previous step
				// this.setState({
				// 	route: this.previousRoute,
				// 	data: this.components.get(this.previousRoute).component.getState()
				// });

				// Destroy the previous step
				this.destroyComponent(this.previousRoute);
			}

			// Create the new step
			this.createComponent({
				route: this.currentRoute
				// data: dependsOn && dependsOn.length ? this.getDataFromDependentSteps(dependsOn) : {}
			});
		} else {
			console.warn('Unknown route');
		}

		this.displayDebug();
	}

	/**
	 * Get route name from route path
	 * @param {String} path Route path
	 * @returns {String} Route name
	 */
	getRouteFromPath(path) {
		let route = null;
		for (const step of this.components.entries()) {
			if (step[1].path === path) {
				route = step[0];
				break;
			}
		}
		return route;
	}

	/**
	 * Get data from dependent steps
	 * @param {Array} dependentSteps
	 * @returns {Object} Aggregated data
	 */
	// getDataFromDependentSteps(dependentSteps) {
	// 	const data = {};
	// 	dependentSteps.forEach((route) => (data[route] = this.state.get(route)));
	// 	return data;
	// }

	/**
	 * Set the state for a specific route
	 * Current data is merged with the actual
	 * @param {Object} options
	 * @param {String} route Route
	 * @param {String} data Data from the step associated to the route
	 */
	// setState({ route, data }) {
	// 	this.state.set(route, extend(true, this.state.get(route), data));
	// }

	/**
	 * Destroy the step
	 * @param {String} route Route to destroy
	 */
	destroyComponent(route) {
		this.target.replaceChildren();
	}

	/**
	 * Create the step
	 * @param {Object} options
	 * @param {String} route Route
	 * @param {String} data Data from the step associated to the route
	 */
	createComponent({ route, data }) {
		const Step = this.components.get(route).component;

		this.render(Step.render(data));
		Step.afterRender();
	}

	/**
	 * Render the step template
	 * @param {HTMLElement} template Step template
	 */
	render(template) {
		this.target.appendChild(template);
	}

	/**
	 * Enable debug infos
	 */
	displayDebug() {
		console.groupCollapsed('Tunnel::routes');
		console.log({ currentRoute: this.currentRoute, previousRoute: this.previousRoute });
		console.groupEnd();
		console.groupCollapsed('Tunnel::steps');
		for (const step of this.components.entries()) {
			console.log({
				name: step[0],
				path: step[1].path,
				component: step[1].component,
				state: step[1].component.getState()
			});
		}
		console.groupEnd();
	}
}
