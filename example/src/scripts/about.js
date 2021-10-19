import { Component } from '../../../src/index';
import Navigation from './nav';
import { createElement } from 'jsx-dom';

export default class About extends Component {
	render() {
		const date = this.getExternalState('home').get('date');
		return (
			<div>
				<Navigation currentRoute={this.currentRoute()} />
				<h2>About</h2>
				{date && <p>{date}</p>}
			</div>
		);
	}
}
