/**
 * Navigate to a path
 * Dispatch an event listen by the App
 * Used by Component.navigate or JSX onClick function
 * @param to Location path
 */
export default function navigate(to: string) {
	document.dispatchEvent(
		new window.CustomEvent('costro::navigate', {
			detail: {
				to
			}
		})
	)
}
