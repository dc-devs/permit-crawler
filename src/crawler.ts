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
			siteName: 'River Trail',
		},
	};

	const pageElements = {
		logInButton: '.nav-header-button:nth-child(2)',
		emailAddressInput: '#rec-acct-sign-in-email-address',
		passwordInput: '#rec-acct-sign-in-password',
		signInSumbitButton: '.rec-acct-sign-in-btn',
		groupSizeInput: '.sarsa-text-field-input',
		commericalTripNoButton: '#prompt-answer-no1',
		addGroupMemberButton: '*[aria-label^="Add guests"]',
	};

	const { credentials, tripDetails } = config;
	const { email, password } = credentials;
	const { type, date, siteName, groupSize } = tripDetails;
	const {
		logInButton,
		passwordInput,
		groupSizeInput,
		emailAddressInput,
		signInSumbitButton,
		addGroupMemberButton,
		commericalTripNoButton,
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

	// Set Group Size
	await page.evaluate(
		({ groupSizeInput }) => {
			const input = document.querySelector(
				groupSizeInput
			) as HTMLInputElement;
			input.value = '';
		},
		{ groupSizeInput }
	);

	await page.evaluate(
		({ groupSize, addGroupMemberButton }) => {
			const members = parseInt(groupSize, 10);

			for (let i = 0; i < members; i++) {
				const button = document.querySelector(
					addGroupMemberButton
				) as HTMLElement;
				button.click();
			}
		},
		{ groupSize, addGroupMemberButton }
	);

	// Click commercial button
	await page.evaluate(
		({ commericalTripNoButton }) => {
			const input = document.querySelector(
				commericalTripNoButton
			) as HTMLInputElement;

			input.click();
		},
		{ commericalTripNoButton }
	);

	// Find Trail Name
	await page.evaluate(
		({ siteName }) => {
			const tableRows = document.querySelectorAll('tr');

			for (let i = 0; i < tableRows.length; i++) {
				const tableRow = tableRows[i];
				const tableColumns = tableRow.querySelectorAll('td');
				const siteElement = tableColumns.item(1);
				const site = siteElement && siteElement.innerText;
				const availabilityElement = tableColumns.item(4);
				const availabilityClassName =
					availabilityElement &&
					availabilityElement.classList.item(0);
				const isAvailable =
					availabilityClassName &&
					availabilityClassName.includes('available');

				if (site === siteName) {
					console.log(site, isAvailable);
				}
			}
		},
		{ siteName }
	);

	await page.waitFor(99000);

	await browser.close();
})();
