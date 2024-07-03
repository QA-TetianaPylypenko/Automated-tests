import { pawLogIn } from '../POM/fixture_logIn'
import { CreateVacancy } from '../POM/createVacancyPage'

import { test } from '@playwright/test'
import * as fs from 'fs'

// Фікстура виконує логін
test.beforeEach(async ({ page }) => {
	await pawLogIn({ page })
})

const vacancyData = JSON.parse(fs.readFileSync('tests/utils/newVacancyData.json', 'utf-8'))

const titleFront = vacancyData[0].title[0]
const descriptionFront = vacancyData[1].description[0]

const titleUx = vacancyData[0].title[1]
const descriptionUx = vacancyData[1].description[1]

const titleQA = vacancyData[0].title[2]
const descriptionQA = vacancyData[1].description[2]

const location = 'Львів'

test.describe.serial('Create vacancy - desktop set', () => {
	test('Part time, onsite, Kharkiv', async ({ page }) => {
		const createNewVacancy = new CreateVacancy(page)

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
	})
	test('Part time, hybrid, Lviv', async ({ page }) => {
		const createNewVacancy = new CreateVacancy(page)

		await createNewVacancy.gotoVacancyPage()
		await createNewVacancy.openVacancyPage()
		await createNewVacancy.createVacancy()
		await createNewVacancy.typeTitle(titleQA)
		await createNewVacancy.typeDescription(descriptionQA)
		await createNewVacancy.chooseQACategory()
		await createNewVacancy.choosePartTime()
		await createNewVacancy.chooseHybrid()
		await createNewVacancy.searchlocationLviv(location)
		await createNewVacancy.saveVacancy()
	})
	test('Full time, remote', async ({ page }) => {
		const createNewVacancy = new CreateVacancy(page)

		await createNewVacancy.gotoVacancyPage()
		await createNewVacancy.openVacancyPage()
		await createNewVacancy.createVacancy()
		await createNewVacancy.typeTitle(titleUx)
		await createNewVacancy.typeDescription(descriptionUx)
		await createNewVacancy.chooseAndroidCategory()
		await createNewVacancy.chooseFullTime()
		await createNewVacancy.chooseRemoute()
		await createNewVacancy.saveVacancy()
	})
})
