import App from '@src/app'
import Location from '@src/location'
import exp from 'constants'
import { h, F } from '../../dist/jsx'
import routesFixtures from '../fixtures/routes-fixture'

jest.mock('@src/location', () => {
	return jest.fn().mockImplementation(() => {
		return {
			init: jest.fn(),
			getPath: jest.fn().mockReturnValue('/document-fragment'),
			setPath: jest.fn(),
			destroy: jest.fn()
		}
	})
})

let app
let customRoutes

const getInstance = () =>
	new App({
		mode: 'hash',
		routes: routesFixtures,
		target: document.querySelector('#app')
	})

const routes = new Map([
	[
		'/',
		{
			component: routesFixtures[0].component,
			interfaceType: null,
			isComponentClass: false,
			isComponentClassReady: false,
			path: '/',
			props: undefined
		}
	],
	[
		'/document-fragment',
		{
			component: routesFixtures[1].component,
			interfaceType: null,
			isComponentClass: false,
			isComponentClassReady: false,
			path: '/document-fragment',
			props: undefined
		}
	],
	[
		'/custom-component-1',
		{
			component: routesFixtures[2].component,
			interfaceType: null,
			isComponentClass: false,
			isComponentClassReady: false,
			path: '/custom-component-1',
			props: { title: 'home' }
		}
	],
	[
		'/custom-component-2',
		{
			component: routesFixtures[3].component,
			interfaceType: null,
			isComponentClass: false,
			isComponentClassReady: false,
			path: '/custom-component-2',
			props: undefined
		}
	],
	[
		'/string',
		{
			component: routesFixtures[4].component,
			interfaceType: null,
			isComponentClass: false,
			isComponentClassReady: false,
			path: '/string',
			props: undefined
		}
	],
	[
		'/svg',
		{
			component: routesFixtures[5].component,
			interfaceType: null,
			isComponentClass: false,
			isComponentClassReady: false,
			path: '/svg',
			props: undefined
		}
	]
])

beforeEach(() => {
	document.body.appendChild(
		<div id="app">
			<a href="/svg" class="link"></a>
		</div>
	)

	App.prototype.createRoutesData = jest.fn().mockReturnValue(routes)
	App.prototype.addEvents = jest.fn()
	App.prototype.onRouteChange = jest.fn()

	customRoutes = routesFixtures
	app = getInstance()
})

afterEach(() => {
	document.body.innerHTML = ''
})

