export interface Constructable<T> {
	new (...args: any): T
}

export interface Component {
	beforeRender: () => void
	afterRender: () => void
	beforeDestroy: () => void
	afterDestroy: () => void
	render: () => void
	setStore: (data: any) => void
	getStore: (key: string) => object | undefined | Map<string, object>
}

export interface interfaceLocationInstances {
	[key: string]: any
}

export interface Route {
	path: string
	component: Constructable<Component> | (() => void) | any // Multi types with constructor and function fails
	props: any
}

export interface RouteData {
	props: any
	instance: any
	path: string
	isFunction: boolean
	component: any | null
	interfaceType: string | null
}

export interface Attributes {
	[key: string]: string
}

export interface ComponentInjection {
	getExternalStore: (path: string) => any | null
	getPath: () => null | string
	navigate: (path: string) => void
}

export type onRouteChangeFunction = ({
	currentPath,
	previousPath
}: {
	currentPath: string
	previousPath: null | string
}) => void
