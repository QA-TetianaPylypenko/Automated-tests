import { type Locator, type Page } from '@playwright/test'

export class MembersList {
	readonly page: Page
	readonly rewiewButton: Locator
	readonly newTab: Locator
	readonly onReviewTab: Locator
	readonly approvedTab: Locator
	readonly rejectedTab: Locator
	readonly titlePage: Locator

	constructor(page: Page) {
		this.page = page
		this.rewiewButton = page.locator('a[href*="vacancies/replies"][href*="vacancy_id=1"]')
		this.newTab = page.getByRole('tab', { name: 'Нові (0)' })
		this.onReviewTab = page.getByRole('tab', { name: 'На розгляді (0)' })
		this.approvedTab = page.getByRole('tab', { name: 'Затверджено (0)' })
		this.rejectedTab = page.getByRole('tab', { name: 'Відхилено (0)' })
		this.titlePage = page.getByRole('heading', { name: 'Відсутні записи' })
	}

	async rewiewButtonChoose() {
		await this.rewiewButton.isVisible()
		await this.rewiewButton.click()
	}

	async checkMembersList() {
		await this.titlePage.isVisible()
		await this.newTab.isVisible()
        await this.onReviewTab.isVisible()
		await this.approvedTab.isVisible()
		await this.rejectedTab.isVisible()
	}
}
