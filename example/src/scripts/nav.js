import { Link } from '../../../src/index';
import { createElement } from 'jsx-dom';

export default function Nav({ currentRoute }) {
	return (
		<div>
			<ul>
				{['home', 'contact', 'about'].map((route) => (
					<li>
						{route === currentRoute ? (
							<span>{route}</span>
						) : (
							<Link route={route}>{route}</Link>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
