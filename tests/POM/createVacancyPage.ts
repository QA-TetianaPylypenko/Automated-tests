import { type Locator, type Page } from '@playwright/test'

export class CreateVacancy {
	readonly page: Page
	readonly avatar: Locator
	readonly projectsButton: Locator
	readonly projectCard: Locator
	readonly editButton: Locator
	readonly vacancyLink: Locator
	readonly createVacancyButton: Locator
	readonly title: Locator
	readonly description: Locator
	readonly descriptionField: Locator
	readonly category: Locator
	readonly categoryJavaScript: Locator
	readonly categoryAndroid: Locator
	readonly categoryQA: Locator
	readonly formatFull: Locator
	readonly formatPart: Locator
	readonly onsite: Locator
	readonly input: Locator
	readonly slider: Locator
	readonly remote: Locator
	readonly hybrid: Locator
	readonly location: Locator
	readonly locationKharkiv: Locator
	readonly searchlocation: Locator
	readonly locationLviv: Locator
	readonly saveButton: Locator
	readonly successMessage: Locator
	readonly burgerMenuMobile: Locator
	readonly vacancyLinkMobile: Locator
	//readonly menuPrewiewVacancyDekstop: Locator
	//readonly menuPrewiewVacancyMobile: Locator

	constructor(page: Page) {
		this.page = page
		this.avatar = page.locator('button[aria-haspopup="menu"][class*="flex items-center gap-x-2"]')
		this.projectsButton = page.getByRole('menuitem', { name: 'Мої проєкти' })
		this.projectCard = page.getByRole('link', { name: 'Project1 by User1 project' })
		this.editButton = page.getByRole('button', { name: 'Редагувати' })
		this.vacancyLink = page.getByRole('main').getByRole('link', { name: 'Вакансії' })
		this.createVacancyButton = page.getByRole('button', { name: 'Створити вакансію +' })
		this.title = page.getByPlaceholder('Введіть назву')
		this.description = page.getByText('Опишіть вакансію')
		this.descriptionField = page.locator('.tiptap')
		this.category = page.getByLabel('Категорія вакансії')
		this.categoryJavaScript = page.getByLabel('JavaScript')
		this.categoryAndroid = page.getByLabel('Android')
		this.categoryQA = page.getByLabel('Manual QA')
		this.formatFull = page.getByLabel('Повна')
		this.formatPart = page.getByLabel('Часткова')
		this.onsite = page.getByLabel('Робота в офісі')
		this.input = page.locator('div').filter({ hasText: '4' }).nth(3)
		this.slider = page
			.locator('div')
			.filter({ hasText: /^Скільки годин на день потребується від кандидата1$/ })
			.locator('span')
			.nth(1)
		this.remote = page.getByLabel('Віддалена робота')
		this.hybrid = page.getByLabel('Гібридний формат')
		this.location = page.locator('button').filter({ hasText: 'Оберіть зі списку' })
		this.locationKharkiv = page.getByRole('option', { name: 'Харків, Харківська область' })
		this.searchlocation = page.getByPlaceholder('Оберіть зі списку')
		this.locationLviv = page.getByRole('option', { name: 'Львів, Львівська область' })
		this.saveButton = page.getByRole('button', { name: 'Зберегти' })
		this.successMessage = page.getByText('Вакансію успішно створено!')
		this.burgerMenuMobile = page.getByRole('banner').getByRole('list').getByRole('button')
		this.vacancyLinkMobile = page.getByRole('navigation').getByRole('link', { name: 'Вакансії' })
		//this.menuPrewiewVacancyDekstop = page.locator('button:nth-child(3)').first()
		//this.menuPrewiewVacancyMobile = page.getByRole('button').nth(4)
	}
	async gotoVacancyPage() {
		const responsePromise = this.page.waitForRequest('**')
		await this.page.goto('/profile', { timeout: 30000 })
		await responsePromise
		await this.avatar.isVisible()
		await this.avatar.isEnabled()
		await this.avatar.click()
		await this.projectsButton.click()
		await this.projectCard.isVisible()
		await this.projectCard.click()
		await this.editButton.isVisible()
		await this.editButton.click()
	}

	async openVacancyPage() {
		await this.vacancyLink.isVisible()
		await this.vacancyLink.click()
	}

	async createVacancy() {
		await this.createVacancyButton.isVisible()
		await this.createVacancyButton.click({ timeout: 30000 })
	}

	async typeTitle(type: string) {
		await this.title.click()
		await this.title.fill(type)
	}
	async typeDescription(type: string) {
		await this.description.click()
		await this.descriptionField.fill(type)
	}

	async chooseJavaScriptCategory() {
		await this.category.isVisible()
		await this.category.click()
		await this.categoryJavaScript.click()
	}

