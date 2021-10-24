import { Link, Component, History } from '../../../dist/tunnel';
import { createElement } from 'jsx-dom';

export default class Nav extends Component {
	render() {
		return (
			<ul>
				{['/', '/contact', '/about'].map((path) => (
					<li>
						{path === this.props.path ? (
							<span>{path}</span>
						) : (
							<button onClick={() => History(path)}>{path}</button>
							// <Link path={route}>
							// 	<span>{route}</span>
							// </Link>
						)}
					</li>
				))}
			</ul>
		);
	}
}
