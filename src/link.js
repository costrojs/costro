export default function Link({ route, path, children, tag = 'a' }) {
	const link = document.createElement(tag);

	if (children.length) {
		link.innerText = children[0];
	}

	if (tag === 'a') {
		if (route) {
			document.dispatchEvent(
				new window.CustomEvent('applyPathToElement', {
					detail: {
						route,
						element: link
					}
				})
			);
		} else if (path) {
			link.setAttribute('href', path);
		}
	}

	link.addEventListener('click', (e) => {
		e.preventDefault();
		document.dispatchEvent(
			new window.CustomEvent('routeChange', {
				detail: {
					route,
					path
				}
			})
		);
	});

	return link;
}
