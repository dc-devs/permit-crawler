import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

(async () => {
	const config = {
		credentials: {
			email: 'david.w.christian@gmail.com',
			password: 'CPwres7ler4re!',
		},
		tripDetails: {
			type: 'overnight-permit',
			date: '2020-08-21',
			groupSize: '2',
		},
	};

	const pageElements = {
		logInButton: '.nav-header-button:nth-child(2)',
		emailAddressInput: '#rec-acct-sign-in-email-address',
		passwordInput: '#rec-acct-sign-in-password',
		signInSumbitButton: '.rec-acct-sign-in-btn',
		groupSizeInput: '.sarsa-text-field-input',
	};

	const { credentials, tripDetails } = config;
	const { email, password } = credentials;
	const { type, date, groupSize } = tripDetails;
	const {
		logInButton,
		signInSumbitButton,
		passwordInput,
		groupSizeInput,
		emailAddressInput,
	} = pageElements;
	const pageUrl = `https://www.recreation.gov/permits/233262/registration/detailed-availability?type=${type}&date=${date}`;

	puppeteer.use(StealthPlugin());

	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.goto(pageUrl);

	// Sign In
	// --------
	await page.click(logInButton);

	await page.focus(emailAddressInput);
	await page.keyboard.type(email);

	await page.focus(passwordInput);
	await page.keyboard.type(password);

	await page.click(signInSumbitButton);

	// Set Trip Details
	// -----------------
	await page.evaluate(
		({ groupSizeInput }) => {
			const input = document.querySelector(
				groupSizeInput
			) as HTMLInputElement;
			input.value = '';
		},
		{ groupSizeInput }
	);

	await page.focus(groupSizeInput);
	await page.keyboard.type(groupSize);

	await page.waitFor(3000);

	await browser.close();
})();
