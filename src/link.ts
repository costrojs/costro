import type { Attributes } from './types'

/**
 * Create the link
 * @param options
 * @param options.to Location path
 * @param options.children The children of the element
 * @param options.attrs The attributes of the element
 * @param isHtml The function is called from HTML
 * @returns Element as string or HTMLElement
 */
export default function Link(
	{
		to,
		children = [],
		...attrs
	}: {
		attrs?: Attributes
		children?: any[] | string
		to: string
	},
	isHtml = false
): HTMLElement | string | any {
	// @types/react-dom displays a warning if the Link component returns a JSX element OR a String (compatibility with JSX & Template String). The "any" type solves this problem.

	// JSX runtime automatic can send child without an array
	children = ([] as any[]).concat(children)

	const element = document.createElement('a')
	element.setAttribute('href', to)

	// Insert Link children elements
	const fragment = document.createDocumentFragment()
	for (let i = 0, length = children.length; i < length; i++) {
		const child = children[i]
		if (child.nodeType === Node.ELEMENT_NODE) {
			fragment.appendChild(child)
		} else if (typeof child === 'string') {
			fragment.appendChild(document.createTextNode(child))
		}
	}
	element.appendChild(fragment)

	// Insert all attributes of the element
	const keys = Object.keys(attrs) as string[]
	for (let i = 0, length = keys.length; i < length; i++) {
		const key = keys[i]
		// @ts-expect-error
		const value = attrs[key]

		// Exclude __self and __source keys
		if (!key.startsWith('__') && value !== false && value !== null) {
			element.setAttribute(key === 'className' ? 'class' : key, value === true ? '' : value)
		}
	}

	// Insert the flag for the event delegation
	// Must be executed after adding attributes (conflict between setAttribute('class') and classList.add())
	// @ts-expect-error
	element.__customLink = true
	if (isHtml) {
		element.classList.add('__customLink')
	}

	return isHtml ? element.outerHTML : element
}
