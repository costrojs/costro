import config from './config'
import { Attributes } from './interface'

export default function Link(
	{
		to,
		children = [],
		...attrs
	}: {
		to: string
		children: Array<any>
		attrs: Attributes
	},
	isHTML: Boolean = false
) {
	const element = document.createElement('a')
	element.setAttribute('href', to)

	// @ts-ignore
	element[config.customLinkProperty] = true

	if (isHTML) {
		element.classList.add(config.customLinkCssClass)
	}

	// Insert Link children elements
	const fragment = document.createDocumentFragment()
	children.forEach((child) => {
		if (child instanceof HTMLElement) {
			fragment.appendChild(child)
		} else if (typeof child === 'string') {
			fragment.appendChild(document.createTextNode(child))
		}
	})
	element.appendChild(fragment)

	Object.entries(attrs).forEach(([key, value]) =>
		// @ts-ignore
		element.setAttribute(key === 'className' ? 'class' : key, value)
	)

	return isHTML ? element.outerHTML : element
}
