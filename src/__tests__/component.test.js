import { extend } from '../utils'
import Component from '../component'

let component

const getInstance = () => {
	const instance = new Component({
		page: 'home'
	})
	instance.__getExternalStore = () => {}
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
			expect(component.__isComponent).toStrictEqual({})
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

	describe('Component setStore', () => {
		it('Should call the setStore', () => {
			component.store = new Map([['identity', { lastname: 'Doe', name: 'John' }]])
			component.setStore({
				identity: {
					private: true
				},
				page: 'home'
			})

			const store = new Map([
				['page', 'home'],
				['identity', { lastname: 'Doe', name: 'John', private: true }]
			])
			expect(component.store).toStrictEqual(store)
		})
	})

	describe('Component getStore', () => {
		it('Should call the getStore', () => {
			component.store = new Map([['identity', { lastname: 'Doe', name: 'John' }]])
			const result = component.getStore('identity')

			expect(result).toStrictEqual({
				lastname: 'Doe',
				name: 'John'
			})
		})

		it('Should call the getStore without key', () => {
			const result = component.getStore()

			expect(result).toBe(null)
		})

		it('Should call the getStore with a path', () => {
			component.__getExternalStore = jest.fn().mockReturnValue(true)

			const result = component.getStore('identity', '/home')

			expect(result).toBe(true)
			expect(component.__getExternalStore).toHaveBeenCalledWith('identity', '/home')
		})
	})
})
