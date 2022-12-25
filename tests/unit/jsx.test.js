import { createElement, Fragment, h } from '@src/jsx'

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
			const onClickFn = () => {
				/** Empty */
			}
			const result = createElement('div', {
				className: ' box ',
				'data-ignore-boolean': false,
				'data-ignore-null': null,
				'data-track': true,
				'data-track-id': 1,
				'data-track-params': 'home',
				dataset: { foo: 'bar' },
				innerHTML: '<span>Inner</span>',
				onClick: onClickFn,
				style: 'align-items: center; display: flex;'
			})

			expect(result.outerHTML).toStrictEqual(
				'<div class="box" data-track="" data-track-id="1" data-track-params="home" data-foo="bar" style="align-items: center; display: flex;"><span>Inner</span></div>'
			)
			expect(result.onclick).toStrictEqual(onClickFn)
			expect(result.dataset.foo).toStrictEqual('bar')
		})

		it('Should call the createElement function with a string tag and style attribute in object format', () => {
			const result = createElement('div', {
				style: {
					alignItems: 'center',
					display: 'flex'
				},
				class: 'box'
			})

			expect(result.outerHTML).toStrictEqual(
				'<div style="align-items: center; display: flex;" class="box"></div>'
			)
		})

		it('Should call the createElement function with a string tag and children as node', () => {
			// eslint-disable-next-line react/jsx-key
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
