import App from '@src/app'
import Location from '@src/location'
import { h } from '../../dist/jsx'
import routesFixtures from '../fixtures/routes-fixture'

jest.mock('@src/location')

let app
let customRoutes
let customRoutesFixtures

const getInstance = () =>
	new App({
		mode: 'hash',
		routes: routesFixtures,
		target: document.querySelector('#app')
	})

const routeString = {
	component: routesFixtures[4].component,
	dynamicSegments: [],
	interfaceType: null,
	isComponentClass: false,
	isComponentClassReady: false,
	path: '/string',
	pathRegExp: '^/string$',
	props: undefined
}
const routeDocumentFragment = {
	component: routesFixtures[1].component,
	dynamicSegments: [],
	interfaceType: null,
	isComponentClass: false,
	isComponentClassReady: false,
	path: '/document-fragment',
	pathRegExp: '^/document-fragment$',
	props: undefined
}

const routes = new Map([
	[
		'/',
		{
			component: routesFixtures[0].component,
			dynamicSegments: [],
			interfaceType: null,
			isComponentClass: false,
			isComponentClassReady: false,
			path: '/',
			pathRegExp: '^/$',
			props: undefined
		}
	],
	['/document-fragment', routeDocumentFragment],
	[
		'/custom-component/:id/:name',
		{
			component: routesFixtures[2].component,
			dynamicSegments: ['id', 'name'],
			interfaceType: null,
			isComponentClass: true,
			isComponentClassReady: false,
			path: '/custom-component/:id/:name',
			pathRegExp: '^/custom-component/([^/]*)/([^/]*)$',
			props: { title: 'home' }
		}
	],
	[
		'/custom-component-2',
		{
			component: routesFixtures[3].component,
			dynamicSegments: [],
			interfaceType: null,
			isComponentClass: true,
			isComponentClassReady: false,
			path: '/custom-component-2',
			pathRegExp: '^/custom-component-2$',
			props: undefined
		}
	],
	['/string', routeString],
	[
		'/svg',
		{
			component: routesFixtures[5].component,
			dynamicSegments: [],
			interfaceType: null,
			isComponentClass: false,
			isComponentClassReady: false,
			path: '/svg',
			pathRegExp: '^/svg$',
			props: undefined
		}
	]
])

beforeEach(() => {
	document.body.appendChild(
		<div id="app">
			<a href="/document-fragment" className="link">
				Link
			</a>
		</div>
	)

	customRoutes = routes
	customRoutesFixtures = routesFixtures

	// Restet app because each test set it manually
	app = null
})

afterEach(() => {
	document.body.innerHTML = ''
	jest.restoreAllMocks()
	jest.clearAllMocks()
})

