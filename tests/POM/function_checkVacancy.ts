import { Page } from '@playwright/test'

interface Vacancy {
	title: string
	type: string
	schedule: string
	format: string
}

export async function checkVacancy(page: Page, vacancy: Vacancy): Promise<void> {
	await page.locator(vacancy.title).isVisible
	await page.locator(vacancy.type).isVisible
	await page.locator(vacancy.schedule).isVisible
	await page.locator(vacancy.format).isVisible
}

