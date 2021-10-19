export default function Link({ route, path, children, tag = 'a', ...attrs }) {
	const element = document.createElement(tag);

	if (children.length) {
		element.innerText = children[0];
	}

	if (tag === 'a') {
		if (route) {
			document.dispatchEvent(
				new window.CustomEvent('updateLinkHref', {
					detail: {
						route,
						element
					}
				})
			);
		} else if (path) {
			element.setAttribute('href', path);
		}
	}

	Object.keys(attrs).forEach((key) =>
		element.setAttribute(key === 'className' ? 'class' : key, attrs[key])
	);

	element.addEventListener('click', (e) => {
		e.preventDefault();
		document.dispatchEvent(
			new window.CustomEvent('navigate', {
				detail: {
					route,
					path
				}
			})
		);
	});

	return element;
}
