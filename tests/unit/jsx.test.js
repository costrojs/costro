import { createElement, Fragment, h } from '@src/jsx'

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

let element
let svg

function getSvgChildren() {
	const g = document.createElement('g')

	const circle = document.createElement('circle')
	circle.setAttribute('cx', '24')
	circle.setAttribute('cy', '24')
	circle.setAttribute('r', '24')
	circle.setAttribute('fill', '#fbd971')

	const path1 = document.createElement('path')
	path1.setAttribute(
		'd',
		'M24 41.1c-7.6 0-13.7-6.2-13.7-13.7 0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 6.3 5.1 11.4 11.4 11.4s11.4-5.1 11.4-11.4c0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1.2 7.6-5.9 13.7-13.5 13.7z'
	)
	path1.setAttribute('fill', '#d8b11a')

	const path2 = document.createElement('path')
	path2.setAttribute(
		'd',
		'M14.3 12.2c.5-1.1 1.6-1.9 3-1.9 1.8 0 3.1 1.5 3.2 3.2 0 0 .1.4-.1 1.2-.3 1.1-.9 2-1.7 2.8l-4.4 3.8-4.3-3.8c-.8-.7-1.4-1.7-1.7-2.8-.2-.8-.1-1.2-.1-1.2.2-1.8 1.5-3.2 3.2-3.2 1.4 0 2.4.8 2.9 1.9z'
	)
	path2.setAttribute('fill', '#e64c3c')

	const path3 = document.createElement('path')
	path3.setAttribute(
		'd',
		'M33.6 12.2c.5-1.1 1.6-1.9 3-1.9 1.8 0 3.1 1.5 3.2 3.2 0 0 .1.4-.1 1.2-.3 1.1-.9 2-1.7 2.8l-4.4 3.8-4.3-3.8c-.8-.7-1.4-1.7-1.7-2.8-.2-.8-.1-1.2-.1-1.2.2-1.8 1.5-3.2 3.2-3.2 1.3 0 2.4.8 2.9 1.9z'
	)
	path3.setAttribute('fill', '#e64c3c')

	g.appendChild(circle)
	g.appendChild(path1)
	g.appendChild(path2)
	g.appendChild(path3)

	return g
}

function getDivChildren() {
	return document.createElement('button')
}

function getElement() {
	const element = document.createElement('div')
	element.classList.add('container')
	element.setAttribute('data-track', '')
	element.dataset.name = 'element'
	element.dataset.params = 1
	element.innerHTML = '<span class="span"><em class="em">Hello</em></span>'
	element.setAttribute('style', 'align-items: center; display: flex;')
	element.appendChild(getDivChildren())

	return element
}

function getSvgElement() {
	const svg = document.createElementNS(SVG_NAMESPACE, 'svg')
	svg.setAttribute('height', '50px')
	svg.setAttribute('version', '1.1')
	svg.setAttribute('viewBox', '0 0 48 48')
	svg.setAttribute('width', '50px')
	svg.setAttribute('x', '0')
	svg.setAttribute('xmlns', SVG_NAMESPACE)
	svg.setAttribute('y', '0')
	svg.appendChild(getSvgChildren())

	return svg
}

beforeEach(() => {
	element = getElement()
	svg = getSvgElement()
})

afterEach(() => {
	document.body.innerHTML = ''
})

describe('JSX', () => {
	describe('createElement', () => {
		it('Should call the createElement function with a string tag and without attribute', () => {
			const result = createElement('div', null)

			expect(result.outerHTML).toStrictEqual('<div></div>')
		})

		it('Should call the createElement function with a string svg tag and without attribute', () => {
			const result = createElement('svg', {
				viewBox: '0 0 48 48',
				xmlLang: 'fr'
			})

			expect(result.outerHTML).toStrictEqual('<svg viewBox="0 0 48 48" xml:lang="fr"></svg>')
		})

		it('Should call the createElement function with a string tag and attributes', () => {
			const onClickFn = () => {}
			const result = createElement('div', {
				className: 'box',
				dataset: { foo: 'bar' },
				'data-track': true,
				'data-track-params': 'home',
				'data-track-id': 1,
				'data-ignore-boolean': false,
				'data-ignore-null': null,
				style: 'display: flex; align-items: center;',
				innerHTML: '<span>Inner</span>',
				onClick: onClickFn
			})

			expect(result.outerHTML).toStrictEqual(
				'<div class="box" data-foo="bar" data-track="" data-track-params="home" data-track-id="1" style="display: flex; align-items: center;"><span>Inner</span></div>'
			)
			expect(result.onclick).toStrictEqual(onClickFn)
			expect(result.dataset.foo).toStrictEqual('bar')
		})

		it('Should call the createElement function with a string tag and style attribute in object format', () => {
			const result = createElement('div', {
				style: {
					display: 'flex',
					alignItems: 'center'
				}
			})

			expect(result.outerHTML).toStrictEqual(
				'<div style="display: flex; align-items: center;"></div>'
			)
		})

		it('Should call the createElement function with a string tag and children as node', () => {
			const list = [0, 1, 3].map((item) => <li>{item}</li>)
			const button = document.createElement('button')
			button.insertAdjacentHTML('beforeend', '<span>Inner</span>')
			button.classList.add('button')
			const result = createElement('div', null, list, button)

			expect(result.outerHTML).toStrictEqual(
				'<div><li>0</li><li>1</li><li>3</li><button class="button"><span>Inner</span></button></div>'
			)
		})

		it('Should call the createElement function with a string tag and children as string', () => {
			const button = document.createElement('button')
			button.insertAdjacentHTML('beforeend', 'Click me')
			const result = createElement('div', null, button, 'Text')

			expect(result.outerHTML).toStrictEqual('<div><button>Click me</button>Text</div>')
		})

		it('Should call the createElement function with a component class with __isComponent marker', () => {
			class CustomComponent {
				render() {
					return document.createElement('div')
				}
			}
			CustomComponent.prototype.__isComponent = true

			const result = createElement(CustomComponent)

			expect(result.outerHTML).toStrictEqual('<div></div>')
		})

		it('Should call the createElement function with a function as component class with isReactComponent marker', () => {
			class CustomComponent {
				render() {
					return document.createElement('div')
				}
			}
			CustomComponent.prototype.isReactComponent = true

			const result = createElement(CustomComponent)

			expect(result.outerHTML).toStrictEqual('<div></div>')
		})

		it('Should call the createElement function with a function', () => {
			const result = createElement(() => '<button>Click me</button>')

			expect(result).toStrictEqual('<button>Click me</button>')
		})
	})

	describe('Fragment', () => {
		it('Should call the Fragment function', () => {
			const result = Fragment()

			expect(result).toStrictEqual(document.createDocumentFragment())
		})

		it('Should call the Fragment function with children', () => {
			const div = document.createElement('div')

			const result = Fragment({
				children: [div, 'Hello']
			})

			const fragment = document.createDocumentFragment()
			fragment.appendChild(document.createElement('div'))
			fragment.appendChild(document.createTextNode('Hello'))

			expect(result).toStrictEqual(fragment)
		})
	})
})
