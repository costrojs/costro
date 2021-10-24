export interface Attributes {
	[key: string]: string;
}

export default function Link({
	path,
	children,
	...attrs
}: {
	path: string;
	tag: string;
	children: Array<any>;
	attrs: Attributes;
}) {
	const element = document.createElement('a');
	element.setAttribute('href', path);

	// Insert Link children elements
	const fragment = document.createDocumentFragment();
	children.forEach((child) => fragment.appendChild(child));
	element.appendChild(fragment);

	Object.keys(attrs).forEach((key: string) =>
		// @ts-ignore
		element.setAttribute(key === 'className' ? 'class' : key, attrs[key])
	);

	function onClickOnLink(e: Event) {
		e.preventDefault();
		document.dispatchEvent(
			new window.CustomEvent('navigate', {
				detail: {
					path
				}
			})
		);
	}
	element.addEventListener('click', onClickOnLink);

	return element;
}