describe('App', () => {
	describe('Constructor', () => {
		it('Should call the constructor function', () => {
			expect(app.mode).toBe('hash')
			expect(app.target).toBe(document.querySelector('#app'))
			expect(app.currentRoute).toBe(undefined)
			expect(app.previousRoute).toBe(undefined)
			expect(app.routes).toStrictEqual(routes)
			expect(Location).toHaveBeenCalledWith(expect.any(Function), 'hash')
			expect(app.location.init).toHaveBeenCalled()
			expect(app.createRoutesData).toHaveBeenCalled()
			expect(app.addEvents).toHaveBeenCalled()
			expect(app.onRouteChange).toHaveBeenCalledWith({ currentPath: '/document-fragment' })
		})

		it('Should call the constructor function with empty routes', () => {
			App.prototype.createRoutesData = jest.fn().mockReturnValue([])

			expect(() => {
				new App({
					mode: 'hash',
					routes: [],
					target: document.querySelector('#app')
				})
			}).toThrow(new Error('App::constructor | Invalid routes configuration'))
		})

		it('Should call the constructor function with invalid mode', () => {
			expect(() => {
				new App({
					mode: 'test',
					routes: customRoutes,
					target: document.querySelector('#app')
				})
			}).toThrow(new Error('App::constructor | Unknown mode "test"'))
		})
	})

	// describe('createRoutesData', () => {
	// 	it('Should call the createRoutesData function', () => {
	// 		jest.spyApp.isInterfaceTypeFromComponentGranted = jest.fn().mockResolvedValue(false)

	// 		app = new App({
	// 			routes: customRoutes,
	// 			target: document.querySelector('#app')
	// 		})

	// 		app.isInterfaceTypeFromComponentGranted = jest.fn()

	// 		const result = app.createRoutesData()

	// 		expect(result).toStrictEqual(routes)
	// 		expect(app.isInterfaceTypeFromComponentGranted).toHaveBeenCalled()
	// 	})

	// it('Should call the createRoutesData function with invalide interface type', () => {
	// 	customRoutes[0].component

	// 	const appCustom = new App({
	// 		routes: customRoutes,
	// 		target: document.querySelector('#app')
	// 	})

	// 	const result = appCustom.createRoutesData()

	// 	expect(result).toStrictEqual(routes)
	// })
	// })

	describe('isInterfaceTypeFromComponentGranted', () => {
		it('should call the isInterfaceTypeFromComponentGranted function with a valid component', () => {
			const result = app.isInterfaceTypeFromComponentGranted(customRoutes[0].component)

			expect(result).toBe(true)
		})

		it('should call the isInterfaceTypeFromComponentGranted function with a invalid component', () => {
			const result = app.isInterfaceTypeFromComponentGranted(document.createElement('div'))

			expect(result).toBe(false)
		})
	})

	// describe('addEvents', () => {
	// 	it('should call the addEvents function', () => {
	// 		document.addEventListener = jest.fn()
	// 		app.target.addEventListener = jest.fn()

	// 		app.addEvents()

	// 		expect(document.addEventListener).toHaveBeenCalledWith('navigate', app.onNavigate)
	// 		expect(app.target.addEventListener).toHaveBeenCalledWith('click', app.onClickOnApp)
	// 	})
	// })

	describe('onNavigate', () => {
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
		it('should call the onClickOnApp function', () => {
			document.querySelector('.link').__customLink = true

			const event = {
				preventDefault: jest.fn(),
				target: document.querySelector('.link')
			}
			app.onClickOnApp(event)

			expect(event.preventDefault).toHaveBeenCalled()
			expect(app.location.setPath).toHaveBeenCalledWith('/svg')
		})
	})

	// describe('onRouteChange', () => {
	// 	it('should call the onRouteChange function', () => {
	// 		app.onRouteChange({ currentPath: '/' })
	// 	})
	// })

	describe('destroyComponent', () => {
		it('should call the destroyComponent function', () => {
			app.previousRoute = {
				isComponentClass: true,
				component: {
					beforeDestroy: jest.fn(),
					afterDestroy: jest.fn()
				}
			}

			app.target.replaceChildren = jest.fn()

			app.destroyComponent()

			expect(app.previousRoute.component.beforeDestroy).toHaveBeenCalled
			expect(app.target.replaceChildren).toHaveBeenCalled()
			expect(app.previousRoute.component.afterDestroy).toHaveBeenCalled
		})
	})

	describe('createComponent', () => {
		it('should call the createComponent function with a component and HTMLElement', () => {
			app.currentRoute = {
				isComponentClass: true,
				isComponentClassReady: false,
				interfaceType: null,
				component: {
					beforeRender: jest.fn(),
					afterRender: jest.fn()
				}
			}

			app.initComponentInCache = jest.fn()
			app.getComponentView = jest.fn().mockReturnValue(<div>Component</div>)
			app.getInterfaceTypeFromView = jest.fn().mockReturnValue('ELEMENT_NODE')
			app.transformLinksInStringComponent = jest.fn()
			app.target.appendChild = jest.fn()

			app.createComponent()

			expect(app.initComponentInCache).toHaveBeenCalled
			expect(app.getComponentView).toHaveBeenCalled
			expect(app.getInterfaceTypeFromView).toHaveBeenCalled
			expect(app.currentRoute.interfaceType).toBe('ELEMENT_NODE')
			expect(app.currentRoute.component.beforeRender).toHaveBeenCalled()
			expect(app.transformLinksInStringComponent).not.toHaveBeenCalled()
			expect(app.target.appendChild).toHaveBeenCalledWith(<div>Component</div>)
			expect(app.currentRoute.component.afterRender).toHaveBeenCalled()
		})

		it('should call the createComponent function with a component and String', () => {
			app.currentRoute = {
				isComponentClass: true,
				isComponentClassReady: false,
				interfaceType: null,
				component: {
					beforeRender: jest.fn(),
					afterRender: jest.fn()
				}
			}

			app.initComponentInCache = jest.fn()
			app.getComponentView = jest
				.fn()
				.mockReturnValue('<div><a href="" class="customLink">Link</a></div>')
			app.getInterfaceTypeFromView = jest.fn().mockReturnValue('STRING')
			app.transformLinksInStringComponent = jest.fn().mockReturnValue(<div></div>)
			app.target.appendChild = jest.fn()

			app.createComponent()

			expect(app.initComponentInCache).toHaveBeenCalled
			expect(app.getComponentView).toHaveBeenCalled
			expect(app.getInterfaceTypeFromView).toHaveBeenCalled
			expect(app.currentRoute.interfaceType).toBe('STRING')
			expect(app.currentRoute.component.beforeRender).toHaveBeenCalled()
			expect(app.transformLinksInStringComponent).toHaveBeenCalledWith(
				'<div><a href="" class="customLink">Link</a></div>'
			)
			expect(app.target.appendChild).toHaveBeenCalledWith(<div></div>)
			expect(app.currentRoute.component.afterRender).toHaveBeenCalled()
		})
	})

	describe('initComponentInCache', () => {
		it('should call the initComponentInCache function', () => {
			class CustomComponent {}
			app.currentRoute = {
				path: '/svg',
				component: CustomComponent
			}

			const helpers = {
				__getExternalStore: () => {},
				getPath: () => {},
				navigate: () => {}
			}

			app.getComponentHelpers = jest.fn().mockReturnValue(helpers)
			app.routes.set = jest.fn()

			app.initComponentInCache()

			expect(app.getComponentHelpers).toHaveBeenCalled()
			expect(app.currentRoute.component.__getExternalStore).toBeInstanceOf(Function)
			expect(app.currentRoute.component.__getExternalStore).toBe(helpers.__getExternalStore)
			expect(app.currentRoute.component.getPath).toBeInstanceOf(Function)
			expect(app.currentRoute.component.getPath).toBe(helpers.getPath)
			expect(app.currentRoute.component.navigate).toBeInstanceOf(Function)
			expect(app.currentRoute.component.navigate).toBe(helpers.navigate)
			expect(app.routes.set).toHaveBeenCalledWith('/svg', app.currentRoute)
		})
	})

	describe('getComponentView', () => {
		it('should call the getComponentView function with a component class', () => {
			app.currentRoute = {
				isComponentClass: true,
				component: {
					beforeRender: jest.fn(),
					render: jest.fn().mockReturnValue(<div>Component</div>),
					afterRender: jest.fn()
				}
			}

			const result = app.getComponentView()

			expect(app.currentRoute.component.beforeRender).toHaveBeenCalled()
			expect(result).toStrictEqual(<div>Component</div>)
		})

		it('should call the getComponentView function with a component', () => {
			app.currentRoute = {
				isComponentClass: false,
				component: jest.fn().mockReturnValue(<div>Component</div>)
			}

			const result = app.getComponentView()

			expect(result).toStrictEqual(<div>Component</div>)
		})
	})

	describe('getInterfaceTypeFromView', () => {
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
			const result = app.getInterfaceTypeFromView(() => {})

			expect(result).toBe(null)
		})
	})

	describe('transformLinksInStringComponent', () => {
		it('should call the transformLinksInStringComponent function', () => {
			const result = app.transformLinksInStringComponent(
				'<a href="/svg" class="btn customLink">SVG</a>'
			)

			const fragment = document.createDocumentFragment()
			const link = document.createElement('a')
			link.setAttribute('href', '/svg')
			link.setAttribute('class', 'btn')
			link.innerHTML = 'SVG'
			fragment.appendChild(link)

			expect(result).toStrictEqual(fragment)
			expect(result.isEqualNode(fragment)).toBe(true)
			expect(result.outerHTML).toStrictEqual(fragment.outerHTML)
			expect(result.querySelector('.btn').__customLink).toBe(true)
		})
	})

	describe('getComponentHelpers', () => {
		it('should call the getComponentHelpers function', () => {
			app.location.getPath = jest.fn().mockReturnValue('/document-fragment')

			const result = app.getComponentHelpers()

			const helpers = {
				__getExternalStore: () => {},
				getPath: () => {},
				navigate: () => {}
			}

			expect(result.__getExternalStore).toBeInstanceOf(Function)
			expect(result.getPath).toBeInstanceOf(Function)
			expect(result.navigate).toBeInstanceOf(Function)
		})
	})

	describe('getComponentHelpers __getExternalStore', () => {
		it('should call the __getExternalStore helper function', () => {
			app.routes.get = jest.fn().mockReturnValue({
				isComponentClass: true,
				isComponentClassReady: true,
				component: {
					getStore: jest.fn().mockReturnValue('John')
				}
			})

			const externalStore = app.getComponentHelpers().__getExternalStore('name', '/svg')

			expect(externalStore).toBe('John')
		})

		it('should call the __getExternalStore helper function with invalid route', () => {
			app.routes.get = jest.fn().mockReturnValue(null)

			const externalStore = app.getComponentHelpers().__getExternalStore('name', '/svg')

			expect(externalStore).toBe(null)
		})

		it('should call the __getExternalStore helper function with not a component class', () => {
			app.routes.get = jest.fn().mockReturnValue({
				isComponentClass: false,
				component: () => {}
			})

			const externalStore = app.getComponentHelpers().__getExternalStore('name', '/svg')

			expect(externalStore).toBe(null)
		})

		it('should call the __getExternalStore helper function with a component class not ready', () => {
			app.routes.get = jest.fn().mockReturnValue({
				isComponentClass: true,
				isComponentClassReady: false,
				component: {
					getStore: jest.fn().mockReturnValue('John')
				}
			})

			const externalStore = app.getComponentHelpers().__getExternalStore('name', '/svg')

			expect(externalStore).toBe(null)
		})
	})

	describe('getComponentHelpers getPath', () => {
		it('should call the getPath helper function', () => {
			app.location.getPath = jest.fn().mockReturnValue('/svg')

			const path = app.getComponentHelpers().getPath()

			expect(app.location.getPath).toHaveBeenCalled()
			expect(path).toBe('/svg')
		})
	})

	describe('getComponentHelpers navigate', () => {
		it('should call the navigate helper function', () => {
			app.routes.get = jest.fn().mockReturnValue(true)
			app.location.setPath = jest.fn()

			const path = app.getComponentHelpers().navigate('/svg')

			expect(app.routes.get).toHaveBeenCalledWith('/svg')
			expect(app.location.setPath).toHaveBeenCalledWith('/svg')
		})

		it('should call the navigate helper function with invalid path', () => {
			app.routes.get = jest.fn().mockReturnValue(false)
			app.location.setPath = jest.fn()

			const path = app.getComponentHelpers().navigate('/svgg')

			expect(app.routes.get).toHaveBeenCalledWith('/svgg')
			expect(app.location.setPath).not.toHaveBeenCalled()
		})
	})

	describe('destroy', () => {
		it('should call the destroy function', () => {
			document.removeEventListener = jest.fn()
			app.target.removeEventListener = jest.fn()
			app.routes.clear = jest.fn()
			app.target.replaceChildren = jest.fn()

			app.currentRoute = ''
			app.previousRoute = ''

			app.destroy()

			expect(app.location.destroy).toHaveBeenCalled()
			expect(document.removeEventListener).toHaveBeenCalledWith('navigate', app.onNavigate)
			expect(app.target.removeEventListener).toHaveBeenCalledWith('click', app.onClickOnApp)
			expect(app.currentRoute).toBe(undefined)
			expect(app.previousRoute).toBe(undefined)
			expect(app.routes.clear).toHaveBeenCalled()
			expect(app.target.replaceChildren).toHaveBeenCalled()
		})
	})
})
