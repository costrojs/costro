const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

function createAttributes(element, name, value) {
	if (name === 'style') {
		if (typeof value === 'string') {
			element.style = value
		} else if (value instanceof Object) {
			const styleProperty = Object.keys(value)
			for (let i = 0, length = styleProperty.length; i < length; i++) {
				element.style[styleProperty[i]] = value[styleProperty[i]]
			}
		}
	} else if (name === 'dataset') {
		const datasetProperty = Object.keys(value)
		for (let i = 0, length = datasetProperty.length; i < length; i++) {
			element.dataset[datasetProperty[i]] = value[datasetProperty[i]]
		}
	} else if (name === 'innerHTML') {
		element.innerHTML = value
	} else if (['class', 'className'].includes(name)) {
		const cssClass = value.split(' ')
		for (let i = 0, length = cssClass.length; i < length; i++) {
			element.classList.add(cssClass[i])
		}
	} else if (value !== false && value !== null) {
		if (element instanceof SVGElement) {
			element.setAttributeNS(SVG_NAMESPACE, name, value)
		} else {
			element.setAttribute(name, value)
		}
	}
}

function createEvents(element, name, value) {
	element[name.toLowerCase()] = value
}

export default function createElement(tag, attributes = {}, ...children) {
	console.log({ tag, attributes, children })
	let element
	if (tag instanceof Function) {
		// Function component
		element = tag(attributes || {})
	} else if (tag === 'fragment') {
		// TODO
		// Fragment component
		element = document.createDocumentFragment()
	} else {
		if (tag instanceof SVGElement) {
			// SVG tags
			element = document.createElementNS(SVG_NAMESPACE, tag)
		} else {
			// HTML tags
			element = document.createElement(tag)
		}

		// Build element attributes and events listeners
		if (attributes !== null) {
			const attributeName = Object.keys(attributes)
			for (let i = 0, length = attributeName.length; i < length; i++) {
				const name = attributeName[i]
				const value = attributes[name]
				createAttributes(element, name, value)
				if (name.startsWith('on') && value instanceof Function) {
					element[name.toLowerCase()] = value
				}
			}
		}
	}

	if (children.length) {
		// TODO: empty node ?
		for (let i = 0, length = children.length; i < length; i++) {
			const child = children[i]
			if (typeof child === 'string') {
				element.appendChild(document.createTextNode(child))
			} else if (child instanceof HTMLElement) {
				element.appendChild(child)
			}
		}
	}

	if (tag instanceof Function) {
		if (isComponentClass(tag)) {
			element = initComponentClass(tag, attributes, children)
		} else {
			element = tag({ ...attributes, children })
		}
	}

	return element
}

function isComponentClass(tag) {
	const { prototype } = tag
	return !!(prototype && (prototype.isReactComponent || prototype.__isComponent))
}

function initComponentClass(Tag, attributes, children) {
	attributes = { ...attributes, children }
	const instance = new Tag(attributes)
	return instance.render()
}
