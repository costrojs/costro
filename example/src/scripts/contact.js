import { Component } from '../../../dist/tunnel';
import Navigation from './nav';
import { createElement } from 'jsx-dom';

export default class Contact extends Component {
	render() {
		const date = this.getExternalStore('home').get('date');

		return (
			<div>
				<Navigation path={this.getPath()} />
				<h2>Contact</h2>
				{date && <p>{date}</p>}
			</div>
		);
	}
}
