import config from './config'
import Hash from './location/hash'
import History from './location/history'
import { RouteData, interfaceLocationInstances, Route, ComponentInjection } from './interface'
import Component from './component'

const LOCATION_INSTANCES: interfaceLocationInstances = {
	hash: Hash,
	history: History
}

export default class App {
	target: HTMLElement
	mode: string
	#routes: Map<string, RouteData>
	location: any
	#currentRoute: undefined | RouteData
	#previousRoute: undefined | RouteData

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
		this.#currentRoute = undefined
		this.#previousRoute = undefined

		this.#routes = this.createRoutesData(routes)
		console.log(this.#routes)
		if (!this.#routes.size) {
			throw new Error('App::constructor | Invalid routes configuration')
		}

		const LocationInstance = this.getLocationInstance(mode)
		this.location = new LocationInstance(this.onRouteChange.bind(this))
		this.location.init()

		this.addEvents()
		this.onRouteChange({
			currentPath: this.location.getPath()
		})
	}

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

	isInterfaceTypeFromComponentGranted(component: any): boolean {
		return !!(
			component instanceof Function ||
			component instanceof Component ||
			[Node.ELEMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE].includes(component.nodeType) ||
			typeof component === 'string'
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
		if (this.#currentRoute && this.#currentRoute.path === currentPath) {
			return
		}

		this.#currentRoute = this.#routes.get(currentPath)

		// Check if route exist
		if (this.#currentRoute) {
			if (previousPath) {
				this.#previousRoute = this.#routes.get(previousPath)
				this.#previousRoute && this.destroyComponent()
			}

			this.createComponent()
		} else {
			throw new Error(`App::onRouteChange | Unknown route "${currentPath}"`)
		}
	}

	/**
	 * Destroy the component
	 */
	destroyComponent() {
		if (this.#previousRoute) {
			this.#previousRoute.isComponentClass && this.#previousRoute.component.beforeDestroy()
			this.target.replaceChildren()
			this.#previousRoute.isComponentClass && this.#previousRoute.component.afterDestroy()
		}
	}

	/**
	 * Create the component
	 */
	createComponent() {
		if (this.#currentRoute) {
			if (this.#currentRoute.isComponentClass && !this.#currentRoute.isComponentClassReady) {
				this.initComponentInCache()
			}

			let componentView = this.getComponentView()
			if (componentView) {
				if (!this.#currentRoute.interfaceType) {
					this.#currentRoute.interfaceType = this.getInterfaceTypeFromView(componentView)
					this.#routes.set(this.#currentRoute.path, this.#currentRoute)
				}

				this.#currentRoute.isComponentClass && this.#currentRoute.component.beforeRender()
				if (this.#currentRoute.interfaceType === 'STRING') {
					componentView = this.transformLinksInStringComponent(componentView)
				}
				this.target.appendChild(componentView)
				this.#currentRoute.isComponentClass && this.#currentRoute.component.afterRender()
			}
		}
	}

	initComponentInCache() {
		if (this.#currentRoute) {
			// Inject helpers on the class prototype
			const helpers = this.getComponentHelpers()
			const keys = Object.keys(helpers) as string[]
			for (let i = 0, length = keys.length; i < length; i++) {
				const key = keys[i]
				// @ts-ignore
				this.#currentRoute.component.prototype[key] = helpers[key]
			}

			// eslint-disable-next-line new-cap
			const instance = new this.#currentRoute.component(this.#currentRoute.props)
			this.#currentRoute.component = instance
			this.#currentRoute.isComponentClassReady = true

			this.#routes.set(this.#currentRoute.path, this.#currentRoute)
		}
	}

	getComponentView() {
		if (this.#currentRoute) {
			if (this.#currentRoute.isComponentClass) {
				// Call the before render first
				this.#currentRoute.component.beforeRender()
				return this.#currentRoute.component.render()
			} else {
				return this.#currentRoute.component()
			}
		}
	}

	getInterfaceTypeFromView(component: any): string | null {
		if ([Node.ELEMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE].includes(component.nodeType)) {
			return 'ELEMENT_NODE'
		} else if (typeof component === 'string') {
			return 'STRING'
		}

		return null
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

		template.remove()

		return fragment
	}

	/**
	 * Push new function inside step context to change the route
	 */
	getComponentHelpers(): ComponentInjection {
		return {
			__getExternalStore: (key: string, path: string): object | undefined | null => {
				const route = this.#routes.get(path)
				if (route && route.isComponentClass && route.isComponentClassReady) {
					return route.component.getStore(key)
				}

				return null
			},
			getPath: (): null | string => {
				return this.location.getPath()
			},
			navigate: (path: string): void => {
				const route = this.#routes.get(path)
				route && this.location.setPath(path)
			}
		}
	}

	destroy() {
		this.location.destroy()
		document.removeEventListener('navigate', this.#onNavigate)
		this.target.removeEventListener('click', this.#onClickOnApp)

		this.#currentRoute = undefined
		this.#previousRoute = undefined

		this.#routes.clear()
		this.target.replaceChildren()
	}
}
