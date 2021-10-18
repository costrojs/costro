import { createElement } from 'jsx-dom'

/**
 * Template step
 * @param {Object} props Data from dependent steps
 * @returns {HTMLElement} Template step
 */
export default function templateSignIn({ email }) {
	return (
		<div className="userLoginTunnel-signIn">
			Ravis de vous revoir, connectez-vous avec votre email
			<br />
			<input type="text" id="pmc-email" placeholder="email" value={email} />
			<br />
			<input type="password" id="pmc-password" placeholder="password" />
			<br />
			<button className="pmc-submit">Me connecter avec mon mot de passe</button>
		</div>
	)
}
