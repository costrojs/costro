export default function History(path) {
	document.dispatchEvent(
		new window.CustomEvent('navigate', {
			detail: {
				path
			}
		})
	);
}
