import Location from '@src/location'

let location

/**
 * Mock implementation of  window.location
 * @param {Object} options Url
 * @param {String} options.href Url
 * @param {String} options.pathname Pathname's url
 */
function mockWindowLocation({ href = '', pathname = '' } = {}) {
	Object.defineProperty(window, 'location', {
		value: {
			href,
			pathname
		},
		writable: true
	})
}

const callback = () => {
	/* Empty */
}
const getInstance = () => {
	const instance = new Location({ basePath: '/', callback, mode: 'hash' })
	return instance
}

beforeEach(() => {
	// Reset location because each test set it manually
	location = null
})

afterEach(() => {
	window.location.hash = ''
})

describe('Location ', () => {
	describe('Location constructor', () => {
		beforeEach(() => {
			jest.spyOn(Location.prototype, 'normalizeBasePath').mockReturnValue('/')
			jest.spyOn(Location.prototype, 'getPath').mockReturnValue('/document-fragment')
		})

		it('Should call the constructor', () => {
			const location = getInstance()

			expect(location.callback).toBe(callback)
			expect(location.mode).toBe('hash')
			expect(location.basePath).toBe('/')
			expect(location.isHashMode).toBe(true)
			expect(location.currentPath).toBe('/document-fragment')
			expect(location.normalizeBasePath).toHaveBeenCalledWith('/')
			expect(location.getPath).toHaveBeenCalled()
		})
	})

	describe('Location normalizeBasePath', () => {
		beforeEach(() => {
			jest.spyOn(Location.prototype, 'getPath').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(Location.prototype, 'normalizeBasePath').mockImplementation(() => {
				/* Empty */
			})

			location = getInstance()
		})

		it('Should call the normalizeBasePath function and add the leading slash', () => {
			location.addEvents = jest.fn()

			location.normalizeBasePath.mockRestore()
			const result = location.normalizeBasePath('app/')

			expect(result).toBe('/app')
		})

		it('Should call the normalizeBasePath function and remove the trailing slash', () => {
			location.addEvents = jest.fn()

			location.normalizeBasePath.mockRestore()
			const result = location.normalizeBasePath('/app/')

			expect(result).toBe('/app')
		})
	})

	describe('Location init', () => {
		beforeEach(() => {
			jest.spyOn(Location.prototype, 'getPath').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(Location.prototype, 'normalizeBasePath').mockImplementation(() => {
				/* Empty */
			})

			location = getInstance()
		})

		it('Should call the init', () => {
			location.addEvents = jest.fn()

			location.init()

			expect(location.addEvents).toHaveBeenCalled()
		})
	})

	describe('Location addEvents', () => {
		beforeEach(() => {
			jest.spyOn(Location.prototype, 'getPath').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(Location.prototype, 'normalizeBasePath').mockImplementation(() => {
				/* Empty */
			})

			location = getInstance()
		})

		it('Should call the addEvents with hash mode', () => {
			window.addEventListener = jest.fn()

			location.addEvents()

			expect(window.addEventListener).toHaveBeenCalledWith('hashchange', location.onRouteChange)
		})

		it('Should call the addEvents with history mode', () => {
			window.addEventListener = jest.fn()

			location.isHashMode = false
			location.addEvents()

			expect(window.addEventListener).toHaveBeenCalledWith('popstate', location.onRouteChange)
		})
	})

	describe('Location onRouteChange', () => {
		beforeEach(() => {
			jest.spyOn(Location.prototype, 'getPath').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(Location.prototype, 'normalizeBasePath').mockImplementation(() => {
				/* Empty */
			})

			location = getInstance()
		})

		it('Should call the onRouteChange with hash mode', () => {
			location.getPreviousPath = jest.fn().mockReturnValue(null)
			location.getPath = jest.fn().mockReturnValue('/document-fragment')
			location.callback = jest.fn()

			const event = {
				preventDefault: jest.fn()
			}
			location.onRouteChange(event)

			expect(location.currentPath).toBe('/document-fragment')
			expect(location.callback).toHaveBeenCalledWith('/document-fragment')
		})
	})

	describe('Location getPath', () => {
		beforeEach(() => {
			jest.spyOn(Location.prototype, 'getPath').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(Location.prototype, 'normalizeBasePath').mockImplementation(() => {
				/* Empty */
			})

			location = getInstance()
		})

		it('Should call the getPath with hash mode and hash in the url', () => {
			mockWindowLocation({
				href: 'http://localhost/#/document-fragment'
			})

			location.getPath.mockRestore()
			const result = location.getPath()

			expect(result).toBe('/document-fragment')
		})

		it('Should call the getPath with hash mode and no hash in the url', () => {
			mockWindowLocation({
				href: 'http://localhost/'
			})

			location.getPath.mockRestore()
			const result = location.getPath()

			expect(result).toBe('/')
		})

		it('Should call the getPath with history mode', () => {
			mockWindowLocation({
				pathname: '/document-fragment'
			})
			location.stripBasePath = jest.fn().mockReturnValue('/document-fragment')

			location.getPath.mockRestore()
			location.isHashMode = false
			location.basePath = '/'
			const result = location.getPath()

			expect(result).toBe('/document-fragment')
			expect(location.stripBasePath).toHaveBeenCalledWith('/document-fragment', '/')
		})
	})

	describe('Location stripBasePath', () => {
		beforeEach(() => {
			jest.spyOn(Location.prototype, 'getPath').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(Location.prototype, 'normalizeBasePath').mockImplementation(() => {
				/* Empty */
			})

			location = getInstance()
		})

		it('Should call the stripBasePath function with the default base path', () => {
			const result = location.stripBasePath('/document-fragment', '/')

			expect(result).toBe('/document-fragment')
		})

		it('Should call the stripBasePath function with an invalid base path', () => {
			expect(() => {
				location.stripBasePath('/document-fragment', '/app')
			}).toThrow(
				new Error(
					'Location::stripBasePath | Invalid basepath, the pathname does not start with base path'
				)
			)
		})

		it('Should call the stripBasePath function with a valid base path', () => {
			const result = location.stripBasePath('/app/document-fragment', '/app')

			expect(result).toBe('/document-fragment')
		})

		it('Should call the stripBasePath function with a pathname without trailing slash', () => {
			const result = location.stripBasePath('/app', '/app')

			expect(result).toBe('/')
		})
	})

	describe('Location setPath', () => {
		beforeEach(() => {
			jest.spyOn(Location.prototype, 'getPath').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(Location.prototype, 'normalizeBasePath').mockImplementation(() => {
				/* Empty */
			})

			location = getInstance()
		})

		afterEach(() => {
			expect(location.currentPath).toBe('/document-fragment')
		})

		it('Should call the setPath with hash mode', () => {
			window.history.pushState = jest.fn()
			location.callback = jest.fn()

			location.setPath('/document-fragment')

			expect(window.location.hash).toBe('/document-fragment')
			expect(window.history.pushState).not.toHaveBeenCalled()
			expect(location.callback).not.toHaveBeenCalled()
		})

		it('Should call the setPath with history mode', () => {
			window.history.pushState = jest.fn()
			location.callback = jest.fn()
			location.normalizeBasePath = jest.fn().mockReturnValue('/')

			location.isHashMode = false
			location.basePath = '/'
			location.setPath('/document-fragment')

			expect(window.history.pushState).toHaveBeenCalledWith(
				{
					path: '/document-fragment'
				},
				'',
				'/document-fragment'
			)
			expect(location.callback).toHaveBeenCalledWith('/document-fragment')
		})

		it('Should call the setPath with history mode and a custom base path', () => {
			window.history.pushState = jest.fn()
			location.callback = jest.fn()
			location.normalizeBasePath = jest.fn().mockReturnValue('/app')

			location.isHashMode = false
			location.basePath = '/app'
			location.setPath('/document-fragment')

			expect(window.history.pushState).toHaveBeenCalledWith(
				{
					path: '/app/document-fragment'
				},
				'',
				'/app/document-fragment'
			)
			expect(location.callback).toHaveBeenCalledWith('/document-fragment')
		})
	})

	describe('Location destroy', () => {
		beforeEach(() => {
			jest.spyOn(Location.prototype, 'getPath').mockImplementation(() => {
				/* Empty */
			})
			jest.spyOn(Location.prototype, 'normalizeBasePath').mockImplementation(() => {
				/* Empty */
			})

			location = getInstance()

			window.removeEventListener = jest.fn()
		})

		it('Should call the destroy with hash mode', () => {
			location.destroy()

			expect(window.removeEventListener).toHaveBeenCalledWith('hashchange', location.onRouteChange)
		})

		it('Should call the destroy with history mode', () => {
			location.isHashMode = false
			location.destroy()

			expect(window.removeEventListener).toHaveBeenCalledWith('popstate', location.onRouteChange)
		})
	})
})
