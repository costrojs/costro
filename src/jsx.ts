import { FragmentTag, ElementAttributes, createElementFunction } from './interface'

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

function createAttributes(
	element: HTMLElement | SVGElement,
	name: string,
	value: string | object | boolean,
	isSvg = false
) {
	const valusIsString = typeof value === 'string'
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
	} else if (name === 'innerHTML' && valusIsString) {
		element.innerHTML = value
	} else if (['class', 'className'].includes(name) && valusIsString) {
		const cssClass = value.split(' ')
		for (let i = 0, length = cssClass.length; i < length; i++) {
			element.classList.add(cssClass[i])
		}
	} else if (isSvg && SVG_ATTRIBUTES_CAMEL_CASE.includes(name) && valusIsString) {
		const attributesWithColon = name.replaceAll(/[A-Z]/g, (match) => ':' + match.toLowerCase())
		element.setAttributeNS(XML_NAMESPACE, attributesWithColon, value)
	} else if (value === true) {
		element.setAttribute(name, '')
	} else if (value !== false && value !== null && valusIsString) {
		element.setAttribute(name, value)
	}
}

function Fragment(tag: FragmentTag): DocumentFragment {
	const fragment = document.createDocumentFragment()
	tag.children && tag.children.length && appendChildren(fragment, tag.children)
	return fragment
}

function createElement(
	tag: string | createElementFunction,
	attributes: null | ElementAttributes,
	...children: string[] | HTMLElement[] | SVGElement[]
): HTMLElement | SVGElement | null {
	let element = null
	if (typeof tag === 'string') {
		const isSvg = SVG_TAGS.includes(tag)
		element = isSvg ? document.createElementNS(SVG_NAMESPACE, tag) : document.createElement(tag)

		if (attributes !== null) {
			const attributeName = Object.keys(attributes)
			for (let i = 0, length = attributeName.length; i < length; i++) {
				const name = attributeName[i]
				const value = attributes[name]
				if (name.startsWith('on') && value instanceof Function) {
					// @ts-ignore
					element[name.toLowerCase()] = value
				} else {
					createAttributes(element, name, value, isSvg)
				}
			}
		}
	} else if (tag instanceof Function) {
		element = tag(attributes || {})
	}

	element && children.length && appendChildren(element, children)

	return element
}

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

export { createElement, createElement as h, Fragment, Fragment as F }
