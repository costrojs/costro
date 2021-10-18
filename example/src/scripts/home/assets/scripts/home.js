import { Component } from '../../../../../../src/index';
import TemplateHome from './templates/home.js';
import { createElement } from 'jsx-dom';
import validateTarget from 'validate-target';

// The step needs to extend the UserLoginStep
export default class Home extends Component {
	// Selector string of the step element
	element = '.userLoginTunnel-home';

	/**
	 * Required function
	 * Automatically called by UserLoginTunnel.createStep
	 * @param {Object} props Data exposed by the UserLoginTunnel
	 * @returns {HTMLElement}
	 */
	render(props) {
		return <TemplateHome />;
	}

	/**
	 * Required function
	 * Automatically called by UserLoginTunnel.hashChanged
	 * @returns {Object} Step data, useful for next steps if necessary
	 */
	// setState() {
	// 	return () => ({
	// 		email: document.querySelector(this.element).querySelector('#pmc-email').value
	// 	});
	// }

	/**
	 * Optional function
	 * Automatically called by UserLoginTunnel.createStep
	 */
	afterRender() {
		this.addEvents();
	}

	/**
	 * Custom step function
	 * Used to simlulate PMC in-site client interaction
	 * and navigate to 2 differents steps
	 */
	addEvents() {
		document.querySelector(this.element).addEventListener('click', (e) => {
			const validateSubmit = validateTarget({
				target: e.target,
				selectorString: '.pmc-submit',
				nodeName: ['button']
			});
			if (validateSubmit) {
				this.setState({
					email: document.querySelector(this.element).querySelector('#pmc-email').value
				});

				const mockPmcResponse = 'user-ok';
				if (mockPmcResponse === 'user-unknown') {
					this.navigate('signUp');
				} else if (mockPmcResponse === 'user-ok') {
					this.navigate('signIn');
				}
			}
		});
	}
}
