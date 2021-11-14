import config from './config'
import Hash from './location/hash'
import History from './location/history'
import { RouteData, interfaceLocationInstances, Route } from './interface'
import Component from './component'

const LOCATION_INSTANCES: interfaceLocationInstances = {
	hash: Hash,
	history: History
}

export default class Tunnel {
	target: HTMLElement
	mode: string
	routes: Map<string, RouteData>
	location: any
	currentRoute: undefined | RouteData
	previousRoute: undefined | RouteData

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
		this.currentRoute = undefined
		this.previousRoute = undefined

		this.routes = this.createRoutesData(routes)
		console.log(this.routes)
		if (!this.routes.size) {
			throw new Error('Tunnel::Constructor | Invalid routes configuration')
		}

		this.onNavigate = this.onNavigate.bind(this)
		this.onClickOnApp = this.onClickOnApp.bind(this)

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
		return new Map(
			routes
				.filter((route): Boolean => route.component instanceof Function)
				.map((route: Route): any => [
					route.path,
					{
						instance: route.component,
						component: null,
						componentType: null
					}
				])
		)
	}

	getComponentType(instance: any): string | null {
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

	/**
	 * Push new function inside step context to change the route
	 */
	setComponentInjection(instance: any) {
		instance.getPath = (): null | string => {
			return this.location.getPath()
		}
		instance.navigate = (path: string): void => {
			const route = this.routes.get(path)
			route && this.navigate(path)
		}
		instance.getExternalStore = (path: string): any | null => {
			const route = this.routes.get(path)
			return route ? route.component.getStore() : null
		}
	}

	getLocationInstance(mode: string): any {
		const LocationInstance: any = LOCATION_INSTANCES[mode]
		if (LocationInstance) {
			return LocationInstance
		}
		throw new Error(`Router :: Unknown mode "${mode}"`)
	}

	addEvents() {
		document.addEventListener('navigate', this.onNavigate)
		this.target.addEventListener('click', this.onClickOnApp)
	}

	onNavigate(e: Event) {
		const { to } = (<CustomEvent>e).detail
		typeof to === 'string' && this.navigate(to)
	}

	navigate(path: string) {
		this.location.setPath(path)
	}

	onClickOnApp(e: Event) {
		const target = e.target as HTMLElement

		// @ts-ignore
		if (target[config.customLinkProperty]) {
			e.preventDefault()

			const href = target.getAttribute('href')
			href && this.navigate(href)
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
		this.currentRoute = this.routes.get(currentPath)

		// Check if route exist
		if (this.currentRoute) {
			if (previousPath) {
				this.previousRoute = this.routes.get(previousPath)
				if (this.previousRoute) {
					this.updatePreviousRoute(previousPath)
				}
			}

			this.updateCurrentRoute(currentPath)
		} else {
			throw new Error(`Tunnel::onRouteChange | Unknown route "${currentPath}"`)
		}
	}

	updatePreviousRoute(path: string) {
		if (this.previousRoute && this.previousRoute.component === null) {
			this.createInstanceInCache(path)
		}
		this.destroyComponent(path)
	}

	updateCurrentRoute(path: string) {
		if (this.currentRoute && this.currentRoute.component === null) {
			this.createInstanceInCache(path)
		}
		this.createComponent(path)
	}

	/**
	 * Destroy the component
	 * @param {String} path Route
	 */
	destroyComponent(path: string) {
		if (this.previousRoute) {
			if (this.previousRoute.componentType === 'Component') {
				this.previousRoute.component.beforeDestroy()
				this.target.replaceChildren()
				this.previousRoute.component.afterDestroy()
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
		if (this.currentRoute) {
			if (this.currentRoute.componentType === 'Component') {
				this.currentRoute.component.beforeRender()
				this.target.appendChild(this.currentRoute.component.render())
				this.currentRoute.component.afterRender()
			} else if (this.currentRoute.componentType === 'HTMLElement') {
				this.target.appendChild(this.currentRoute.component())
			} else if (this.currentRoute.componentType === 'DocumentFragment') {
				this.target.appendChild(this.currentRoute.component())
			} else if (this.currentRoute.componentType === 'String') {
				const template = document.createElement('template')
				template.innerHTML = this.currentRoute.component().trim()
				const fragment = document.importNode(template.content, true)

				// Transform .customLink CSS class to a Node property for the event delegation of the router
				/**
				TODO:
				[...fragment.querySelectorAll(`.${config.customLinkCssClass}`)] => Bublé needs transforms: { spreadRest: false }
				Array.from[fragment.querySelectorAll(`.${config.customLinkCssClass}`)]
				Array.prototype.slice.call(fragment.querySelectorAll(`.${config.customLinkCssClass}`))
			 */
				const customLinks = Array.prototype.slice.call(
					fragment.querySelectorAll(`.${config.customLinkCssClass}`)
				)
				for (let i = 0, length = customLinks.length; i < length; i++) {
					const link = customLinks[i]
					link.classList.remove(config.customLinkCssClass)

					// @ts-ignore
					link[config.customLinkProperty] = true
				}

				this.target.appendChild(fragment)
			}
		}
	}

	createInstanceInCache(path: string) {
		const route = this.routes.get(path)

		if (route) {
			if (route.instance.prototype instanceof Component) {
				route.component = new route.instance()
				this.setComponentInjection(route.component)
			} else {
				route.component = () => route.instance()
			}

			route.componentType = this.getComponentType(route.component)
			this.routes.set(path, route)
		}
	}
}
