import { Link, Component } from '../../../dist/tunnel'
import { createElement } from 'jsx-dom'

export default class Nav extends Component {
	render() {
		return (
			<ul>
				<li>
					<Link path="/">Home</Link>
					{/* <button onClick={() => History('/')}>Home</button> */}
				</li>
				<li>
					<Link path="/about">About</Link>
				</li>
				<li>
					<Link path="/contact">Contact</Link>
				</li>
			</ul>
		)
	}
}
