export interface Constructable<T> {
	new (...args: any): T;
}

export interface Component {
	beforeRender: Function;
	afterRender: Function;
	beforeDestroy: Function;
	afterDestroy: Function;
	render: Function;
	setStore: Function;
	getStore: Function;
}

export interface interfaceLocationInstances {
	[key: string]: any;
}

export interface Route {
	path: string;
	component: Constructable<Component> | Function | any; // Multi types with constructor and function fails
}

export interface RouteData {
	component: any;
	componentType: string | null;
}
