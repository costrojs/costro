import link from '@src/link'

describe('link', () => {
	it('Should call the link function with HTML', () => {
		const result = link(
			{
				children: ['Home'],
				class: 'btn btn-info',
				'data-test': true,
				to: '/home'
			},
			true
		)

		expect(result).toBe('<a href="/home" class="btn btn-info customLink" data-test="">Home</a>')
	})

	it('Should call the link function with HTML and className attribute', () => {
		const result = link(
			{
				children: ['Home'],
				className: 'btn btn-info',
				to: '/home'
			},
			true
		)

		expect(result).toBe('<a href="/home" class="btn btn-info customLink">Home</a>')
	})

	it('Should call the link function with HTML and without children', () => {
		const result = link(
			{
				to: '/home'
			},
			true
		)

		expect(result).toBe('<a href="/home" class="customLink"></a>')
	})

	it('Should call the link function without HTML', () => {
		const span = document.createElement('span')
		span.innerHTML = 'Home'

		const result = link({
			children: [span],
			class: 'btn btn-info',
			'data-test': true,
			to: '/home'
		})

		const element = document.createElement('a')
		element.setAttribute('href', '/home')
		element.classList.add('btn', 'btn-info')
		element.setAttribute('data-test', '')
		element.innerHTML = '<span>Home</span>'

		expect(result).toStrictEqual(element)
		expect(result.isEqualNode(element)).toBe(true)
		expect(result.outerHTML).toEqual(element.outerHTML)
		expect(result.__customLink).toBe(true)
	})
})
