import { Component } from '../../../src/index';
import Navigation from './nav';
import { createElement } from 'jsx-dom';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.onDateChanged = this.onDateChanged.bind(this);
	}

	render() {
		return (
			<div>
				<Navigation currentRoute={this.currentRoute()} />
				<h2>Home</h2>
				<input type="date" placeholder="Get the date" onChange={this.onDateChanged} />
			</div>
		);
	}

	onDateChanged(e) {
		this.setState({
			date: e.target.value
		});
	}
}
