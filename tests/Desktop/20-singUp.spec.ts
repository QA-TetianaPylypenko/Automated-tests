import { randomEmail } from '../POM/function_randomEmail'
import user from '../utils/userSingUp.json'

import { expect, test } from '@playwright/test'
import dotenv from 'dotenv'
import { resolve } from 'path'

const name = 'Тест'
//const nameInvalid = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюяабвгґдеєжзиіопараа'
const surname = 'Тест'
//const surnameInalid = '@@@@123$#'
const email: string = randomEmail()
const emailInvalid = 'test.gmail.com'
const emailExist = 'test@gmail.com'
const password = 'Test1234'
const passwordInvalidShort = 'Te12'

// Перевіряємо наявність елементів у формі та перехід до реєстрації через Googl
test('SingUp check elements', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'Приєднатись' }).isEnabled()
	await page.getByRole('link', { name: 'Приєднатись' }).click()
	await expect(page).toHaveURL(/register/)
	await expect(page.getByPlaceholder("Ім'я")).toBeEnabled()
	await expect(page.getByPlaceholder('Прізвищe')).toBeEnabled()
	await expect(page.getByPlaceholder('mail@google.com')).toBeEnabled()
	await expect(page.getByPlaceholder('************')).toBeEnabled()
	await expect(page.getByRole('main').getByRole('button').first()).toBeEnabled()
	await expect(page.getByLabel('Погоджуюсь зумовами використання')).toBeEnabled()
	await expect(page.getByRole('button', { name: 'умовами використання' })).toBeEnabled()
	await page.getByRole('button', { name: 'Підтвердити' }).isEnabled()
	await page.getByRole('button', { name: 'Google' }).isEnabled()
	await page.getByRole('button', { name: 'Увійти' }).isEnabled()
	await page.getByRole('button', { name: 'Google' }).click()
	await expect(page).toHaveURL(/google/)
})

// Перевіряємо кнопку 'Погоджуюсь з умовами використання'
test('Checking з умовами використання button', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Приєднатись' }).click();
    await expect(page).toHaveURL(/register/);
    
    // Перевіряємо кнопку "З умовами використання"
    await page.getByRole('button', { name: 'умовами використання' }).isEnabled();
    await page.getByRole('button', { name: 'умовами використання' }).click();
});


