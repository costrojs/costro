import { Component } from '../../../src/index';
import Navigation from './nav';
import { createElement } from 'jsx-dom';

export default class Contact extends Component {
	render() {
		const date = this.getExternalStore('home').get('date');

		return (
			<div>
				<Navigation route={this.getRoute()} />
				<h2>Contact</h2>
				{date && <p>{date}</p>}
			</div>
		);
	}
}