describe('App', () => {
	describe('Constructor', () => {
		beforeEach(() => {
			Location.mockImplementation(() => ({
				currentPath: '/document-fragment',
				destroy: jest.fn(),
				getPath: jest.fn().mockReturnValue('/document-fragment'),
				init: jest.fn(),
				setPath: jest.fn()
			}))
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})
		})

		it('Should call the constructor function', () => {
			const app = getInstance()

			expect(app.mode).toBe('hash')
			expect(app.basePath).toBe('/')
			expect(app.silentOnNotFound).toBe(false)
			expect(app.target).toBe(document.querySelector('#app'))
			expect(app.currentRoute).toBe(undefined)
			expect(app.previousRoute).toBe(undefined)
			expect(app.routes).toStrictEqual(routes)
			expect(Location).toHaveBeenCalledWith({
				basePath: '/',
				callback: expect.any(Function),
				mode: 'hash'
			})
			expect(app.location.init).toHaveBeenCalled()
			expect(app.createRoutesData).toHaveBeenCalled()
			expect(app.addEvents).toHaveBeenCalled()
			expect(app.onRouteChange).toHaveBeenCalledWith('/document-fragment')
		})

		it('Should call the constructor function with empty routes', () => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue([])

			expect(() => {
				getInstance()
			}).toThrow(new Error('App::constructor | Invalid routes configuration'))
		})

		it('Should call the constructor function with default mode', () => {
			const app = new App({
				routes,
				target: document.querySelector('#app')
			})

			expect(app.mode).toBe('hash')
		})

		it('Should call the constructor function with invalid mode', () => {
			expect(() => {
				new App({
					mode: 'test',
					routes,
					target: document.querySelector('#app')
				})
			}).toThrow(new Error('App::constructor | Unknown mode "test"'))
		})
	})

	describe('createRoutesData', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('Should call the createRoutesData function', () => {
			app.isInterfaceTypeFromComponentGranted = jest.fn().mockReturnValue(true)
			app.createRoutesData.mockRestore()

			const result = app.createRoutesData(customRoutesFixtures)

			expect(result).toStrictEqual(routes)
			expect(app.isInterfaceTypeFromComponentGranted).toHaveBeenCalledTimes(12)
		})

		it('Should call the createRoutesData function with invalid interface type', () => {
			app.isInterfaceTypeFromComponentGranted = jest
				.fn()
				.mockReturnValueOnce(false)
				.mockReturnValueOnce(false)
				.mockReturnValueOnce(false)
				.mockReturnValue(true)
			app.createRoutesData.mockRestore()

			expect(() => {
				app.createRoutesData(customRoutesFixtures)
			}).toThrow(
				new Error(
					'App::createRoutesData | Invalid type for path components: "/", "/document-fragment", "/custom-component/:id/:name". Allowed types are Function, Component, Node.ELEMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE and String.'
				)
			)
		})

		it('Should call the createRoutesData function with invalid route and a not found route', () => {
			app.isInterfaceTypeFromComponentGranted = jest.fn().mockReturnValue(true)
			app.createRoutesData.mockRestore()

			customRoutesFixtures.push({
				component: () => <h1>Not found</h1>
			})
			const result = app.createRoutesData(customRoutesFixtures)

			expect(result.has('*')).toBe(true)
			expect(result.get('*').path).toBe('*')
		})

		it('Should call the createRoutesData function with invalid trailing slash in route', () => {
			app.isInterfaceTypeFromComponentGranted = jest.fn().mockReturnValue(true)
			app.createRoutesData.mockRestore()

			expect(() => {
				customRoutesFixtures[1].path = '/document-fragment/'
				app.createRoutesData(customRoutesFixtures)
			}).toThrow(
				new Error(
					'App::createRoutesData | Route path "/document-fragment/" must not have a trailing slash.'
				)
			)
		})
	})

	describe('isInterfaceTypeFromComponentGranted', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('should call the isInterfaceTypeFromComponentGranted function with a valid component', () => {
			const result = app.isInterfaceTypeFromComponentGranted(customRoutesFixtures[0].component)

			expect(result).toBe(true)
		})

		it('should call the isInterfaceTypeFromComponentGranted function with a invalid component', () => {
			const result = app.isInterfaceTypeFromComponentGranted(document.createElement('div'))

			expect(result).toBe(false)
		})
	})

	describe('isComponentClass', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('should call the isComponentClass function with a component which extends from Component class', () => {
			const result = app.isComponentClass(customRoutesFixtures[2].component)

			expect(result).toBe(true)
		})

		it('should call the isComponentClass function with a component which not extends from Component class', () => {
			const result = app.isComponentClass(customRoutesFixtures[0].component)

			expect(result).toBe(false)
		})
	})

	describe('addEvents', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementationOnce(() => {
				// Prevent the addEvent function to be called from the constructor
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('should call the addEvents function', () => {
			document.addEventListener = jest.fn()
			app.target.addEventListener = jest.fn()

			app.addEvents.mockRestore()
			app.addEvents()

			expect(document.addEventListener).toHaveBeenCalledWith('costro::navigate', app.onNavigate)
			expect(app.target.addEventListener).toHaveBeenCalledWith('click', app.onClickOnApp)
		})
	})

	describe('onNavigate', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('should call the onNavigate function', () => {
			app.onNavigate({
				detail: {
					to: '/'
				}
			})

			expect(app.location.setPath).toHaveBeenCalledWith('/')
		})
	})

	describe('onClickOnApp', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('should call the onClickOnApp function', () => {
			document.querySelector('.link').__customLink = true

			const event = {
				preventDefault: jest.fn(),
				target: document.querySelector('.link')
			}
			app.onClickOnApp(event)

			expect(event.preventDefault).toHaveBeenCalled()
			expect(app.location.setPath).toHaveBeenCalledWith('/document-fragment')
		})
	})

	describe('onRouteChange', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementationOnce(() => {
				// Prevent the addEvent function to be called from the constructor
			})

			app = getInstance()

			jest.spyOn(app.routes, 'get')
		})

		it('should call the onRouteChange function with a valid route and without previous route', () => {
			app.getRouteMatch = jest.fn().mockReturnValue(routeDocumentFragment)
			app.destroyCurrentRoute = jest.fn()
			app.createComponent = jest.fn()

			app.onRouteChange.mockRestore()
			app.onRouteChange('/document-fragment')

			expect(app.getRouteMatch).toHaveBeenCalledWith('/document-fragment')
			expect(app.currentRoute).toStrictEqual(routeDocumentFragment)
			expect(app.destroyCurrentRoute).not.toHaveBeenCalled()
			expect(app.createComponent).toHaveBeenCalled()
		})

		it('should call the onRouteChange function with a valid route already rendered', () => {
			app.currentRoute = routeString

			app.getRouteMatch = jest.fn().mockReturnValue(routeString)
			app.destroyCurrentRoute = jest.fn()
			app.createComponent = jest.fn()

			app.onRouteChange.mockRestore()
			app.onRouteChange('/string')

			expect(app.getRouteMatch).toHaveBeenCalledWith('/string')
			expect(app.destroyCurrentRoute).not.toHaveBeenCalled()
			expect(app.createComponent).not.toHaveBeenCalled()
		})

		it('should call the onRouteChange function with a valid route and a previous route', () => {
			app.currentRoute = routeString

			app.getRouteMatch = jest.fn().mockReturnValue(routeDocumentFragment)
			app.destroyCurrentRoute = jest.fn()
			app.createComponent = jest.fn()

			app.onRouteChange.mockRestore()
			app.onRouteChange('/document-fragment')

			expect(app.getRouteMatch).toHaveBeenCalledWith('/document-fragment')
			expect(app.destroyCurrentRoute).toHaveBeenCalled()
			expect(app.currentRoute).toStrictEqual(routeDocumentFragment)
			expect(app.createComponent).toHaveBeenCalled()
		})

		it('should call the onRouteChange function with an unknown route and a current route to destroy (true && true)', () => {
			app.currentRoute = routeDocumentFragment

			app.getRouteMatch = jest.fn().mockReturnValue(undefined)
			app.destroyCurrentRoute = jest.fn()
			app.createComponent = jest.fn()

			app.onRouteChange.mockRestore()
			app.onRouteChange('/unknown-route')

			expect(app.getRouteMatch).toHaveBeenCalledWith('/unknown-route')
			expect(app.destroyCurrentRoute).toHaveBeenCalled()
			expect(app.createComponent).not.toHaveBeenCalled()
		})

		it('should call the onRouteChange function with an unknown route and without a current route to destroy (false && true)', () => {
			app.getRouteMatch = jest.fn().mockReturnValue(undefined)
			app.destroyCurrentRoute = jest.fn()
			app.createComponent = jest.fn()

			app.onRouteChange.mockRestore()
			app.onRouteChange('/unknown-route')

			expect(app.getRouteMatch).toHaveBeenCalledWith('/unknown-route')
			expect(app.destroyCurrentRoute).not.toHaveBeenCalled()
			expect(app.createComponent).not.toHaveBeenCalled()
		})

		it('should call the onRouteChange function with an unknown route and the silent mode enabled and with a current route to destroy (true && false)', () => {
			app.currentRoute = routeDocumentFragment

			app.getRouteMatch = jest.fn().mockReturnValue(undefined)
			app.destroyCurrentRoute = jest.fn()
			app.createComponent = jest.fn()

			app.silentOnNotFound = true
			app.onRouteChange.mockRestore()
			app.onRouteChange('/unknown-route')

			expect(app.getRouteMatch).toHaveBeenCalledWith('/unknown-route')
			expect(app.createComponent).not.toHaveBeenCalled()
			expect(app.destroyCurrentRoute).not.toHaveBeenCalled()
		})

		it('should call the onRouteChange function with an unknown route and the silent mode enabled and without a current route to destroy (false && false)', () => {
			app.currentRoute = undefined

			app.getRouteMatch = jest.fn().mockReturnValue(undefined)
			app.destroyCurrentRoute = jest.fn()
			app.createComponent = jest.fn()

			app.silentOnNotFound = true
			app.onRouteChange.mockRestore()
			app.onRouteChange('/unknown-route')

			expect(app.getRouteMatch).toHaveBeenCalledWith('/unknown-route')
			expect(app.destroyCurrentRoute).not.toHaveBeenCalled()
			expect(app.createComponent).not.toHaveBeenCalled()
		})
	})

	describe('getRouteMatch', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		// Remove the not found route added in these tests
		afterEach(() => {
			customRoutes.delete('*')
		})

		it('should call the getRouteMatch function with a valid route', () => {
			const result = app.getRouteMatch('/document-fragment')

			expect(result).toStrictEqual(routeDocumentFragment)
		})

		it('should call the getRouteMatch function with a valid route with segments', () => {
			jest.spyOn(app.routes, 'get')

			const result = app.getRouteMatch('/custom-component/42/john-doe')

			expect(app.routes.get).toHaveBeenCalledTimes(2)
			expect(app.routes.get).toHaveBeenCalledWith('/custom-component/42/john-doe')
			expect(app.routes.get).toHaveBeenCalledWith('/custom-component/:id/:name')
			expect(result).toStrictEqual(app.routes.get('/custom-component/:id/:name'))
		})

		it('should call the getRouteMatch function with a not found route', () => {
			jest.spyOn(app.routes, 'get')

			const notFoundRoute = {
				component: () => <h1>Not found</h1>,
				dynamicSegments: [],
				interfaceType: null,
				isComponentClass: false,
				isComponentClassReady: false,
				path: '*',
				pathRegExp: '^*$',
				props: undefined
			}
			app.routes.set('*', notFoundRoute)
			const result = app.getRouteMatch('/unknown-route')

			expect(app.routes.get).toHaveBeenCalledTimes(2)
			expect(app.routes.get).toHaveBeenNthCalledWith(1, '/unknown-route')
			expect(app.routes.get).toHaveBeenNthCalledWith(2, '*')
			expect(result).toStrictEqual(app.routes.get('*'))
		})

		it('should call the getRouteMatch function with the silent mode enabled and a not found route', () => {
			jest.spyOn(app.routes, 'get')

			const notFoundRoute = {
				component: () => <h1>Not found</h1>,
				dynamicSegments: [],
				interfaceType: null,
				isComponentClass: false,
				isComponentClassReady: false,
				path: '*',
				pathRegExp: '^*$',
				props: undefined
			}
			app.routes.set('*', notFoundRoute)
			app.silentOnNotFound = true
			const result = app.getRouteMatch('/unknown-route')

			expect(app.routes.get).toHaveBeenCalledTimes(1)
			expect(app.routes.get).toHaveBeenNthCalledWith(1, '/unknown-route')
			expect(result).toStrictEqual(undefined)
		})

		it('should call the getRouteMatch function with an unknown route', () => {
			jest.spyOn(app.routes, 'get')

			const result = app.getRouteMatch('/unknown-route')

			expect(app.routes.get).toHaveBeenCalledTimes(2)
			expect(app.routes.get).toHaveBeenCalledWith('/unknown-route')
			expect(app.routes.get).toHaveBeenCalledWith('*')
			expect(result).toStrictEqual(undefined)
		})
	})

	describe('destroyCurrentRoute', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('should call the destroyCurrentRoute function', () => {
			app.previousRoute = routeDocumentFragment
			app.currentRoute = routeString

			app.destroyComponent = jest.fn()

			app.destroyCurrentRoute()

			expect(app.previousRoute).toStrictEqual(routeString)
			expect(app.currentRoute).toBe(undefined)
			expect(app.destroyComponent).toHaveBeenCalled()
		})
	})

	describe('destroyComponent', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('should call the destroyComponent function', () => {
			app.previousRoute = {
				component: {
					afterDestroy: jest.fn(),
					beforeDestroy: jest.fn()
				},
				isComponentClass: true
			}

			app.target.replaceChildren = jest.fn()

			app.destroyComponent()

			expect(app.previousRoute.component.beforeDestroy).toHaveBeenCalled()
			expect(app.target.replaceChildren).toHaveBeenCalled()
			expect(app.previousRoute.component.afterDestroy).toHaveBeenCalled()
		})

		it('should call the destroyComponent function without replaceChildren support', () => {
			app.previousRoute = {
				component: {
					afterDestroy: jest.fn(),
					beforeDestroy: jest.fn()
				},
				isComponentClass: true
			}

			Element.prototype.replaceChildren = undefined

			app.destroyComponent()

			expect(app.previousRoute.component.beforeDestroy).toHaveBeenCalled()
			expect(app.target.innerHTML).toStrictEqual('')
			expect(app.previousRoute.component.afterDestroy).toHaveBeenCalled()
		})
	})

	describe('createComponent', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('should call the createComponent function with a component and HTMLElement', async () => {
			app.currentRoute = {
				component: {
					afterRender: jest.fn()
				},
				interfaceType: null,
				isComponentClass: true,
				isComponentClassReady: false
			}

			app.initComponentInCache = jest.fn()
			app.getComponentView = jest.fn().mockResolvedValue(<div>Component</div>)
			app.getInterfaceTypeFromView = jest.fn().mockReturnValue('ELEMENT_NODE')
			app.transformLinksInStringComponent = jest.fn()
			app.target.appendChild = jest.fn()

			await app.createComponent()

			expect(app.initComponentInCache).toHaveBeenCalled()
			expect(app.getComponentView).toHaveBeenCalled()
			expect(app.getInterfaceTypeFromView).toHaveBeenCalled()
			expect(app.currentRoute.interfaceType).toBe('ELEMENT_NODE')
			expect(app.transformLinksInStringComponent).not.toHaveBeenCalled()
			expect(app.target.appendChild).toHaveBeenCalledWith(<div>Component</div>)
			expect(app.currentRoute.component.afterRender).toHaveBeenCalled()
		})

		it('should call the createComponent function with a component and String', async () => {
			app.currentRoute = {
				component: {
					afterRender: jest.fn()
				},
				interfaceType: null,
				isComponentClass: true,
				isComponentClassReady: false
			}

			app.initComponentInCache = jest.fn()
			app.getComponentView = jest
				.fn()
				.mockResolvedValue('<div><a href="" class="customLink">Link</a></div>')
			app.getInterfaceTypeFromView = jest.fn().mockReturnValue('STRING')
			app.transformLinksInStringComponent = jest.fn().mockReturnValue(<div />)
			app.target.appendChild = jest.fn()

			await app.createComponent()

			expect(app.initComponentInCache).toHaveBeenCalled()
			expect(app.getComponentView).toHaveBeenCalled()
			expect(app.getInterfaceTypeFromView).toHaveBeenCalled()
			expect(app.currentRoute.interfaceType).toBe('STRING')
			expect(app.transformLinksInStringComponent).toHaveBeenCalledWith(
				'<div><a href="" class="customLink">Link</a></div>'
			)
			expect(app.target.appendChild).toHaveBeenCalledWith(<div />)
			expect(app.currentRoute.component.afterRender).toHaveBeenCalled()
		})

		it('should call the createComponent function with a promise returning undefined (route has changed)', async () => {
			app.currentRoute = {
				component: {
					afterRender: jest.fn()
				},
				interfaceType: null,
				isComponentClass: true,
				isComponentClassReady: false
			}

			app.initComponentInCache = jest.fn()
			app.getComponentView = jest.fn().mockResolvedValue(undefined)
			app.getInterfaceTypeFromView = jest.fn()
			app.transformLinksInStringComponent = jest.fn()
			app.target.appendChild = jest.fn()
			console.warn = jest.fn()

			await app.createComponent()

			expect(app.initComponentInCache).toHaveBeenCalled()
			expect(app.getComponentView).toHaveBeenCalled()
			expect(app.getInterfaceTypeFromView).not.toHaveBeenCalled()
			expect(app.transformLinksInStringComponent).not.toHaveBeenCalled()
			expect(app.target.appendChild).not.toHaveBeenCalled()
			expect(app.currentRoute.component.afterRender).not.toHaveBeenCalled()
		})

		it('should call the createComponent function with a promise rejected', async () => {
			app.currentRoute = {
				component: {
					afterRender: jest.fn()
				},
				interfaceType: null,
				isComponentClass: true,
				isComponentClassReady: false
			}

			app.initComponentInCache = jest.fn()
			app.getComponentView = jest.fn().mockRejectedValue(new Error('Promise rejection error'))

			app.getInterfaceTypeFromView = jest.fn()
			app.transformLinksInStringComponent = jest.fn()
			app.target.appendChild = jest.fn()
			app.test = jest.fn()
			console.warn = jest.fn()

			await app.createComponent()

			expect(app.initComponentInCache).toHaveBeenCalled()
			expect(app.getComponentView).toHaveBeenCalled()
			expect(app.getInterfaceTypeFromView).not.toHaveBeenCalled()
			expect(app.transformLinksInStringComponent).not.toHaveBeenCalled()
			expect(app.target.appendChild).not.toHaveBeenCalled()
			expect(app.currentRoute.component.afterRender).not.toHaveBeenCalled()
		})
	})

	describe('initComponentInCache', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('should call the initComponentInCache function', () => {
			class CustomComponent {
				constructor(props) {
					this.props = props
				}
			}
			app.currentRoute = {
				component: CustomComponent,
				path: '/document-fragment',
				props: {
					name: 'John'
				}
			}

			app.routes.set = jest.fn()

			app.initComponentInCache()

			expect(app.currentRoute.component.props).toStrictEqual({ name: 'John' })
			expect(app.currentRoute.component.constructor.name).toBe('CustomComponent')
			expect(app.currentRoute.isComponentClassReady).toBe(true)
			expect(app.routes.set).toHaveBeenCalledWith('/document-fragment', app.currentRoute)
		})
	})

	describe('getComponentView', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
			app.updateComponentRouteData = jest.fn()
		})

		describe('Component', () => {
			it('should call the getComponentView function with a component class with before render not a promise', async () => {
				app.currentRoute = {
					component: {
						afterRender: jest.fn(),
						beforeRender: jest.fn(),
						render: jest.fn().mockReturnValue(<div>Component</div>)
					},
					isComponentClass: true
				}
				app.runRenderWhenReady = jest.fn()

				const result = await app.getComponentView()

				expect(app.updateComponentRouteData).toHaveBeenCalled()
				expect(app.currentRoute.component.beforeRender).toHaveBeenCalled()
				expect(app.runRenderWhenReady).not.toHaveBeenCalled()
				expect(app.currentRoute.component.render).toHaveBeenCalled()
				expect(result).toStrictEqual(<div>Component</div>)
			})

			it('should call the getComponentView function with a component class with before render a promise', async () => {
				app.currentRoute = {
					component: {
						afterRender: jest.fn(),
						beforeRender: jest.fn().mockResolvedValue(),
						render: jest.fn()
					},
					isComponentClass: true
				}
				app.runRenderWhenReady = jest.fn().mockResolvedValue(<div>Component</div>)

				const result = await app.getComponentView()

				expect(app.updateComponentRouteData).toHaveBeenCalled()
				expect(app.currentRoute.component.beforeRender).toHaveBeenCalled()
				expect(app.runRenderWhenReady).toHaveBeenCalled()
				expect(app.currentRoute.component.render).not.toHaveBeenCalled()
				expect(result).toStrictEqual(<div>Component</div>)
			})

			it('should call the getComponentView function with a component class with before render a promise and route has changed', async () => {
				const beforeRenderMock = jest.fn().mockResolvedValue()

				app.currentRoute = {
					component: {
						afterRender: jest.fn(),
						beforeRender: beforeRenderMock,
						render: jest.fn()
					},
					isComponentClass: true
				}
				app.runRenderWhenReady = jest.fn().mockResolvedValue(<div>Component</div>)

				const result = await app.getComponentView()

				expect(app.updateComponentRouteData).toHaveBeenCalled()
				expect(app.currentRoute.component.beforeRender).toHaveBeenCalled()
				expect(app.runRenderWhenReady).toHaveBeenCalledWith(app.currentRoute, expect.any(Promise))
				expect(app.currentRoute.component.render).not.toHaveBeenCalled()
				expect(result).toStrictEqual(<div>Component</div>)
			})
		})

		describe('Not a component', () => {
			it('should call the getComponentView function with not a component class', async () => {
				app.currentRoute = {
					component: jest.fn().mockReturnValue(<div>Component</div>),
					isComponentClass: false,
					props: {
						name: 'John Doe'
					}
				}
				jest.spyOn(app.currentRoute.component, 'call')

				const result = await app.getComponentView()

				expect(app.updateComponentRouteData).not.toHaveBeenCalled()
				expect(app.currentRoute.component.call).toHaveBeenCalledWith(app.currentRoute.component, {
					name: 'John Doe'
				})
				expect(result).toStrictEqual(<div>Component</div>)
			})
		})

		it('should call the getComponentView function with a promise rejection', async () => {
			await expect(app.getComponentView()).rejects.toStrictEqual(
				new Error('getComponentView::promise not resolved')
			)
		})
	})

	describe('runRenderWhenReady', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
			app.updateComponentRouteData = jest.fn()
		})

		it('should call the runRenderWhenReady function with render function called', async () => {
			app.currentRoute = {
				component: {
					render: jest.fn().mockReturnValue(<div>Component</div>)
				},
				isComponentClass: true,
				path: '/home'
			}

			const result = await app.runRenderWhenReady(app.currentRoute, jest.fn().mockResolvedValue())

			expect(app.currentRoute.component.render).toHaveBeenCalled()
			expect(result).toStrictEqual(<div>Component</div>)
		})

		it('should call the runRenderWhenReady function with route changed and render function not called', async () => {
			app.currentRoute = {
				component: {
					render: jest.fn().mockReturnValue(<div>Component</div>)
				},
				path: '/page-2'
			}

			const previousRoute = {
				component: {
					render: jest.fn().mockReturnValue(<div>Component</div>)
				},
				path: '/page-1'
			}

			const result = await app.runRenderWhenReady(previousRoute, jest.fn().mockResolvedValue())

			expect(app.currentRoute.component.render).not.toHaveBeenCalled()
			expect(result).toStrictEqual(undefined)
		})
	})

	describe('updateComponentRouteData', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('should call the updateComponentRouteData function', () => {
			app.location = {
				currentPath: '/custom-component/42/john-doe'
			}
			app.currentRoute = {
				component: {
					route: {
						params: {},
						path: ''
					}
				},
				dynamicSegments: ['id', 'name'],
				pathRegExp: '^/custom-component/([^/]*)/([^/]*)$'
			}

			app.updateComponentRouteData()

			expect(app.currentRoute.component.route.path).toBe('/custom-component/42/john-doe')
			expect(app.currentRoute.component.route.params).toStrictEqual({
				id: '42',
				name: 'john-doe'
			})
		})
	})

	describe('getInterfaceTypeFromView', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('should call the getInterfaceTypeFromView function with string type', () => {
			const result = app.getInterfaceTypeFromView('')

			expect(result).toBe('STRING')
		})

		it('should call the getInterfaceTypeFromView function with Node.ELEMENT_NODE type', () => {
			const result = app.getInterfaceTypeFromView(document.createElement('div'))

			expect(result).toBe('ELEMENT_NODE')
		})

		it('should call the getInterfaceTypeFromView function with Node.DOCUMENT_FRAGMENT_NODE type', () => {
			const result = app.getInterfaceTypeFromView(document.createDocumentFragment())

			expect(result).toBe('ELEMENT_NODE')
		})

		it('should call the getInterfaceTypeFromView function with invalid type', () => {
			const result = app.getInterfaceTypeFromView(() => {
				/* Empty */
			})

			expect(result).toBe(null)
		})
	})

	describe('transformLinksInStringComponent', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('should call the transformLinksInStringComponent function', () => {
			const result = app.transformLinksInStringComponent(
				'<a href="/document-fragment" class="btn __customLink">Document Fragment</a>'
			)

			const fragment = document.createDocumentFragment()
			const link = document.createElement('a')
			link.setAttribute('href', '/document-fragment')
			link.setAttribute('class', 'btn')
			link.innerHTML = 'Document Fragment'
			fragment.appendChild(link)

			expect(result).toStrictEqual(fragment)
			expect(result.isEqualNode(fragment)).toBe(true)
			expect(result.outerHTML).toStrictEqual(fragment.outerHTML)
			expect(result.querySelector('.btn').__customLink).toBe(true)
		})
	})

	describe('destroy', () => {
		beforeEach(() => {
			jest.spyOn(App.prototype, 'createRoutesData').mockReturnValue(customRoutes)
			jest.spyOn(App.prototype, 'addEvents').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(App.prototype, 'onRouteChange').mockImplementation(() => {
				/* Empty */
			})

			app = getInstance()
		})

		it('should call the destroy function', () => {
			document.removeEventListener = jest.fn()
			app.target.removeEventListener = jest.fn()
			app.routes.clear = jest.fn()
			app.target.replaceChildren = jest.fn()

			app.currentRoute = ''
			app.previousRoute = ''

			app.destroy()

			expect(app.location.destroy).toHaveBeenCalled()
			expect(document.removeEventListener).toHaveBeenCalledWith('costro::navigate', app.onNavigate)
			expect(app.target.removeEventListener).toHaveBeenCalledWith('click', app.onClickOnApp)
			expect(app.currentRoute).toBe(undefined)
			expect(app.previousRoute).toBe(undefined)
			expect(app.routes.clear).toHaveBeenCalled()
			expect(app.target.replaceChildren).toHaveBeenCalled()
		})
	})
})