// Реєстрація з валідними даними
test.fixme('Sing Up with valid data', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'Приєднатись' }).click()
	await expect(page).toHaveURL(/register/)
	await page.getByPlaceholder("Ім'я").fill(user.UfirstName)
	await page.getByPlaceholder('Прізвищe').fill(user.UlastName)
	await page.getByPlaceholder('mail@google.com').fill(user.Uemail)
	await page.getByPlaceholder('************').fill(user.Upassword)

	// Перевіряємо валідацію списку з вимогами до паролю
	const requirementsList = await page.locator('ul')
	const areAllGreen = await requirementsList.locator('span.text-green-600').count()
	expect(areAllGreen).toEqual(4)

	// Перевірка глазику у полі пароль
	await page.getByRole('main').getByRole('button').first().isEnabled
	await page.getByRole('main').getByRole('button').first().click()
	await page.getByRole('main').getByRole('button').first().click()

	//Перевіряємо чекбокс
	await page.getByLabel('Погоджуюсь зумовами використання').check()
	await expect(page.getByLabel('Погоджуюсь зумовами використання')).toBeChecked()

	await page.getByRole('button', { name: 'Підтвердити' }).isEnabled()
	await page.getByRole('button', { name: 'Підтвердити' }).click()
	await page.getByRole('heading', { name: 'Лист з підтвердженням надіслано' }).isVisible()
	// await page.getByRole('button', { name: 'На головну' }).isEnabled()

	// Використання mailpit

	dotenv.config({ path: resolve(__dirname, '.env') })

	const TEST_SMTP_UI: string | undefined = process.env.TEST_SMTP_UI

	if (TEST_SMTP_UI) {
		// Значення TEST_SMTP_UI було успішно завантажено з .env
		// Тут ви можете використовувати це значення, наприклад, для виклику page.goto()
		await page.goto(TEST_SMTP_UI)
	} else {
		console.error('Змінна TEST_SMTP_UI не була налаштована в .env файлі.')
	}
	// await expect(page.locator('#app')).toContainText('Mailpit')

	// await page.getByRole('button', { name: ' Inbox' }).click()
	await page
		.locator('div')
		.filter({ hasText: /^Mailpit$/ })
		.first()
		.click()

	await page.locator('#message-page >> a', { hasText: 'seconds ago' }).first().click()
	await expect(
		page
			.frameLocator('#preview-html')
			.getByText(`Натиснувши на 🔗 ПОСИЛАННЯ ви підтверджуєте реєістрацію у Pawmerge.`)
	).toBeVisible()

	const WEB_URL: string | undefined = process.env.WEB_URL
	const path = '/new-' // Шлях до сторінки
	const fullURL = `${WEB_URL}${path}` // Повний URL

	if (WEB_URL) {
		await page.goto(fullURL) // Перехід на повний URL
	} else {
		console.error('WEB_URL не визначено в оточенні.')
	}

	// спроба зловити меседж про успішну верифікацію
	// await expect(
	// 	page.locator('div').filter({ hasText: /^Успішно верифіковано, можете увійти в аккаунт$/ })
	//   ).toBeVisible({ timeout: 7000 }); // Тут ми додаємо таймаут 2 секунди (2000 мілісекунд)

	// // спроба зайти в фрейм в мейлпіт
	// const frame = await page.frameLocator('#preview-html');

	// // Взаємодіємо з посиланням всередині фрейму
	// await frame.getByRole('link', { name: '🔗 ПОСИЛАННЯ' }).click();

	// await page.waitForTimeout(5000)

	await page.waitForLoadState('networkidle')

	//вхід у верифікований профіль
	await page.goto('/login')
	await page.getByPlaceholder('email@google.com').fill(user.Uemail)
	await page.getByPlaceholder('**********').fill(user.Upassword)
	await page.getByRole('button', { name: 'Увійти' }).click()

	//підтвердження входу у профіль
	await expect(page.getByText(`${user.UfirstName} ${user.UlastName}`)).toBeVisible()
	await expect(page.getByRole('button', { name: 'Редагувати' })).toBeVisible()
})

// Реєстрація без чекбоксу
test.fixme('Sing Up with valid data without checkbox', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'Приєднатись' }).click()
	await expect(page).toHaveURL(/register/)
	await page.getByPlaceholder("Ім'я").click()
	await page.getByPlaceholder("Ім'я").fill(name)
	await page.getByPlaceholder('Прізвищe').click()
	await page.getByPlaceholder('Прізвищe').fill(surname)
	await page.getByPlaceholder('mail@google.com').click()
	await page.getByPlaceholder('mail@google.com').fill(email)
	await page.getByPlaceholder('************').click()
	await page.getByPlaceholder('************').fill(password)

	//Перевіряємо валідацію списку з вимогами до паролю
	const requirementsList = await page.locator('ul')
	const areAllGreen = await requirementsList.locator('span.text-green-600').count()
	expect(areAllGreen).toEqual(4)

	await page.getByLabel('Погоджуюсь зумовами використання').isEnabled()

	await page.getByRole('button', { name: 'Підтвердити' }).isEnabled()
	await page.getByRole('button', { name: 'Підтвердити' }).click()

	// Перевіряємо наявність атрібуту aria-invalid = true (валідація чекбоксу)
	const ariaCheckbox = await page
		.getByLabel('Погоджуюсь зумовами використання')
		.getAttribute('aria-invalid')
	await expect(ariaCheckbox).toEqual('true')
})

