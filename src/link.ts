export interface Attributes {
	[key: string]: string
}

export default function Link({
	to,
	children,
	...attrs
}: {
	to: string
	tag: string
	children: Array<any>
	attrs: Attributes
}) {
	const element = document.createElement('a')
	element.setAttribute('href', to)

	// @ts-ignore
	element.__customLink = true

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

	Object.keys(attrs).forEach((key: string) =>
		// @ts-ignore
		element.setAttribute(key === 'className' ? 'class' : key, attrs[key])
	)

	return element
}
