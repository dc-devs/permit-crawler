import { Page } from 'puppeteer';
import config from '../../crawlConfigs/recGovWildernessPermitConfig';
import { recGovPageElements } from '../constants';

const {
	logInButton,
	passwordInput,
	emailAddressInput,
	signInSumbitButton,
} = recGovPageElements;

const { credentials } = config;
const { email, password } = credentials;

const signIn = async (page: Page): Promise<void> => {
	await page.click(logInButton);

	await page.focus(emailAddressInput);
	await page.keyboard.type(email);

	await page.focus(passwordInput);
	await page.keyboard.type(password);

	await page.click(signInSumbitButton);
};

export default signIn;
