// Генеруємо електронну пошту

export function randomEmail(): string {
	const characters = 'abcdefghijklmnopqrstuvwxyz'
	let email = ''

	// Генеруємо випадковий рядок довжиною 10 символів
	for (let i = 0; i < 10; i++) {
		email += characters.charAt(Math.floor(Math.random() * characters.length))
	}

	email += '@gmail.com'

	return email
}