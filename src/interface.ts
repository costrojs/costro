export type Fn = () => void

export interface Constructable<T> {
	new (...args: any): T
}

export interface RouteComponent {
	params: {
		[key: string]: string
	}
	path: string
}

export interface Component {
	afterDestroy: Fn
	afterRender: Fn
	beforeDestroy: Fn
	beforeRender: Fn
	getStore: (key: string) => object | undefined | Map<string, object>
	render: Fn
	route: RouteComponent
	setStore: (data: any) => void
	prototype: {
		__isComponent: boolean
	}
}

export interface Route {
	component: Constructable<Component> | Fn | any // Multi types with constructor and function fails
	path: string
	props: any
}

export interface RouteData {
	component: any
	dynamicSegments: string[]
	interfaceType: string | null
	isComponentClass: boolean
	isComponentClassReady: boolean
	path: string
	pathRegExp: string
	props: any
}

export interface Attributes {
	[key: string]: string
}

export type onRouteChangeFunction = ({
	currentPath,
	previousPath
}: {
	currentPath: string
	previousPath: null | string
}) => void

export type privateGetExternalStore = (key: string, path: string) => object | undefined | null

export interface HelperFunction {
	__getExternalStore: privateGetExternalStore
}

export interface ElementAttributes {
	[key: string]: string | Fn
}

export type createElementFunction = (
	attributes: null | ElementAttributes
) => HTMLElement | SVGElement