	async chooseAndroidCategory() {
		await this.category.click()
		await this.categoryAndroid.click()
	}

	async chooseQACategory() {
		await this.category.click()
		await this.categoryQA.click()
	}

	async choosePartTime() {
		await this.formatPart.isVisible()
		await this.formatPart.check()
		await this.formatPart.isChecked()
		await this.slider.click()
		await this.input.isVisible()
	}

	async chooseFullTime() {
		await this.formatFull.isVisible()
		await this.formatFull.check()
		await this.formatFull.isChecked()
	}

	async chooseRemoute() {
		await this.remote.isVisible()
		await this.remote.check()
		await this.remote.isChecked()
	}

	async chooseOnsite() {
		await this.onsite.isVisible()
		await this.onsite.check()
		await this.onsite.isChecked()
	}

	async chooseHybrid() {
		await this.hybrid.isVisible()
		await this.hybrid.check()
		await this.hybrid.isChecked()
	}

	async searchlocationLviv(type: string) {
		await this.location.isVisible()
		await this.location.click()
		await this.searchlocation.fill(type)
		await this.locationLviv.click()
	}

	async chooselocationKharkiv() {
		await this.location.isVisible()
		await this.location.click()
		await this.locationKharkiv.click()
	}

	async saveVacancy() {
		await this.saveButton.isEnabled()
		await this.saveButton.click()
		await this.successMessage.isVisible()
	}

	async openVacancyPageMobile() {
		await this.burgerMenuMobile.click({ timeout: 30000 })
		await this.vacancyLinkMobile.click()
	}

	async createVacancyMobile() {
		await this.createVacancyButton.isVisible()
		await this.createVacancyButton.click({ timeout: 30000 })
	}
}

export class EditVacancy {
	readonly page: Page
	readonly titleLink: Locator
	readonly titleLinkEdit: Locator
	readonly title: Locator
	readonly description: Locator
	readonly workType: Locator
	readonly formatText: Locator
	readonly locationText: Locator
	readonly workTime: Locator
	readonly editButton: Locator
	readonly applyButton: Locator
	readonly vacancyLink: Locator
	readonly deleteVacancyLink: Locator
	readonly titleEdit: Locator

	constructor(page: Page, type: string) {
		this.page = page
		this.titleLink = page.getByRole('link', { name: 'Frontend Developer' }).first()
		this.titleLinkEdit = page.getByRole('link', { name: 'Backend Developer' }).first()
		this.title = page.getByRole('heading', { name: type })
		this.description = page.getByRole('heading', { name: 'Опис вакансії' })
		this.workType = page.getByText(type)
		this.formatText = page.getByText(type)
		this.workTime = page.getByText(type)
		this.locationText = page.getByText(type)
		this.editButton = page.getByRole('link', { name: 'Редагувати' })
		this.titleEdit = page.getByPlaceholder('Введіть назву')
		this.vacancyLink = page.getByRole('main').getByRole('link', { name: 'Вакансії' })
		this.applyButton = page.getByRole('link', { name: 'Відгукнутися' })
		this.deleteVacancyLink = page.getByText('Зняти з публікації')
	}

	//async checkPrewiewVacancy() {

	//}

	async checkVacancyPageAdmin() {
		await this.titleLink.isVisible()
		await this.titleLink.click({ timeout: 15000 })
		//await this.title.isVisible()
		await this.description.isVisible()
		await this.workType.isVisible()
		await this.formatText.isVisible()
		await this.workTime.isVisible()
		await this.locationText.isVisible()
		await this.editButton.isVisible()
	}

	async checkEditVacancyPageAdmin() {
		await this.titleLinkEdit.isVisible()
		await this.titleLinkEdit.click()
		//await this.title.isVisible()
		await this.description.isVisible()
		await this.workType.isVisible()
		await this.formatText.isVisible()
		await this.workTime.isVisible()
		await this.locationText.isVisible()
		await this.editButton.isVisible()
	}

	async editVacancy() {
		await this.editButton.click({ timeout: 30000 })
	}
	async editTitle(type: string) {
		await this.titleEdit.click()
		await this.titleEdit.fill(type)
	}

	async deleteVacancy() {
		await this.deleteVacancyLink.isVisible()
		await this.deleteVacancyLink.click()
	}

	async checkVacancyPageMember() {
		await this.titleLink.isVisible()
		await this.titleLink.click()
		await this.title.isVisible()
		await this.description.isVisible()
		await this.workType.isVisible()
		await this.formatText.isVisible()
		await this.workTime.isVisible()
		await this.locationText.isVisible()
		await this.applyButton.isVisible()
	}

	async applyVacancy() {
		await this.applyButton.click()
	}
}
