import { Page } from 'puppeteer';
import config from '../../crawlConfigs/recGovWildernessPermitConfig';
import { pageElements } from '../constants';

const {
	logInButtonSelector,
	passwordInputSelector,
	emailAddressInputSelector,
	signInSumbitButtonSelector,
} = pageElements;

const { credentials } = config;
const { email, password } = credentials;

const signIn = async (page: Page): Promise<void> => {
	await page.click(logInButtonSelector);

	await page.focus(emailAddressInputSelector);
	await page.keyboard.type(email);

	await page.focus(passwordInputSelector);
	await page.keyboard.type(password);

	await page.click(signInSumbitButtonSelector);
};

export default signIn;
