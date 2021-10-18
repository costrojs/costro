import { createElement } from 'jsx-dom'

/**
 * Template step
 * @param {Object} props Data from dependent steps
 * @returns {HTMLElement} Template step
 */
export default function TemplateSignUp(props) {
	return (
		<div className="userLoginTunnel-signUp">
			<a href="#/prisma-connect">Go to home</a>
			<br />
			Bienvenue, inscrivez-vous en un clic
			<br />
			<input type="password" id="pmc-password" placeholder="password" />
		</div>
	)
}
