export default function navigate(to) {
	document.dispatchEvent(
		new window.CustomEvent('navigate', {
			detail: {
				to
			}
		})
	)
}