// Перевіряємо поле 'Ім'я' (пусте)
test.fixme('Sing Up with empty name', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'Приєднатись' }).click()
	await expect(page).toHaveURL(/register/)
	await page.getByPlaceholder("Ім'я").click()
	await page.getByPlaceholder("Ім'я").fill('')
	await page.getByPlaceholder('Прізвищe').click()
	await page.getByPlaceholder('Прізвищe').fill(surname)
	await page.getByPlaceholder('mail@google.com').click()
	await page.getByPlaceholder('mail@google.com').fill(email)
	await page.getByPlaceholder('************').click()
	await page.getByPlaceholder('************').fill(password)

	// Перевіряємо валідацію списку з вимогами до паролю
	const requirementsList = await page.locator('ul')
	const areAllGreen = await requirementsList.locator('span.text-green-600').count()
	expect(areAllGreen).toEqual(4)

	//Перевіряємо чекбокс
	await page.getByLabel('Погоджуюсь зумовами використання').check()
	await expect(page.getByLabel('Погоджуюсь зумовами використання')).toBeChecked()

	await page.getByRole('button', { name: 'Підтвердити' }).isEnabled()
	await page.getByRole('button', { name: 'Підтвердити' }).click()

	// Перевіряємо наявність атрібуту aria-invalid = true та повідомлення (валідація поля)
	const ariaName = await page.locator('input[placeholder="Ім\'я"]').getAttribute('aria-invalid')
	await expect(ariaName).toEqual('true')
	await page.getByText("Ім'я обов'язкове").isVisible()
})

// Перевіряємо поле 'Ім'я' (51 символ)
/*test('Sing Up invalid name - 51 symbols', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Приєднатись' }).click();
    await expect(page).toHaveURL(/register/);
    await page.getByPlaceholder('Ім\'я').click();
    await page.getByPlaceholder('Ім\'я').fill(nameInvalid);
    await page.getByPlaceholder('Прізвищe').click();
    await page.getByPlaceholder('Прізвищe').fill(surname);
    await page.getByPlaceholder('mail@google.com').click();
    await page.getByPlaceholder('mail@google.com').fill(email);
    await page.getByPlaceholder('************').click();
    await page.getByPlaceholder('************').fill(password);
    
    //Перевіряємо чекбокс
    await page.getByLabel('Погоджуюсь зумовами використання').check();
    await page.getByLabel('Погоджуюсь зумовами використання').isChecked();
    
    await page.getByRole('button', {name: 'Підтвердити'}).isEnabled();
    await page.getByRole('button', {name: 'Підтвердити'}).click();

    // Перевіряємо наявність атрібуту aira-invalid = true та повідомлення (валідація поля)
    const ariaName = await page.locator('input[placeholder="Прізвищe"]').getAttribute('aria-invalid');
    await expect(ariaName).toEqual('true'); 
    await page.getByText('Ім\'я обов\'язкове').isVisible();  
});
*/

// Перевіряємо поле 'Прізвище' (пусте)
test.fixme('Sing Up with empty surname', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'Приєднатись' }).click()
	await expect(page).toHaveURL(/register/)
	await page.getByPlaceholder("Ім'я").click()
	await page.getByPlaceholder("Ім'я").fill(name)
	await page.getByPlaceholder('Прізвищe').click()
	await page.getByPlaceholder('Прізвищe').fill('')
	await page.getByPlaceholder('mail@google.com').click()
	await page.getByPlaceholder('mail@google.com').fill(email)
	await page.getByPlaceholder('************').click()
	await page.getByPlaceholder('************').fill(password)

	// Перевіряємо валідацію списку з вимогами до паролю
	const requirementsList = await page.locator('ul')
	const areAllGreen = await requirementsList.locator('span.text-green-600').count()
	expect(areAllGreen).toEqual(4)

	//Перевіряємо чекбокс
	await page.getByLabel('Погоджуюсь зумовами використання').check()
	await expect(page.getByLabel('Погоджуюсь зумовами використання')).toBeChecked()

	await page.getByRole('button', { name: 'Підтвердити' }).isEnabled()
	await page.getByRole('button', { name: 'Підтвердити' }).click()

	// Перевіряємо наявність атрібуту aira-invalid = true та повідомлення (валідація поля)
	const ariaSurname = await page
		.locator('input[placeholder="Прізвищe"]')
		.getAttribute('aria-invalid')
	await expect(ariaSurname).toEqual('true')
	await page.getByText("Прізвищe обов'язкове").isVisible()
})

