export type Fn = () => void

export type Constructable<T> = {
	new (...args: any): T
}

export type RouteComponent = {
	params: Record<string, string>
	path: string
}

export type Component = {
	afterDestroy: Fn
	afterRender: Fn
	beforeDestroy: Fn
	beforeRender: Fn
	getStore: (key: string) => object | undefined | Map<string, object>
	prototype: {
		__isComponent: boolean
		isReactComponent: object
	}
	render: () => DocumentFragment | HTMLElement | SVGElement | string
	route: RouteComponent
	setStore: (data: any) => void
}

export type Route = {
	component: Constructable<Component> | Fn | any // Multi types with constructor and function fails
	path: string
	props?: any
}

export type RouteData = {
	component: any
	dynamicSegments: string[]
	interfaceType: string | null
	isComponentClass: boolean
	isComponentClassReady: boolean
	path: string
	pathRegExp: string
	props: any
}

export type Attributes = Record<string, string>

export type onRouteChangeFunction = (currentPath: string) => void

export type privateGetExternalStore = (key: string, path: string) => object | undefined | null

export type HelperFunction = {
	__getExternalStore: privateGetExternalStore
}

export type ElementAttributes = Record<string, string | Fn>

export type createElementFunction = ({
	children,
	...attributes
}: {
	attributes?: ElementAttributes
	children: string[] | HTMLElement[] | SVGElement[]
}) => DocumentFragment | HTMLElement | SVGElement | string
