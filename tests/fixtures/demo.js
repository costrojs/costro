import { App } from '../../dist/costro'
import routesFixtures from './routes-fixture'

// eslint-disable-next-line no-new
new App({
	mode: 'history',
	routes: routesFixtures,
	target: document.querySelector('#app')
})
