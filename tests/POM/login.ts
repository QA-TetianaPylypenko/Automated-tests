import { expect, type Locator, type Page } from '@playwright/test'

export class LogInPage {
	readonly page: Page
	readonly logInButton: Locator
	readonly emailInput: Locator
	readonly passwordInput: Locator
	readonly submitButton: Locator
	readonly avatarVisible: Locator

	constructor(page: Page) {
		this.page = page
		this.logInButton = page.getByRole('link', { name: 'Увійти' })
		this.emailInput = page.locator('input[type="email"][placeholder="email@google.com"]')
		this.passwordInput = page.locator('input[type="password"][placeholder="**********"]')
		this.submitButton = page.locator('button.text-primary-foreground.bg-violet-800')
		this.avatarVisible = page.locator('button[aria-haspopup="menu"]')
	}

	async goto() {
		await this.page.goto('/')
	}

	async gotoLogInButton() {
		await this.logInButton.click()
	}

	async fillEmail(type: string) {
		// await this.emailInput.click()
		const responsePromise = this.page.waitForResponse('**')
		await this.emailInput.fill(type)
		await responsePromise
	}

	async fillPassword(type: string) {
		// await this.passwordInput.click()
		await this.passwordInput.fill(type)
	}

	async gotosubmitButton() {
		//await this.submitButton.isEnabled()
		const responsePromise = this.page.waitForResponse('**')
		await this.submitButton.click()
		await responsePromise
	}

	async isSubmitButtonEnabled() {
		return this.submitButton.isEnabled() // Повертаємо Promise<boolean>
	}

	async gotoAvatarVisible() {
		await this.avatarVisible.isVisible()
		//await this.avatarVisible.isEnabled()
	}

	async chekLoggedIn() {
		const responsePromise = this.page.waitForResponse('**')
		await expect(this.page).toHaveURL(/.*profile/, { timeout: 15000 })
		await responsePromise
	}

	async login(email: string, password: string) {
		await this.goto()
		await this.gotoLogInButton()
		await this.fillEmail(email)
		await this.fillPassword(password)
		await this.gotosubmitButton()
		await this.gotoAvatarVisible() // Перевірка успішного логіну
	}
}

