import { Tunnel } from '../../../dist/tunnel';
import Home from './home';
import About from './about';
import Contact from './contact';

// eslint-disable-next-line no-unused-vars
const app = new Tunnel({
	target: document.querySelector('#app'),
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/about',
			component: About
		},
		{
			path: '/contact',
			component: Contact
		}
	]
});
