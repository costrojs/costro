import { hasOwn, extend } from '../utils'

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
		const result = extend(true, obj1, obj2)

		expect(JSON.stringify(result)).toStrictEqual(
			JSON.stringify({
				name: 'John',
				skills: {
					private: true,
					// eslint-disable-next-line sort-keys
					array: [1, 2, 3],
					fn: () => true,
					unknown: true
				},
				// eslint-disable-next-line sort-keys
				lastname: 'Doe'
			})
		)
	})
})
