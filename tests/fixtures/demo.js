import { App } from '../../dist/tunnel'
import routesFixtures from './routes-fixture'

// eslint-disable-next-line no-new
new App({
	mode: 'history',
	routes: routesFixtures,
	target: document.querySelector('#app')
})
