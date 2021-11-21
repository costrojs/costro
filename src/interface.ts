export type Fn = () => void

export interface Constructable<T> {
	new (...args: any): T
}

export interface Component {
	afterDestroy: Fn
	afterRender: Fn
	beforeDestroy: Fn
	beforeRender: Fn
	getStore: (key: string) => object | undefined | Map<string, object>
	render: Fn
	setStore: (data: any) => void
}

export interface interfaceLocationInstances {
	[key: string]: any
}

export interface Route {
	component: Constructable<Component> | Fn | any // Multi types with constructor and function fails
	path: string
	props: any
}

export interface RouteData {
	component: any
	interfaceType: string | null
	isComponentClass: boolean
	isComponentClassReady: boolean
	isFunction: boolean
	path: string
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

export interface ComponentInjection {
	__getExternalStore: privateGetExternalStore
	getPath: () => null | string
	navigate: (path: string) => void
}

export interface FragmentTag {
	children: HTMLElement[] | SVGElement[]
}

export interface ElementAttributes {
	[key: string]: string | Fn
}

export type createElementFunction = (
	attributes: null | ElementAttributes
) => HTMLElement | SVGElement
