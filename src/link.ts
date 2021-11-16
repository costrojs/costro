import config from './config'
import { Attributes } from './interface'

export default function Link(
	{
		to,
		children = [],
		...attrs
	}: {
		to: string
		children: any[]
		attrs: Attributes
	},
	isHTML = false
) {
	const element = document.createElement('a')
	element.setAttribute('href', to)

	// Insert the flag for the event delegation
	// @ts-ignore
	element[config.customLinkProperty] = true
	if (isHTML) {
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

	return isHTML ? element.outerHTML : element
}
