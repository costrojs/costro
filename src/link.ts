export interface Attributes {
	[key: string]: string;
}

export default function Link({
	route,
	tag = 'a',
	children,
	...attrs
}: {
	route: string;
	tag: string;
	children: Array<any>;
	attrs: Attributes;
}) {
	const element = document.createElement(tag);

	if (children.length) {
		element.innerText = children[0];
	}

	if (tag === 'a' && route) {
		document.dispatchEvent(
			new window.CustomEvent('updateLinkHref', {
				detail: {
					route,
					element
				}
			})
		);
	}

	Object.keys(attrs).forEach((key: string) =>
		// @ts-ignore
		element.setAttribute(key === 'className' ? 'class' : key, attrs[key])
	);

	element.addEventListener('click', (e) => {
		e.preventDefault();
		document.dispatchEvent(
			new window.CustomEvent('navigate', {
				detail: {
					route
				}
			})
		);
	});

	return element;
}
