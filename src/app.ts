import Location from './location'
import { RouteData, Route, HelperFunction, Fn, Component } from './interface'
import { getDynamicSegmentsFromPath, createRegExpFromPath } from './utils'

export default class App {
	target: HTMLElement
	mode: string
	basePath: string
	silentOnNotFound: boolean
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
	 * @param {Object} options.basePath Site base path
	 */
	constructor({
		mode = 'hash',
		routes,
		target,
		basePath = '/', // The default value is important, do not change it!
		silentOnNotFound = false
	}: {
		basePath?: string
		mode?: 'hash' | 'history'
		routes: Route[]
		silentOnNotFound: boolean
		target: HTMLElement
	}) {
		this.mode = mode
		this.target = target
		this.basePath = basePath
		this.silentOnNotFound = silentOnNotFound
		this.currentRoute = undefined
		this.previousRoute = undefined

		this.routes = this.createRoutesData(routes)

		if (!this.routes.size) {
			throw new Error('App::constructor | Invalid routes configuration')
		}

		if (!['hash', 'history'].includes(this.mode)) {
			throw new Error(`App::constructor | Unknown mode "${mode}"`)
		}

		this.onNavigate = this.onNavigate.bind(this)
		this.onClickOnApp = this.onClickOnApp.bind(this)

		this.location = new Location({
			basePath: this.basePath,
			callback: this.onRouteChange.bind(this),
			mode: this.mode
		})
		this.location.init()

		this.addEvents()
		this.onRouteChange(this.location.currentPath)
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
				.map((route: Route): any => {
					if (typeof route.path === 'undefined') {
						route.path = '*'
					}

					// Detect route path with trailing slash
					if (route.path !== '/' && route.path.endsWith('/')) {
						throw new Error(
							`App::createRoutesData | Route path "${route.path}" must not have a trailing slash.`
						)
					}

					const dynamicSegments = getDynamicSegmentsFromPath(route.path)
					const pathRegExp = createRegExpFromPath(route.path)
					const isComponentClass = this.isComponentClass(route.component)

					return [
						route.path,
						{
							component: route.component,
							dynamicSegments,
							interfaceType: null,
							isComponentClass,
							isComponentClassReady: false,
							path: route.path,
							pathRegExp,
							props: route.props
						}
					]
				})
		)
	}

	/**
	 * Check if the component interface type is granted
	 * @param {Function} component Component
	 * @returns {Boolean} Interface type is granted
	 */
	isInterfaceTypeFromComponentGranted(component: Fn | Component): boolean {
		return !!(typeof component === 'function' || this.isComponentClass(component))
	}

	/**
	 * Check if the component is a class component (extends from Component)
	 * @param {Function} component Component
	 * @returns {Boolean} The component extends from the Component class
	 */
	isComponentClass(component: Fn | Component): boolean {
		return component.prototype ? !!component.prototype.__isComponent : false
	}

	/**
	 * Add events listeners
	 */
	addEvents() {
		document.addEventListener('costro::navigate', this.onNavigate)
		this.target.addEventListener('click', this.onClickOnApp)
	}

	/**
	 * On navigate event
	 * @param {Event}  e Event data
	 */
	onNavigate(e: Event) {
		const { to } = (<CustomEvent>e).detail
		typeof to === 'string' && this.location.setPath(to)
	}

	/**
	 * On click on app event
	 * @param {Event}  e Event data
	 */
	onClickOnApp(e: Event) {
		const target = e.target as HTMLElement

		// @ts-ignore
		if (target.__customLink) {
			e.preventDefault()

			const href = target.getAttribute('href')
			href && this.location.setPath(href)
		}
	}

	/**
	 * On route change event
	 * @param {Object} currentPath Current path from location
	 */
	onRouteChange(currentPath: string) {
		const route = this.getRouteMatch(currentPath)
		if (route) {
			if (this.currentRoute) {
				if (route.path === this.currentRoute.path) {
					// The route is already rendered, stop
					return
				} else {
					this.destroyCurrentRoute()
				}
			}

			this.currentRoute = route
			this.createComponent()
		} else if (this.currentRoute && !this.silentOnNotFound) {
			// The route is unknown
			this.destroyCurrentRoute()
		}
	}

	/**
	 * Search the route from the path
	 * Path can contain transformed segments
	 * @param {String} path Path
	 * @returns {(Route|undefined)} The route that matches the path or undefined
	 */
	getRouteMatch(path: string): RouteData | undefined {
		const route = this.routes.get(path)

		if (route) {
			return route
		} else {
			// In case of unknown route, search for dynamic segments matches
			for (const route of this.routes) {
				if (route[1].dynamicSegments.length && new RegExp(route[1].pathRegExp).test(path)) {
					return this.routes.get(route[0])
				}
			}
		}

		if (!this.silentOnNotFound) {
			// If any route is found, check if the noud found route exist
			return this.routes.get('*')
		}
	}

	/**
	 * Destroy current route
	 */
	destroyCurrentRoute() {
		this.previousRoute = this.currentRoute
		this.currentRoute = undefined
		this.destroyComponent()
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
				this.updateComponentRouteData()
				this.currentRoute.component.beforeRender()
				return this.currentRoute.component.render()
			} else {
				return this.currentRoute.component.call(
					this.currentRoute.component,
					this.currentRoute.props
				)
			}
		}
	}

	/**
	 * Update the route data on the component (path, params)
	 */
	updateComponentRouteData() {
		if (this.currentRoute) {
			this.currentRoute.component.route.path = this.location.currentPath
			if (this.currentRoute.dynamicSegments.length) {
				const dynamicSegments = this.location.currentPath.match(
					this.currentRoute.pathRegExp
				)
				if (dynamicSegments && dynamicSegments.length > 1) {
					// Remove matching text as the first item
					dynamicSegments.shift()

					for (let i = 0, length = dynamicSegments.length; i < length; i++) {
						// @ts-ignore
						const segmentKey = this.currentRoute.dynamicSegments[i]
						this.currentRoute.component.route.params[segmentKey] = dynamicSegments[i]
					}
				}
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
		const customLinks = Array.from(fragment.querySelectorAll('.__customLink'))

		for (let i = 0, length = customLinks.length; i < length; i++) {
			const link = customLinks[i]
			link.classList.remove('__customLink')

			// @ts-ignore
			link.__customLink = true
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
				const route = this.getRouteMatch(path)
				if (route && route.isComponentClass && route.isComponentClassReady) {
					return route.component.getStore(key)
				}

				return null
			}
		}
	}

	/**
	 * Destroy the application
	 */
	destroy() {
		this.location.destroy()
		document.removeEventListener('costro::navigate', this.onNavigate)
		this.target.removeEventListener('click', this.onClickOnApp)

		this.currentRoute = undefined
		this.previousRoute = undefined

		this.routes.clear()
		this.target.replaceChildren()
	}
}
