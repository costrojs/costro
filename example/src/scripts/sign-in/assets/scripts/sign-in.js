import { Component } from '../../../../../../src/index';
import TemplateSignIn from './templates/sign-in.js';
import { createElement } from 'jsx-dom';

// The step needs to extend the UserLoginStep
export default class SignIn extends Component {
	// Selector string of the step element
	element = '.userLoginTunnel-signIn';

	// Set the routes which the step depends
	// dependsOn = ['home'];

	/**
	 * Required function
	 * Automatically called by UserLoginTunnel.createStep
	 * @returns {HTMLElement}
	 */
	render() {
		const email = this.getStore('home').get('email');
		return <TemplateSignIn email={email} />;
	}
}
