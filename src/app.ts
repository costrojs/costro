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
			.filter((route): boolean => !this.isInterfaceTypeFromInputGranted(route.component))
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
				.filter((route): boolean => this.isInterfaceTypeFromInputGranted(route.component))
				.map((route: Route): any => [
					route.path,
					{
						component: null,
						instance: route.component,
						interfaceType: null,
						isComponent: route.component.prototype instanceof Component,
						isFunction: route.component instanceof Function,
						path: route.path,
						props: route.props
					}
				])
		)
	}

	isInterfaceTypeFromInputGranted(instance: any): boolean {
		return !!(
			instance instanceof Function ||
			instance instanceof Component ||
			[Node.ELEMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE].includes(instance.nodeType) ||
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
		if (this.#currentRoute && this.#currentRoute.path === currentPath) {
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
			throw new Error(`App::onRouteChange | Unknown route "${currentPath}"`)
		}
	}

	updatePreviousRoute(path: string) {
		if (this.#previousRoute && this.#previousRoute.component === null) {
			this.createInstanceInCache(path)
		}
		this.destroyComponent()
	}

	updateCurrentRoute(path: string) {
		if (this.#currentRoute && this.#currentRoute.component === null) {
			this.createInstanceInCache(path)
		}
		this.createComponent()
	}

	/**
	 * Destroy the component
	 */
	destroyComponent() {
		if (this.#previousRoute) {
			this.#previousRoute.isComponent && this.#previousRoute.component.beforeDestroy()
			this.target.replaceChildren()
			this.#previousRoute.isComponent && this.#previousRoute.component.afterDestroy()
		}
	}

	/**
	 * Create the component
	 */
	createComponent() {
		if (this.#currentRoute) {
			if (this.#currentRoute.isComponent) {
				this.#currentRoute.component.beforeRender()
				if (this.#currentRoute.interfaceType === 'STRING') {
					this.target.appendChild(
						this.transformLinksInStringComponent(this.#currentRoute.component.render())
					)
				} else if (this.#currentRoute.interfaceType === 'ELEMENT_NODE') {
					this.target.appendChild(this.#currentRoute.component.render())
				}
				this.#currentRoute.component.afterRender()
			} else if (this.#currentRoute.interfaceType === 'ELEMENT_NODE') {
				this.target.appendChild(this.#currentRoute.component())
			} else if (this.#currentRoute.interfaceType === 'STRING') {
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

		template.remove()

		return fragment
	}

	createInstanceInCache(path: string) {
		const route = this.#routes.get(path)

		if (route) {
			if (route.isFunction) {
				if (route.isComponent) {
					// Inject helpers on the class prototype
					const helpers = this.getComponentHelpers()
					const keys = Object.keys(helpers) as string[]
					for (let i = 0, length = keys.length; i < length; i++) {
						const key = keys[i]
						// @ts-ignore
						route.instance.prototype[key] = helpers[key]
					}

					// eslint-disable-next-line new-cap
					route.component = new route.instance(route.props)
					route.interfaceType = this.getInterfaceTypeFromOutput(route.component.render())
				} else {
					route.component = () => route.instance()
					route.interfaceType = this.getInterfaceTypeFromOutput(route.component()) // TODO: le render est appelé deux fois !
				}
			} else {
				route.component = () => route.instance
				route.interfaceType = this.getInterfaceTypeFromOutput(route.component())
			}
			console.log(route.interfaceType)
			this.#routes.set(path, route)
		}
	}

	/**
	 * Push new function inside step context to change the route
	 */
	getComponentHelpers(): ComponentInjection {
		return {
			__getExternalStore: (key: string, path: string): object | undefined | null => {
				const route = this.#routes.get(path)

				// Store are only available for Component type
				if (route && route.isComponent && route.component) {
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

	getInterfaceTypeFromOutput(component: any): string | null {
		if ([Node.ELEMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE].includes(component.nodeType)) {
			return 'ELEMENT_NODE'
		} else if (typeof component === 'string') {
			return 'STRING'
		}

		return null
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
