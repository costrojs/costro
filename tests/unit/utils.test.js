import { hasOwn, extend } from '@src/utils'

describe('hasOwn', () => {
	it('Should call the hasOwn function with a known key', () => {
		const obj = {
			foo: true
		}
		const result = hasOwn(obj, 'foo')

		expect(result).toBe(true)
	})

	it('Should call the hasOwn function with a unknown key', () => {
		const obj = {
			foo: true
		}
		const result = hasOwn(obj, 'fooo')

		expect(result).toBe(false)
	})
})

describe('extend', () => {
	it('Should call the extend function without deep', () => {
		const obj1 = {
			name: 'John'
		}
		const obj2 = {
			lastname: 'Doe'
		}
		const result = extend(false, obj1, obj2)

		expect(result).toStrictEqual({
			lastname: 'Doe',
			name: 'John'
		})
	})

	it('Should call the extend function with deep', () => {
		const obj1 = {
			name: 'John',
			skills: {
				private: true
			}
		}
		const obj2 = {
			lastname: 'Doe',
			skills: {
				array: [1, 2, 3],
				fn: () => true,
				unknown: true
			}
		}
		const finalObj = {
			name: 'John',
			skills: {
				private: true,
				array: [1, 2, 3],
				fn: () => true,
				unknown: true
			},
			lastname: 'Doe'
		}
		const result = extend(true, obj1, obj2)

		expect(JSON.stringify(result)).toStrictEqual(JSON.stringify(finalObj))
	})
})
