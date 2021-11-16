import config from './config'
import Hash from './location/hash'
import History from './location/history'
import { RouteData, interfaceLocationInstances, Route, ComponentInjection } from './interface'
import Component from './component'

const LOCATION_INSTANCES: interfaceLocationInstances = {
	hash: Hash,
	history: History
}

export default class Tunnel {
	target: HTMLElement
	mode: string
	#routes: Map<string, RouteData>
	location: any
	#currentRoute: undefined | RouteData
	#previousRoute: undefined | RouteData

	constructor({
		target,
		mode = 'hash',
		routes
	}: {
		target: HTMLElement
		mode: string
		routes: Route[]
	}) {
		this.mode = mode
		this.target = target
		this.#currentRoute = undefined
		this.#previousRoute = undefined

		this.#routes = this.createRoutesData(routes)
		console.log(this.#routes)
		if (!this.#routes.size) {
			throw new Error('Tunnel::constructor | Invalid routes configuration')
		}

		const LocationInstance = this.getLocationInstance(mode)
		this.location = new LocationInstance({
			onRouteChange: this.onRouteChange.bind(this)
		})
		this.location.addEvents()

		this.addEvents()
		this.onRouteChange({
			currentPath: this.location.getPath()
		})
	}

	createRoutesData(routes: Route[]): Map<string, RouteData> {
		const inValidRoutes = routes
			.filter((route): Boolean => !this.isInterfaceTypeGranted(route.component))
			.map((route) => route.path)

		if (inValidRoutes.length) {
			throw new Error(
				`Tunnel::createRoutesData | Invalid type for path components: "${inValidRoutes.join(
					'", "'
				)}". Allowed types are Function, HTMLElement, DocumentFragment, Component and String.`
			)
		}

		return new Map(
			routes
				.filter((route): Boolean => this.isInterfaceTypeGranted(route.component))
				.map((route: Route): any => [
					route.path,
					{
						instance: route.component,
						path: route.path,
						component: null,
						interfaceType: null,
						isFunction: route.component instanceof Function
					}
				])
		)
	}

	isInterfaceTypeGranted(instance: any): Boolean {
		return !!(
			instance instanceof Function ||
			instance instanceof HTMLElement ||
			instance instanceof DocumentFragment ||
			instance instanceof Component ||
			typeof instance === 'string'
		)
	}

	getLocationInstance(mode: string): any {
		const LocationInstance: any = LOCATION_INSTANCES[mode]
		if (LocationInstance) {
			return LocationInstance
		}
		throw new Error(`Router::getLocationInstance | Unknown mode "${mode}"`)
	}

	addEvents() {
		document.addEventListener('navigate', this.#onNavigate)
		this.target.addEventListener('click', this.#onClickOnApp)
	}

	#onNavigate = (e: Event) => {
		const { to } = (<CustomEvent>e).detail
		typeof to === 'string' && this.location.setPath(to)
	}

	#onClickOnApp = (e: Event) => {
		const target = e.target as HTMLElement

		// @ts-ignore
		if (target[config.customLinkProperty]) {
			e.preventDefault()

			const href = target.getAttribute('href')
			href && this.location.setPath(href)
		}
	}

	/**
	 * Event listener for the hash change
	 * @param {Event} e Event data
	 */
	onRouteChange({
		currentPath,
		previousPath = null
	}: {
		currentPath: string
		previousPath?: null | string
	}) {
		// Route is already active
		if (this.#currentRoute && this.#currentRoute.path == currentPath) {
			return
		}

		this.#currentRoute = this.#routes.get(currentPath)

		// Check if route exist
		if (this.#currentRoute) {
			if (previousPath) {
				this.#previousRoute = this.#routes.get(previousPath)
				if (this.#previousRoute) {
					this.updatePreviousRoute(previousPath)
				}
			}

			this.updateCurrentRoute(currentPath)
		} else {
			throw new Error(`Tunnel::onRouteChange | Unknown route "${currentPath}"`)
		}
	}

	updatePreviousRoute(path: string) {
		if (this.#previousRoute && this.#previousRoute.component === null) {
			this.createInstanceInCache(path)
		}
		this.destroyComponent(path)
	}

	updateCurrentRoute(path: string) {
		if (this.#currentRoute && this.#currentRoute.component === null) {
			this.createInstanceInCache(path)
		}
		this.createComponent(path)
	}

	/**
	 * Destroy the component
	 * @param {String} path Route
	 */
	destroyComponent(path: string) {
		if (this.#previousRoute) {
			if (this.#previousRoute.interfaceType === 'Component') {
				this.#previousRoute.component.beforeDestroy()
				this.target.replaceChildren()
				this.#previousRoute.component.afterDestroy()
			} else {
				this.target.replaceChildren()
			}
		}
	}

	/**
	 * Create the component
	 * @param {String} path Route
	 */
	createComponent(path: string) {
		if (this.#currentRoute) {
			if (this.#currentRoute.interfaceType === 'Component') {
				this.#currentRoute.component.beforeRender()
				this.target.appendChild(this.#currentRoute.component.render())
				this.#currentRoute.component.afterRender()
			} else if (this.#currentRoute.interfaceType === 'HTMLElement') {
				this.target.appendChild(this.#currentRoute.component())
			} else if (this.#currentRoute.interfaceType === 'DocumentFragment') {
				this.target.appendChild(this.#currentRoute.component())
			} else if (this.#currentRoute.interfaceType === 'String') {
				this.target.appendChild(
					this.transformLinksInStringComponent(this.#currentRoute.component())
				)
			}
		}
	}

	transformLinksInStringComponent(component: string): DocumentFragment {
		const template = document.createElement('template')
		template.innerHTML = component.trim()
		const fragment = document.importNode(template.content, true)
		const customLinks = Array.from(fragment.querySelectorAll(`.${config.customLinkCssClass}`))
		for (let i = 0, length = customLinks.length; i < length; i++) {
			const link = customLinks[i]
			link.classList.remove(config.customLinkCssClass)

			// @ts-ignore
			link[config.customLinkProperty] = true
		}

		return fragment
	}

	createInstanceInCache(path: string) {
		const route = this.#routes.get(path)

		if (route) {
			if (route.isFunction) {
				if (route.instance.prototype instanceof Component) {
					// Inject helpers on the class prototype
					const helpers = this.getComponentHelpers()
					const keys = Object.keys(helpers) as string[]
					for (let i = 0, length = keys.length; i < length; i++) {
						const key = keys[i]
						// @ts-ignore
						route.instance.prototype[keys[i]] = helpers[keys[i]]
					}

					route.component = new route.instance()
				} else {
					route.component = () => route.instance()
				}
			} else {
				route.component = () => route.instance
			}

			route.interfaceType = this.getInterfaceType(route.component)
			this.#routes.set(path, route)
		}
	}

	/**
	 * Push new function inside step context to change the route
	 */
	getComponentHelpers(): ComponentInjection {
		return {
			navigate: (path: string): void => {
				const route = this.#routes.get(path)
				route && this.location.setPath(path)
			},
			getExternalStore: (path: string): any | null => {
				const route = this.#routes.get(path)

				// Store are only available for Component type
				if (route && route.interfaceType === 'Component') {
					return route.component.getStore()
				}

				return null
			},
			getPath: (): null | string => {
				return this.location.getPath()
			}
		}
	}

	getInterfaceType(instance: any): string | null {
		if (Object.getPrototypeOf(instance) instanceof Component) {
			return 'Component'
		} else if (instance() instanceof HTMLElement) {
			return 'HTMLElement'
		} else if (instance() instanceof DocumentFragment) {
			return 'DocumentFragment'
		} else if (typeof instance() === 'string') {
			return 'String'
		}

		return null
	}

	destroy() {
		document.removeEventListener('navigate', this.#onNavigate)
		this.target.removeEventListener('click', this.#onClickOnApp)

		// Delete all routes data
		const keys = Array.from(this.#routes.keys())
		for (let i = 0, length = keys.length; i < length; i++) {
			this.#routes.delete(keys[i])
		}

		this.target.remove()
	}
}
