import { Page } from 'puppeteer';
import { PageElement } from '../enums';
import { IConfig } from '../../../interfaces';

interface IProps {
	page: Page;
	config: IConfig;
}

const signIn = async ({ page, config }: IProps) => {
	const { credentials } = config;
	const { recreationGov } = credentials;
	const { email, password } = recreationGov;

	await page.click(PageElement.BUTTON_LOG_IN);

	await page.focus(PageElement.INPUT_EMAIL);
	await page.keyboard.type(email);

	await page.focus(PageElement.INPUT_PASSWORD);
	await page.keyboard.type(password);

	await page.click(PageElement.BUTTON_LOG_IN_SUBMIT);
	await page.waitForSelector(PageElement.PROFILE_DROPDOWN);
};

export default signIn;
