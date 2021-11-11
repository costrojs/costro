export interface Constructable<T> {
	new (...args: any): T;
}

export interface Component {
	getStore: Function;
}

export interface interfaceLocationInstances {
	[key: string]: any;
}

export interface Route {
	path: string;
	component: Constructable<Component>;
}

export interface RouteData {
	component: any;
}
