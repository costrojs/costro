import { Component } from '../../../src/index';
import Navigation from './nav';
import { createElement } from 'jsx-dom';

export default class Contact extends Component {
	render() {
		return (
			<div>
				<Navigation currentRoute={this.currentRoute()} />
				<h2>Contact</h2>
			</div>
		);
	}
}
