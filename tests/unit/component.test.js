import Component from '@src/component'

let component

const getInstance = () => {
	const instance = new Component({
		page: 'home'
	})
	instance.__getExternalStore = () => {
		/* Empty */
	}
	return instance
}

beforeEach(() => {
	component = getInstance()
})

describe('Component ', () => {
	describe('Component constructor', () => {
		it('Should call the constructor', () => {
			expect(component.props).toStrictEqual({ page: 'home' })
			expect(component.store).toStrictEqual(new Map())
			expect(component.__isComponent).toStrictEqual(true)
			expect(component.beforeRender).toBeInstanceOf(Function)
			expect(component.afterRender).toBeInstanceOf(Function)
			expect(component.beforeDestroy).toBeInstanceOf(Function)
			expect(component.afterDestroy).toBeInstanceOf(Function)
			expect(component.render).toBeInstanceOf(Function)
		})
	})

	describe('Component beforeRender', () => {
		it('Should call the beforeRender', () => {
			component.beforeRender()
		})
	})

	describe('Component afterRender', () => {
		it('Should call the afterRender', () => {
			component.afterRender()
		})
	})

	describe('Component beforeDestroy', () => {
		it('Should call the beforeDestroy', () => {
			component.beforeDestroy()
		})
	})

	describe('Component afterDestroy', () => {
		it('Should call the afterDestroy', () => {
			component.afterDestroy()
		})
	})

	describe('Component render', () => {
		it('Should call the render', () => {
			try {
				component.render()
			} catch (error) {
				expect(error).toEqual(
					new Error('You have to implement the function "render" for the component.')
				)
			}
		})
	})
})
