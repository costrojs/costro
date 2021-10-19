import { Component } from '../../../src/index';
import Navigation from './nav';
import { createElement } from 'jsx-dom';

export default class Home extends Component {
	constructor() {
		super();

		this.onDateChanged = this.onDateChanged.bind(this);
	}

	afterRender() {
		this.html = document.querySelector('.home');
		const time = this.html.querySelector('.time');
		this.timer = setInterval(() => {
			time.innerHTML = new Date().toLocaleTimeString();
		}, 1000);
	}

	render() {
		return (
			<div className="home">
				<Navigation route={this.getRoute()} />
				<h2>Home</h2>
				<input type="date" placeholder="Get the date" onChange={this.onDateChanged} />
				<span className="time">{new Date().toLocaleTimeString()}</span>
			</div>
		);
	}

	onDateChanged(e) {
		this.setStore({
			date: e.target.value
		});
	}
}
