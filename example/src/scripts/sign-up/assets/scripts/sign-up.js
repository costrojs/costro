import { Component } from '../../../../../../src/index';
import TemplateSignUp from './templates/sign-up.js';
import { createElement } from 'jsx-dom';

// The step needs to extend the UserLoginStep
export default class SignUp extends Component {
	// Selector string of the step element
	element = '.userLoginTunnel-signUp';

	/**
	 * Required function
	 * Automatically called by UserLoginTunnel.createStep
	 * @param {Object} props Data exposed by the UserLoginTunnel
	 * @returns {HTMLElement}
	 */
	render() {
		return <TemplateSignUp />;
	}
}
