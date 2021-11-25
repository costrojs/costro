import config from './config'
import Location from './location'
import { RouteData, Route, HelperFunction, Fn } from './interface'
import Component from './component'

export default class App {
	target: HTMLElement
	mode: string
	routes: Map<string, RouteData>
	location: any
	currentRoute: undefined | RouteData
	previousRoute: undefined | RouteData

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Object} options.mode Location mode
	 * @param {Object} options.routes Definition of routes
	 * @param {Object} options.target HTMLElement target
	 */
	constructor({
		mode = 'hash',
		routes,
		target
	}: {
		mode: string
		routes: Route[]
		target: HTMLElement
	}) {
		this.mode = mode
		this.target = target
		this.currentRoute = undefined
		this.previousRoute = undefined

		this.routes = this.createRoutesData(routes)
		// console.log(this.routes)

		if (!this.routes.size) {
			throw new Error('App::constructor | Invalid routes configuration')
		}

		if (!['hash', 'history'].includes(this.mode)) {
			throw new Error(`App::constructor | Unknown mode "${mode}"`)
		}

		this.location = new Location(this.onRouteChange.bind(this), this.mode)
		this.location.init()

		this.addEvents()
		this.onRouteChange({
			currentPath: this.location.getPath()
		})
	}

	/**
	 * Create routes data
	 * @param {Array<Route>} routes Definition of routes
	 * @returns {Object} Routes data parsed
	 */
	createRoutesData(routes: Route[]): Map<string, RouteData> {
		const inValidRoutes = routes
			.filter((route): boolean => !this.isInterfaceTypeFromComponentGranted(route.component))
			.map((route) => route.path)

		if (inValidRoutes.length) {
			throw new Error(
				`App::createRoutesData | Invalid type for path components: "${inValidRoutes.join(
					'", "'
				)}". Allowed types are Function, Component, Node.ELEMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE and String.`
			)
		}

		return new Map(
			routes
				.filter((route): boolean =>
					this.isInterfaceTypeFromComponentGranted(route.component)
				)
				.map((route: Route): any => [
					route.path,
					{
						component: route.component,
						interfaceType: null,
						isComponentClass: route.component.prototype instanceof Component,
						isComponentClassReady: false,
						path: route.path,
						props: route.props
					}
				])
		)
	}

	/**
	 * Check if the component interface type is granted
	 * @param {Function} component Component
	 * @returns {Boolean} Interface type is granted
	 */
	isInterfaceTypeFromComponentGranted(component: Fn | Component): boolean {
		return !!(component instanceof Function || component instanceof Component)
	}

	/**
	 * Add events listeners
	 */
	addEvents() {
		document.addEventListener('navigate', this.onNavigate)
		this.target.addEventListener('click', this.onClickOnApp)
	}

	/**
	 * On navigate event
	 * Function is declared on constructor for private declaration without binding
	 * @param {Event}  e Event data
	 */
	onNavigate = (e: Event) => {
		const { to } = (<CustomEvent>e).detail
		typeof to === 'string' && this.location.setPath(to)
	}

	/**
	 * On click on app event
	 * Function is declared on constructor for private declaration without binding
	 * @param {Event}  e Event data
	 */
	onClickOnApp = (e: Event) => {
		const target = e.target as HTMLElement

		// @ts-ignore
		if (target[config.customLinkProperty]) {
			e.preventDefault()

			const href = target.getAttribute('href')
			href && this.location.setPath(href)
		}
	}

	/**
	 * On route change event
	 * @param {Object} options
	 * @param {Object} options.currentPath Current path from location
	 * @param {(Object|null)} options.previousPath Previous path from location
	 */
	onRouteChange({
		currentPath,
		previousPath = null
	}: {
		currentPath: string
		previousPath?: null | string
	}) {
		const currentRoute = this.routes.get(currentPath)

		if (!currentRoute) {
			console.info(`App::onRouteChange | Unknown route "${currentPath}"`)
			return
		}

		// Route is already active
		if (this.currentRoute && this.currentRoute.path === currentPath) {
			console.info(`App::onRouteChange | Route "${currentPath}" already rendered`)
			return
		}

		this.currentRoute = currentRoute

		// Check if route exist
		if (this.currentRoute) {
			if (previousPath) {
				this.previousRoute = this.routes.get(previousPath)
				this.previousRoute && this.destroyComponent()
			}

			this.createComponent()
		}
	}

	/**
	 * Destroy the previous component
	 */
	destroyComponent() {
		if (this.previousRoute) {
			this.previousRoute.isComponentClass && this.previousRoute.component.beforeDestroy()
			this.target.replaceChildren()
			this.previousRoute.isComponentClass && this.previousRoute.component.afterDestroy()
		}
	}

	/**
	 * Create the current component
	 */
	createComponent() {
		if (this.currentRoute) {
			if (this.currentRoute.isComponentClass && !this.currentRoute.isComponentClassReady) {
				this.initComponentInCache()
			}

			let componentView = this.getComponentView()
			if (componentView) {
				if (!this.currentRoute.interfaceType) {
					this.currentRoute.interfaceType = this.getInterfaceTypeFromView(componentView)
					this.routes.set(this.currentRoute.path, this.currentRoute)
				}

				this.currentRoute.isComponentClass && this.currentRoute.component.beforeRender()
				if (this.currentRoute.interfaceType === 'STRING') {
					componentView = this.transformLinksInStringComponent(componentView)
				}
				this.target.appendChild(componentView)
				this.currentRoute.isComponentClass && this.currentRoute.component.afterRender()
			}
		}
	}

	/**
	 * Init component in cache
	 * Only the classes that extend the component
	 */
	initComponentInCache() {
		if (this.currentRoute) {
			// Inject helpers on the class prototype
			const helpers = this.getComponentHelpers()
			const keys = Object.keys(helpers) as string[]
			for (let i = 0, length = keys.length; i < length; i++) {
				const key = keys[i]
				// @ts-ignore
				this.currentRoute.component.prototype[key] = helpers[key]
			}

			// eslint-disable-next-line new-cap
			const instance = new this.currentRoute.component(this.currentRoute.props)
			this.currentRoute.component = instance
			this.currentRoute.isComponentClassReady = true

			this.routes.set(this.currentRoute.path, this.currentRoute)
		}
	}

	/**
	 * Get the component view
	 * From the render function is Component, or from the component itself
	 * @returns {(Node.ELEMENT_NODE|Node.DOCUMENT_FRAGMENT_NODE)} The component view
	 */
	getComponentView() {
		if (this.currentRoute) {
			if (this.currentRoute.isComponentClass) {
				// Call the before render first
				this.currentRoute.component.beforeRender()
				return this.currentRoute.component.render()
			} else {
				return this.currentRoute.component()
			}
		}
	}

	/**
	 * Get the interface type from the component view
	 * @param {(Node.ELEMENT_NODE|Node.DOCUMENT_FRAGMENT_NODE)} component Component view
	 * @returns {(String|null)} Component type or null
	 */
	getInterfaceTypeFromView(component: string | Node): string | null {
		if (typeof component === 'string') {
			return 'STRING'
		} else if ([Node.ELEMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE].includes(component.nodeType)) {
			return 'ELEMENT_NODE'
		}

		return null
	}

	/**
	 * Transform links inside string component into router friendly links
	 * @param {(Node.ELEMENT_NODE|Node.DOCUMENT_FRAGMENT_NODE)} component Component view
	 * @returns {Node.DOCUMENT_FRAGMENT_NODE} View of components with links compatible with the router
	 */
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

		template.remove()

		return fragment
	}

	/**
	 * Get component helper functions
	 * Function are inject as dependencies in the Component
	 * @returns {Object} List of helper function
	 */
	getComponentHelpers(): HelperFunction {
		return {
			__getExternalStore: (key: string, path: string): object | undefined | null => {
				const route = this.routes.get(path)
				if (route && route.isComponentClass && route.isComponentClassReady) {
					return route.component.getStore(key)
				}

				return null
			},
			getPath: (): null | string => {
				return this.location.getPath()
			},
			navigate: (path: string): void => {
				const route = this.routes.get(path)
				route && this.location.setPath(path)
			}
		}
	}

	/**
	 * Destroy the application
	 */
	destroy() {
		this.location.destroy()
		document.removeEventListener('navigate', this.onNavigate)
		this.target.removeEventListener('click', this.onClickOnApp)

		this.currentRoute = undefined
		this.previousRoute = undefined

		this.routes.clear()
		this.target.replaceChildren()
	}
}
