import config from './config'
import { Attributes } from './interface'

/**
 * Create the link
 * @param {Object} options
 * @param {Object} options.to Location path
 * @param {Object} options.children The children of the element
 * @param {Object} options.attrs The attributes of the element
 * @param {Boolean} isHtml The function is called from HTML
 * @returns {(String|HTMLElement)} Element as string or HTMLElement
 */
export default function Link(
	{
		to,
		children = [],
		...attrs
	}: {
		attrs: Attributes
		children: any[]
		to: string
	},
	isHtml = false
) {
	const element = document.createElement('a')
	element.setAttribute('href', to)

	// Insert the flag for the event delegation
	// @ts-ignore
	element[config.customLinkProperty] = true
	if (isHtml) {
		element.classList.add(config.customLinkCssClass)
	}

	// Insert Link children elements
	const fragment = document.createDocumentFragment()
	for (let i = 0, length = children.length; i < length; i++) {
		const child = children[i]
		if (child instanceof HTMLElement) {
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

		// Exclude __self and __source keys
		if (!key.startsWith('__')) {
			// @ts-ignore
			element.setAttribute(key === 'className' ? 'class' : key, attrs[key])
		}
	}

	return isHtml ? element.outerHTML : element
}
