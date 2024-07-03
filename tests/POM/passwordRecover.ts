import { type Locator, type Page } from '@playwright/test'

export class Recover {
	readonly page: Page
	readonly singInButtonHeader: Locator
	readonly passwordRecoverLink: Locator
	readonly recoverPasswordEmailField: Locator
	readonly sendInstructionButton: Locator
	readonly errorMessageRecover: Locator
	readonly avatarVisible: Locator
	readonly message: Locator

	constructor(page: Page) {
		this.page = page
		this.singInButtonHeader = page.getByRole('link', { name: 'Увійти' })
		this.passwordRecoverLink = page.getByRole('link', { name: 'Відновити' })
		this.recoverPasswordEmailField = page.getByPlaceholder('email@google.com')
		this.sendInstructionButton = page.getByRole('button', { name: 'Надіслати інструкцію' })
		this.errorMessageRecover = page.getByText('Лист не надіслано')
		this.avatarVisible = page.locator(
			'button[aria-haspopup="menu"][class*="flex items-center gap-x-2"]'
		)
		this.message = page.getByRole('heading', { name: 'Інструкцію надіслано' })
	}

	async goto() {
		await this.page.goto('/')
	}

	async sinInButtonHeader() {
		await this.singInButtonHeader.isEnabled()
		await this.singInButtonHeader.click()
	}

	async passwordRecoveriLink() {
		await this.passwordRecoverLink.isEnabled()
	}

	async clickPasswordRecoveriLink() {
		await this.passwordRecoverLink.click()
	}

	async checkSendButtonDis() {
		await this.sendInstructionButton.isDisabled()
	}

	async emailFieldRecover() {
		await this.recoverPasswordEmailField.isEnabled()
		await this.recoverPasswordEmailField.click()
	}

	async emailFieldRecoverValid() {
		await this.recoverPasswordEmailField.fill('user1@gmail.com')
	}

	async emailFieldRecoverInvalid() {
		await this.recoverPasswordEmailField.fill('test@example.com')
	}

	async sendButtonEnb() {
		await this.sendInstructionButton.isEnabled()
		await this.sendInstructionButton.click()
	}

	async checkErrorMessageRecover() {
		await this.errorMessageRecover.isVisible()
	}

	async checkAvatar() {
		this.avatarVisible.isVisible()
	}

	async checkMessage() {
		this.message.isVisible()
	}
}

