import { extend } from '../utils'
import Component from '../component'

class ComponentWithoutPrivateFields {
	constructor() {
		this.store = new Map()
	}

	setStore(data) {
		const keys = Object.keys(data)
		for (let i = 0, length = keys.length; i < length; i++) {
			const key = keys[i]
			// Merge store data if key already exists
			if (this.store.has(key)) {
				const value = this.store.get(key)
				const newValue = extend(true, { [key]: value }, { [key]: data[key] })
				this.store.set(key, newValue[key])
			} else {
				this.store.set(key, data[key])
			}
		}
	}

	getStore(key, path) {
		if (key) {
			if (path) {
				return this.__getExternalStore(key, path)
			}

			return this.store.get(key)
		}

		return null
	}
}

ComponentWithoutPrivateFields.prototype.__isComponent = {}

let component
let componentWithoutPrivateFields

const getInstance = () => {
	return new Component({
		page: 'home'
	})
}

const getInstanceWithoutPrivateFields = () => {
	return new ComponentWithoutPrivateFields()
}

beforeEach(() => {
	component = getInstance()
	componentWithoutPrivateFields = getInstanceWithoutPrivateFields()
})

describe('Component ', () => {
	describe('Component constructor', () => {
		it('Should call the constructor', () => {
			expect(component.props).toStrictEqual({ page: 'home' })
			expect(component.store).toBe(undefined)
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
			componentWithoutPrivateFields.store = new Map([
				['identity', { lastname: 'Doe', name: 'John' }]
			])
			componentWithoutPrivateFields.setStore({
				identity: {
					private: true
				},
				page: 'home'
			})

			const store = new Map([
				['page', 'home'],
				['identity', { lastname: 'Doe', name: 'John', private: true }]
			])
			expect(componentWithoutPrivateFields.store).toStrictEqual(store)
		})
	})

	describe('Component getStore', () => {
		it('Should call the getStore', () => {
			componentWithoutPrivateFields.store = new Map([
				['identity', { lastname: 'Doe', name: 'John' }]
			])
			const result = componentWithoutPrivateFields.getStore('identity')

			expect(result).toStrictEqual({
				lastname: 'Doe',
				name: 'John'
			})
		})
	})
})
