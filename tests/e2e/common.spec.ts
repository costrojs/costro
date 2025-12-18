import { expect, test } from '@playwright/test'

test.describe(`Test`, () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(`http://localhost:3000`)
	})

	test('should check the navigation element', async ({ page }) => {
		const navigation = await page.locator('.navigation')
		await expect(page.locator('.navigation')).toBeVisible()

		await expect(navigation.locator('.navigation-listItem')).toHaveCount(6)

		const routes = [
			'/',
			'/document-fragment',
			'/custom-component-1',
			'/custom-component-2',
			'/string',
			'/svg'
		]

		for (const [index, value] of routes.entries()) {
			await expect(
				navigation.locator(`.navigation-listItem:nth-child(${index + 1}) a`)
			).toHaveAttribute('href', value)
		}
	})

	test('should check the content of /', async ({ page }) => {
		await page.goto(`http://localhost:3000/`)
		const content = page.locator('.content')
		await expect(content).toHaveText('HTMLElement')
	})

	test('should check the content of /document-fragment', async ({ page }) => {
		await page.goto(`http://localhost:3000/document-fragment`)
		const content = await page.locator('.content')
		expect(content).toHaveText('DocumentFragment')
	})

	test('should check the content of /custom-component-1', async ({ page }) => {
		await page.goto(`http://localhost:3000/custom-component-1`)
		const content = await page.locator('.content')
		expect(content).toHaveText('Custom Component 1home')
	})

	test('should check the content of /custom-component-2', async ({ page }) => {
		await page.goto(`http://localhost:3000/custom-component-1`)
		await page.getByRole('link', { name: 'CustomComponent 2' }).click()

		const content = page.locator('.content')
		await expect(content).toHaveText('Custom Component 2home')
	})

	test('should check the content of /string', async ({ page }) => {
		await page.goto(`http://localhost:3000/string`)
		const content = await page.locator('.content')

		await expect(content.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
		await expect(content.locator('h2')).toHaveText('String')
	})

	test('should check the content of /svg', async ({ page }) => {
		await page.goto(`http://localhost:3000/svg`)
		const content = await page.locator('.content')

		await expect(content.locator('svg')).toBeVisible()
		await expect(page.locator('.content svg title')).toHaveText('Demo')
	})

	test('should navigate correctly when clicking links', async ({ page }) => {
		const navigation = page.locator('.navigation')
		const expectedLinks = [
			{ path: '/', text: 'HTMLElement' },
			{ path: '/document-fragment', text: 'DocumentFragment' },
			{ path: '/custom-component-1', text: 'Custom Component 1' },
			{ path: '/custom-component-2', text: 'Custom Component 2' },
			{ path: '/string', text: 'String' },
			{ path: '/svg', text: '' }
		]

		for (const { path, text } of expectedLinks) {
			const link = navigation.locator(`a[href="${path}"]`)

			// Skip link if not present (some pages intentionally have no navigation)
			if ((await link.count()) === 0) continue

			await link.click()
			await expect(page).toHaveURL(`http://localhost:3000${path}`)

			const content = page.locator(`.content[data-route="${path}"]`)
			await expect(content).toBeVisible()

			if (text) {
				await expect(content.locator('h2')).toHaveText(text)
			} else {
				// SVG page
				await expect(content.locator('svg')).toBeVisible()
				await expect(content.locator('svg title')).toHaveText('Demo')
			}
		}
	})
})
