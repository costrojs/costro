import { createElement } from 'jsx-dom';
import { Link } from '../../../../../../../dist/tunnel';
/**
 * Template step
 * @param {Object} props Data from dependent steps
 * @returns {HTMLElement} Template step
 */
export default function templateHome(props) {
	return (
		<div className="userLoginTunnel-home">
			HOME
			<br />
			<br />
			<input type="text" id="pmc-email" placeholder="monemail@email.com" />
			<button className="pmc-submit">Continuer</button>
			<Link path="/connexion" tag="button">
				Go to
			</Link>
		</div>
	);
}