// Перевіряємо поле 'Прізвище' (спец.символи)
/*test('Sing Up with invalid surname - spesial symbols', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Приєднатись' }).click();
    await expect(page).toHaveURL(/register/);
    await page.getByPlaceholder('Ім\'я').click();
    await page.getByPlaceholder('Ім\'я').fill(name);
    await page.getByPlaceholder('Прізвищe').click();
    await page.getByPlaceholder('Прізвищe').fill(surnameInalid);
    await page.getByPlaceholder('mail@google.com').click();
    await page.getByPlaceholder('mail@google.com').fill(email);
    await page.getByPlaceholder('************').click();
    await page.getByPlaceholder('************').fill(password);

    // Перевіряємо валідацію списку з вимогами до паролю
    const requirementsList = await page.locator('ul');
    const areAllGreen = await requirementsList.locator('span.text-green-600').count();
    expect(areAllGreen).toEqual(4);

    //Перевіряємо чекбокс
    await page.getByLabel('Погоджуюсь зумовами використання').check();
    await page.getByLabel('Погоджуюсь зумовами використання').isChecked();

    await page.getByRole('button', {name: 'Підтвердити'}).isEnabled();
    await page.getByRole('button', {name: 'Підтвердити'}).click();
    
    // Перевіряємо наявність атрібуту aira-invalid = true та повідомлення (валідація поля)
    const ariaSurname = await page.locator('input[placeholder="Прізвищe"]').getAttribute('aria-invalid');
    await expect(ariaSurname).toEqual('true');
    await page.getByText('Прізвищe обов\'язкове').isVisible();  
});*/

// Перевіряємо поле 'Емаіл' (пусте)
test.fixme('Sing Up with empty email', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'Приєднатись' }).click()
	await expect(page).toHaveURL(/register/)
	await page.getByPlaceholder("Ім'я").click()
	await page.getByPlaceholder("Ім'я").fill(name)
	await page.getByPlaceholder('Прізвищe').click()
	await page.getByPlaceholder('Прізвищe').fill(surname)
	await page.getByPlaceholder('mail@google.com').click()
	await page.getByPlaceholder('mail@google.com').fill('')
	await page.getByPlaceholder('************').click()
	await page.getByPlaceholder('************').fill(password)

	// Перевіряємо валідацію списку з вимогами до паролю
	const requirementsList = await page.locator('ul')
	const areAllGreen = await requirementsList.locator('span.text-green-600').count()
	expect(areAllGreen).toEqual(4)

	//Перевіряємо чекбокс
	await page.getByLabel('Погоджуюсь зумовами використання').check()
	await expect(page.getByLabel('Погоджуюсь зумовами використання')).toBeChecked()

	await page.getByRole('button', { name: 'Підтвердити' }).isDisabled()
})

// Перевіряємо поле 'Емаіл' (без @)
test.fixme('Sing Up with invalid email - without @', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'Приєднатись' }).click()
	await expect(page).toHaveURL(/register/)
	await page.getByPlaceholder("Ім'я").click()
	await page.getByPlaceholder("Ім'я").fill(name)
	await page.getByPlaceholder('Прізвищe').click()
	await page.getByPlaceholder('Прізвищe').fill(surname)
	await page.getByPlaceholder('mail@google.com').click()
	await page.getByPlaceholder('mail@google.com').fill(emailInvalid)
	await page.getByPlaceholder('************').click()
	await page.getByPlaceholder('************').fill(password)

	// Перевіряємо валідацію списку з вимогами до паролю
	const requirementsList = await page.locator('ul')
	const areAllGreen = await requirementsList.locator('span.text-green-600').count()
	expect(areAllGreen).toEqual(4)

	//Перевіряємо чекбокс
	await page.getByLabel('Погоджуюсь зумовами використання').check()
	await page.getByLabel('Погоджуюсь зумовами використання').isChecked()

	await page.getByRole('button', { name: 'Підтвердити' }).isEnabled()
	await page.getByRole('button', { name: 'Підтвердити' }).click()
})

