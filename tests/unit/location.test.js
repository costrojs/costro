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
	const instance = new Location(callback, 'hash')
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
			jest.spyOn(Location.prototype, 'getPath').mockReturnValue('/document-fragment')
		})

		it('Should call the constructor', () => {
			const location = getInstance()

			expect(location.callback).toBe(callback)
			expect(location.mode).toBe('hash')
			expect(location.isHashMode).toBe(true)
			expect(location.currentPath).toBe('/document-fragment')
		})
	})

	describe('Location init', () => {
		beforeEach(() => {
			jest.spyOn(Location.prototype, 'getPath').mockImplementation(() => {
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

			location = getInstance()
		})

		it('Should call the addEvents with hash mode', () => {
			window.addEventListener = jest.fn()

			location.addEvents()

			expect(window.addEventListener).toHaveBeenCalledWith(
				'hashchange',
				location.onRouteChange
			)
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

		it('Should call the getPath with hash mode and no hash in the url', () => {
			mockWindowLocation({
				pathname: '/document-fragment'
			})

			location.getPath.mockRestore()
			location.isHashMode = false
			const result = location.getPath()

			expect(result).toBe('/document-fragment')
		})
	})

	describe('Location setPath', () => {
		beforeEach(() => {
			jest.spyOn(Location.prototype, 'getPath').mockImplementation(() => {
				/* Empty */
			})

			location = getInstance()
		})

		afterEach(() => {
			expect(location.currentPath).toBe('/document-fragment')
		})

		it('Should call the setPath with hash mode', () => {
			location.getPath.mockRestore()

			location.getPath = jest.fn().mockReturnValue('/string')
			window.history.pushState = jest.fn()
			location.callback = jest.fn()

			location.setPath('/document-fragment')

			expect(window.location.hash).toBe('/document-fragment')
			expect(window.history.pushState).not.toHaveBeenCalled()
			expect(location.callback).not.toHaveBeenCalled()
		})

		it('Should call the setPath with history mode', () => {
			location.getPath.mockRestore()

			location.getPath = jest.fn().mockReturnValue('/string')
			window.history.pushState = jest.fn()
			location.callback = jest.fn()

			location.isHashMode = false
			location.setPath('/document-fragment')

			expect(window.location.hash).toBe('')
			expect(window.history.pushState).toHaveBeenCalledWith(
				{
					path: '/document-fragment'
				},
				'',
				'/document-fragment'
			)
			expect(location.callback).toHaveBeenCalledWith('/document-fragment')
		})
	})

	describe('Location destroy', () => {
		beforeEach(() => {
			jest.spyOn(Location.prototype, 'getPath').mockImplementation(() => {
				/* Empty */
			})

			location = getInstance()

			window.removeEventListener = jest.fn()
		})

		it('Should call the destroy with hash mode', () => {
			location.destroy()

			expect(window.removeEventListener).toHaveBeenCalledWith(
				'hashchange',
				location.onRouteChange
			)
		})

		it('Should call the destroy with history mode', () => {
			location.isHashMode = false
			location.destroy()

			expect(window.removeEventListener).toHaveBeenCalledWith(
				'popstate',
				location.onRouteChange
			)
		})
	})
})
