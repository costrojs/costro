export default function navigate(to: string) {
	document.dispatchEvent(
		new window.CustomEvent('navigate', {
			detail: {
				to
			}
		})
	)
}