// Перевіряємо поле 'Емаіл' (наявний емейл)
test.fixme('Sing Up with exist email', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'Приєднатись' }).click()
	await expect(page).toHaveURL(/register/)
	await page.getByPlaceholder("Ім'я").click()
	await page.getByPlaceholder("Ім'я").fill(name)
	await page.getByPlaceholder('Прізвищe').click()
	await page.getByPlaceholder('Прізвищe').fill(surname)
	await page.getByPlaceholder('mail@google.com').click()
	await page.getByPlaceholder('mail@google.com').fill(emailExist)
	await page.getByPlaceholder('************').click()
	await page.getByPlaceholder('************').fill(password)

	// Перевіряємо валідацію списку з вимогами до паролю
	const requirementsList = await page.locator('ul')
	const areAllGreen = await requirementsList.locator('span.text-green-600').count()
	expect(areAllGreen).toEqual(4)

	// Перевіряємо чекбокс
	await page.getByLabel('Погоджуюсь зумовами використання').check()
	await expect(page.getByLabel('Погоджуюсь зумовами використання')).toBeChecked()

	await page.getByRole('button', { name: 'Підтвердити' }).isEnabled()
	await page.getByRole('button', { name: 'Підтвердити' }).click()

	await page
		.locator('div')
		.filter({ hasText: /^Акаунт з цією електронною поштою вже існує$/ })
		.isVisible()
})

// Перевіряємо поле 'Пароль' (пусте)
test.fixme('Sing Up with empty password', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'Приєднатись' }).click()
	await expect(page).toHaveURL(/register/)
	await page.getByPlaceholder("Ім'я").click()
	await page.getByPlaceholder("Ім'я").fill(name)
	await page.getByPlaceholder('Прізвищe').click()
	await page.getByPlaceholder('Прізвищe').fill(surname)
	await page.getByPlaceholder('mail@google.com').click()
	await page.getByPlaceholder('mail@google.com').fill(email)
	await page.getByPlaceholder('************').click()
	await page.getByPlaceholder('************').fill('')

	// Перевіряємо валідацію списку з вимогами до паролю
	const requirementsList = await page.locator('ul')
	const areAllGreen = await requirementsList.locator('span.text-green-600').count()
	expect(areAllGreen).toEqual(0)

	// Перевіряємо чекбокс
	await page.getByLabel('Погоджуюсь зумовами використання').check()
	await expect(page.getByLabel('Погоджуюсь зумовами використання')).toBeChecked()

	await page.getByRole('button', { name: 'Підтвердити' }).isDisabled()
})

// Перевіряємо поле 'Пароль' (4 символи)
test.fixme('Sing Up with invalid password - short', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'Приєднатись' }).click()
	await expect(page).toHaveURL(/register/)
	await page.getByPlaceholder("Ім'я").click()
	await page.getByPlaceholder("Ім'я").fill(name)
	await page.getByPlaceholder('Прізвищe').click()
	await page.getByPlaceholder('Прізвищe').fill(surname)
	await page.getByPlaceholder('mail@google.com').click()
	await page.getByPlaceholder('mail@google.com').fill(email)
	await page.getByPlaceholder('************').click()
	await page.getByPlaceholder('************').fill(passwordInvalidShort)

	// Перевіряємо валідацію списку з вимогами до паролю
	const requirementsList = await page.locator('ul')
	const areAllGreen = await requirementsList.locator('span.text-green-600').count()
	expect(areAllGreen).toEqual(3)

	// Перевіряємо чекбокс
	await page.getByLabel('Погоджуюсь зумовами використання').check()
	await expect(page.getByLabel('Погоджуюсь зумовами використання')).toBeChecked()

	await page.getByRole('button', { name: 'Підтвердити' }).isEnabled()
	await page.getByRole('button', { name: 'Підтвердити' }).click()

	// Перевіряємо наявність атрібуту aira-invalid = true та повідомлення (валідація поля)
	const ariaPassword = await page
		.locator('input[placeholder="************"]')
		.getAttribute('aria-invalid')
	await expect(ariaPassword).toEqual('true')
	await page.getByText('Мінімум 8 символів').isVisible()
})

