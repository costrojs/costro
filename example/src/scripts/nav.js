import { Link } from '../../../src/index';
import { createElement } from 'jsx-dom';

export default function Nav(props) {
	return (
		<ul>
			{['home', 'contact', 'about'].map((route) => (
				<li>
					{route === props.route ? (
						<span>{route}</span>
					) : (
						<Link route={route}>{route}</Link>
					)}
				</li>
			))}
		</ul>
	);
}
