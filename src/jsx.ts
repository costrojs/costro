import { ElementAttributes, createElementFunction, Constructable, Component } from './interface'

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'
const XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace'
const SVG_ATTRIBUTES_CAMEL_CASE = ['xmlLang']
const SVG_TAGS = [
	'animate',
	'circle',
	'clipPath',
	'defs',
	'desc',
	'ellipse',
	'feBlend',
	'feColorMatrix',
	'feComponentTransfer',
	'feComposite',
	'feConvolveMatrix',
	'feDiffuseLighting',
	'feDisplacementMap',
	'feDistantLight',
	'feFlood',
	'feFuncA',
	'feFuncB',
	'feFuncG',
	'feFuncR',
	'feGaussianBlur',
	'feImage',
	'feMerge',
	'feMergeNode',
	'feMorphology',
	'feOffset',
	'fePointLight',
	'feSpecularLighting',
	'feSpotLight',
	'feTile',
	'feTurbulence',
	'filter',
	'foreignObject',
	'g',
	'image',
	'line',
	'linearGradient',
	'marker',
	'mask',
	'metadata',
	'path',
	'pattern',
	'polygon',
	'polyline',
	'radialGradient',
	'rect',
	'stop',
	'svg',
	'switch',
	'symbol',
	'text',
	'textPath',
	'tspan',
	'use',
	'view'
] // TODO: Can we remove this array?

/**
 * Create attribute on element
 * @param {(HTMLElement|SVGElement)} element Element
 * @param {String} name Attribute name
 * @param {(String|Object|Boolean)} value Attribute value
 * @param {Boolean} isSvg Element is SVG
 */
function createAttributes(
	element: HTMLElement | SVGElement,
	name: string,
	value: string | object | boolean,
	isSvg = false
) {
	const valueIsString = typeof value === 'string'
	if (name === 'style') {
		if (typeof value === 'string') {
			element.setAttribute('style', value)
		} else if (value instanceof Object) {
			const styleProperty = Object.keys(value)
			for (let i = 0, length = styleProperty.length; i < length; i++) {
				// @ts-ignore
				element.style[styleProperty[i]] = value[styleProperty[i]]
			}
		}
	} else if (name === 'dataset' && value instanceof Object) {
		const datasetProperty = Object.keys(value)
		for (let i = 0, length = datasetProperty.length; i < length; i++) {
			// @ts-ignore
			element.dataset[datasetProperty[i]] = value[datasetProperty[i]]
		}
	} else if (name === 'innerHTML' && valueIsString) {
		element.innerHTML = value
	} else if (['class', 'className'].includes(name) && valueIsString) {
		const cssClass = value.split(' ')
		for (let i = 0, length = cssClass.length; i < length; i++) {
			element.classList.add(cssClass[i])
		}
	} else if (isSvg && SVG_ATTRIBUTES_CAMEL_CASE.includes(name) && valueIsString) {
		const attributesWithColon = name.replace(/[A-Z]/g, (match) => ':' + match.toLowerCase())
		element.setAttributeNS(XML_NAMESPACE, attributesWithColon, value)
	} else if (value === true) {
		element.setAttribute(name, '')
	} else if (value !== false && value !== null && valueIsString) {
		element.setAttribute(name, value)
	}
}

/**
 *
 * @param element
 * @param children
 * @returns
 */
function appendChildren(
	element: DocumentFragment | HTMLElement | SVGElement,
	children: Array<string | Node>
) {
	for (let i = 0, length = children.length; i < length; i++) {
		const child = children[i]
		if (typeof child === 'string') {
			element.appendChild(document.createTextNode(child))
		} else if (child instanceof Node) {
			element.appendChild(child)
		}
	}

	return element
}

/**
 * Create the fragment from <></>
 * @param {Object} options
 * @param {Array} options.children The children of the fragment
 * @returns {DocumentFragment} Document fragment with his children
 */
function Fragment({
	children = []
}: {
	children?: string[] | HTMLElement[] | SVGElement[]
} = {}): DocumentFragment {
	const fragment = document.createDocumentFragment()
	children.length && appendChildren(fragment, children)
	return fragment
}

/**
 * Create the element
 * @param {(String|Function)} tag Tag or function
 * @param {Object} attributes The attributes of the tag
 * @param {Array} children The children of the tag
 * @returns {(HTMLElement|null)} Element or null
 */
function createElement(
	tag: string | createElementFunction | Constructable<Component>,
	attributes: null | ElementAttributes,
	...children: string[] | HTMLElement[] | SVGElement[]
): DocumentFragment | HTMLElement | SVGElement | string | null {
	let element = null
	if (typeof tag === 'string') {
		const isSvg = SVG_TAGS.includes(tag)
		element = isSvg ? document.createElementNS(SVG_NAMESPACE, tag) : document.createElement(tag)

		if (attributes !== null) {
			const attributeName = Object.keys(attributes)
			for (let i = 0, length = attributeName.length; i < length; i++) {
				const name = attributeName[i]
				const value = attributes[name]
				if (name.startsWith('on') && typeof value === 'function') {
					// @ts-ignore
					element[name.toLowerCase()] = value
				} else {
					createAttributes(element, name, value, isSvg)
				}
			}
		}
		children.length && appendChildren(element, children)
	} else if (typeof tag === 'function') {
		const isComponentClass = !!(
			tag.prototype &&
			(tag.prototype.__isComponent || tag.prototype.isReactComponent)
		)
		if (isComponentClass) {
			element = new (tag as Constructable<Component>)(attributes || {}).render()
		} else {
			element = (tag as createElementFunction)({ ...(attributes || {}), children })
		}
	}

	return element
}

export { createElement, createElement as h, Fragment, Fragment as F }
