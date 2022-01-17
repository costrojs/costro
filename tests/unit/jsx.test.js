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

describe('createElement', () => {
	it('Should call the createElement function', () => {
		const result = createElement(
			'div',
			{
				class: 'container',
				'data-track': true,
				dataset: {
					name: 'element',
					params: 1
				},
				innerHTML: '<span class="span"><em class="em">Hello</em></span>',
				style: 'align-items: center; display: flex;'
			},
			getDivChildren()
		)

		expect(result).toStrictEqual(element)
		expect(result.isEqualNode(element)).toBe(true)
		expect(result.outerHTML).toStrictEqual(element.outerHTML)
	})

	it('Should call the createElement function with style object', () => {
		const result = createElement(
			'div',
			{
				class: 'container',
				'data-track': true,
				dataset: {
					name: 'element',
					params: 1
				},
				innerHTML: '<span class="span"><em class="em">Hello</em></span>',
				style: {
					alignItems: 'center',
					display: 'flex'
				}
			},
			getDivChildren()
		)

		expect(result).toStrictEqual(element)
		expect(result.isEqualNode(element)).toBe(true)
		expect(element.outerHTML).toEqual(result.outerHTML)
	})

	it('Should call the createElement function with event listener', () => {
		const onClick = (e) => {
			/* Empty */
		}
		const onSubmit = (e) => {
			/* Empty */
		}

		const result = createElement(
			'div',
			{
				class: 'container',
				'data-track': true,
				dataset: {
					name: 'element',
					params: 1
				},
				innerHTML: '<span class="span"><em class="em">Hello</em></span>',
				onClick,
				onSubmit,
				style: 'align-items: center; display: flex;'
			},
			getDivChildren()
		)

		expect(result.onclick).toBeInstanceOf(Function)
		expect(result.onclick).toStrictEqual(onClick)
		expect(result.onsubmit).toBeInstanceOf(Function)
		expect(result.onsubmit).toStrictEqual(onSubmit)
	})

	it('Should call the createElement function with a tag function', () => {
		const tagFn = () => {
			return getElement()
		}

		const result = createElement(tagFn, {
			class: 'container',
			'data-track': true,
			dataset: {
				name: 'element',
				params: 1
			},
			innerHTML: '<span class="span"><em class="em">Hello</em></span>',
			style: 'align-items: center; display: flex;'
		})

		expect(result).toStrictEqual(element)
		expect(result.isEqualNode(element)).toBe(true)
		expect(element.outerHTML).toStrictEqual(result.outerHTML)
	})

	it('Should call the createElement function with a tag function and no attributes', () => {
		const div = document.createElement('div')
		const tagFn = () => {
			return div
		}

		const result = createElement(tagFn, false)

		expect(result).toStrictEqual(div)
		expect(result.isEqualNode(div)).toBe(true)
		expect(div.outerHTML).toStrictEqual(result.outerHTML)
	})

	it('Should call the createElement function with a class and __isComponent prototype and attributes', () => {
		class CustomComponent {
			render() {
				return getElement()
			}
		}
		CustomComponent.prototype.__isComponent = true

		const result = createElement(CustomComponent, {
			class: 'container',
			'data-track': true,
			dataset: {
				name: 'element',
				params: 1
			},
			innerHTML: '<span class="span"><em class="em">Hello</em></span>',
			style: 'align-items: center; display: flex;'
		})

		expect(result).toStrictEqual(element)
		expect(result.isEqualNode(element)).toBe(true)
		expect(element.outerHTML).toStrictEqual(result.outerHTML)
	})

	it('Should call the createElement function with a class and isReactComponent prototype and attributes', () => {
		class CustomComponent {
			render() {
				return getElement()
			}
		}
		CustomComponent.prototype.isReactComponent = {}

		const result = createElement(CustomComponent, {
			class: 'container',
			'data-track': true,
			dataset: {
				name: 'element',
				params: 1
			},
			innerHTML: '<span class="span"><em class="em">Hello</em></span>',
			style: 'align-items: center; display: flex;'
		})

		expect(result).toStrictEqual(element)
		expect(result.isEqualNode(element)).toBe(true)
		expect(element.outerHTML).toStrictEqual(result.outerHTML)
	})

	it('Should call the createElement function with a class and __isComponent prototype and a nested component', () => {
		class NestedCustomComponent {
			constructor(props) {
				this.props = props
			}

			render() {
				return <h2>{this.props.title}</h2>
			}
		}
		NestedCustomComponent.prototype.__isComponent = true

		class CustomComponent {
			render() {
				return <NestedCustomComponent title="Nested component" />
			}
		}
		CustomComponent.prototype.__isComponent = true

		const result = createElement(CustomComponent)

		expect(result).toStrictEqual(<h2>Nested component</h2>)
		expect(result.isEqualNode(<h2>Nested component</h2>)).toBe(true)
		expect((<h2>Nested component</h2>).outerHTML).toStrictEqual(result.outerHTML)
	})

	it('Should call the createElement function with a class and __isComponent prototype and no attributes', () => {
		class CustomComponent {
			render() {
				return getElement()
			}
		}
		CustomComponent.prototype.__isComponent = true

		const result = createElement(CustomComponent)

		expect(result).toStrictEqual(element)
		expect(result.isEqualNode(element)).toBe(true)
		expect(element.outerHTML).toStrictEqual(result.outerHTML)
	})

	it('Should call the createElement function with a child as a string', () => {
		const div = document.createElement('div')
		div.appendChild(document.createTextNode('Hello'))

		const result = createElement('div', {}, 'Hello')

		expect(result).toStrictEqual(div)
		expect(result.isEqualNode(div)).toBe(true)
		expect(div.outerHTML).toStrictEqual(result.outerHTML)
	})

	it('Should call the createElement function with a child as a number', () => {
		const div = document.createElement('div')
		div.appendChild(document.createTextNode(1))

		const result = createElement('div', {}, 1)

		expect(result).toStrictEqual(div)
		expect(result.isEqualNode(div)).toBe(true)
		expect(div.outerHTML).toStrictEqual(result.outerHTML)
	})

	it('Should call the createElement function with SVG', () => {
		const result = createElement(
			'svg',
			{
				height: '50px',
				version: '1.1',
				viewBox: '0 0 48 48',
				width: '50px',
				x: '0',
				xmlns: SVG_NAMESPACE,
				y: '0'
			},
			getSvgChildren()
		)

		expect(result).toStrictEqual(svg)
		expect(result.isEqualNode(svg)).toBe(true)
		expect(svg.outerHTML).toStrictEqual(result.outerHTML)
	})

	it('Should call the createElement function with SVG and special camel case attributes', () => {
		const svgElement = document.createElementNS(SVG_NAMESPACE, 'svg')
		svgElement.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', 'en-US')

		const result = createElement('svg', {
			xmlLang: 'en-US'
		})

		expect(result).toStrictEqual(svgElement)
		expect(result.isEqualNode(svgElement)).toBe(true)
		expect(result.outerHTML).toStrictEqual(svgElement.outerHTML)
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
