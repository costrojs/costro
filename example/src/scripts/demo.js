import { Tunnel } from '../../../src/index';
import Home from './home/assets/scripts/home.js';
import SignIn from './sign-in/assets/scripts/sign-in.js';
import SignUp from './sign-up/assets/scripts/sign-up.js';

const tunnel = new Tunnel({
	target: document.querySelector('#app'),
	routes: [
		{
			name: 'home',
			path: '/prisma-connect',
			component: Home
		},
		{
			name: 'signIn',
			path: '/connexion',
			component: SignIn
		},
		{
			name: 'signUp',
			path: '/inscription',
			component: SignUp
		}
	]
});
tunnel.navigate('home');
