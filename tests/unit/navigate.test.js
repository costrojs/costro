import navigate from '@src/navigate'

describe('navigate', () => {
	it('Should call the navigate function', () => {
		document.dispatchEvent = jest.fn()
		window.CustomEvent = jest.fn()

		navigate('/home')

		expect(window.CustomEvent).toHaveBeenCalledWith('navigate', {
			detail: {
				to: '/home'
			}
		})
		expect(document.dispatchEvent).toHaveBeenCalledWith(new window.CustomEvent())
	})
})
