/**
 * Navigate to a path
 * Dispatch an event listen by the App
 * Used by Component.navigate or JSX onClick function
 * @param {String} to Location path
 */
export default function navigate(to: string) {
	document.dispatchEvent(
		new window.CustomEvent('navigate', {
			detail: {
				to
			}
		})
	)
}
