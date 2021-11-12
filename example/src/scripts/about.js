import { Component } from '../../../dist/tunnel'
import Navigation from './nav'
import { createElement } from 'jsx-dom'

export default class About extends Component {
	render() {
		return (
			<div>
				<Navigation />
				<h2>About</h2>
			</div>
		)
	}
}
