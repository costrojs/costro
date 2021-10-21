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
			name: 'home',
			path: '/',
			component: Home
		},
		{
			name: 'about',
			path: '/about',
			component: About
		},
		{
			name: 'contact',
			path: '/contact',
			component: Contact
		}
	]
});
