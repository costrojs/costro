import { App } from '../../dist/costro'
import routesFixtures from './routes-fixture'

new App({
	mode: 'history',
	routes: routesFixtures,
	target: document.querySelector('#app')
})
