import { Recover } from '../POM/passwordRecover'

import test, { expect } from '@playwright/test'

test('Recover password with valid data', async ({ page }) => {
	const recover = new Recover(page)

	await recover.goto()
	await recover.sinInButtonHeader()
	await recover.passwordRecoveriLink()
	await recover.clickPasswordRecoveriLink()
	await expect(page).toHaveURL(/reset/)
	await recover.checkSendButtonDis()
	await recover.emailFieldRecover()
	await recover.emailFieldRecoverValid()
	await recover.sendButtonEnb()
	await recover.checkMessage()
})

test('Recover password with invalid data', async ({ page }) => {
	const recover = new Recover(page)

	await recover.goto()
	await recover.sinInButtonHeader()
	await recover.passwordRecoveriLink()
	await recover.clickPasswordRecoveriLink()
	await expect(page).toHaveURL(/reset/)
	await recover.checkSendButtonDis()
	await recover.emailFieldRecover()
	await recover.emailFieldRecoverInvalid()
	await recover.sendButtonEnb()
	await recover.checkErrorMessageRecover()
})

