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
	prototype: {
		__isComponent: boolean
		isReactComponent: object
	}
	render: () => DocumentFragment | HTMLElement | SVGElement | string
	route: RouteComponent
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

export type ElementAttributes = Record<string, string | Fn>

export type createElementFunction = ({
	children,
	...attributes
}: {
	attributes?: ElementAttributes
	children: string[] | HTMLElement[] | SVGElement[]
}) => DocumentFragment | HTMLElement | SVGElement | string
