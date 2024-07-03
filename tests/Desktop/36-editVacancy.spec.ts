import { pawLogIn } from '../POM/fixture_logIn'
import { MembersList } from '../POM/memberList'
import { CreateVacancy, EditVacancy } from '../POM/createVacancyPage'


import { test } from '@playwright/test'
import * as fs from 'fs'
// Фікстура виконує логін
test.beforeEach(async ({ page }) => {
	await pawLogIn({ page })
})

const editVacancyData = JSON.parse(fs.readFileSync('tests/utils/editVacancyData.json', 'utf-8'))
const vacancyData = JSON.parse(fs.readFileSync('tests/utils/newVacancyData.json', 'utf-8'))

const editTitle = editVacancyData[0].title[0]
const titleFront = vacancyData[0].title[0]
const descriptionFront = vacancyData[1].description[0]

test.describe.serial('Display, edit vacancy - desktop set', () => {
	test('Edit vacancy', async ({ page }) => {
		const createNewVacancy = new CreateVacancy(page)
		const editVacancy = new EditVacancy(page, 'type')

		await createNewVacancy.gotoVacancyPage()
		await createNewVacancy.openVacancyPage()
		await createNewVacancy.createVacancy()
		await createNewVacancy.typeTitle(titleFront)
		await createNewVacancy.typeDescription(descriptionFront)
		await createNewVacancy.chooseJavaScriptCategory()
		await createNewVacancy.choosePartTime()
		await createNewVacancy.chooseOnsite()
		await createNewVacancy.chooselocationKharkiv()
		await createNewVacancy.saveVacancy()
		await editVacancy.checkVacancyPageAdmin()
		// Edit Vacancy
		await editVacancy.editVacancy()
		await editVacancy.editTitle(editTitle)
		await createNewVacancy.chooseAndroidCategory()
		await createNewVacancy.choosePartTime()
		await createNewVacancy.chooseRemoute()
		await createNewVacancy.saveVacancy()
		await editVacancy.checkEditVacancyPageAdmin()
	})

	test('Checking page with list of members', async ({ page }) => {
		const membersList = new MembersList(page)
		const createNewVacancy = new CreateVacancy(page)
		await createNewVacancy.gotoVacancyPage()
		await createNewVacancy.openVacancyPage()
		await membersList.rewiewButtonChoose()
		await membersList.checkMembersList()
	})
})
