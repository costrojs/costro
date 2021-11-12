import { Link, Component } from '../../../dist/tunnel'
import { createElement } from 'jsx-dom'

export default class Nav extends Component {
	render() {
		return (
			<ul>
				<li>
					<Link to="/">Home</Link>
					{/* <button onClick={() => History('/')}>Home</button> */}
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/contact">Contact</Link>
				</li>
			</ul>
		)
	}
}
