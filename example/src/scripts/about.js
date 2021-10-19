import { Component } from '../../../src/index';
import Navigation from './nav';
import { createElement } from 'jsx-dom';

export default class About extends Component {
	render() {
		return (
			<div>
				<Navigation route={this.getRoute()} />
				<h2>About</h2>
			</div>
		);
	}
}
