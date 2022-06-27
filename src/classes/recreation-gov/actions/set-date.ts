import { Page } from 'puppeteer';
import { IConfig } from '../../../interfaces';
import { PageElement } from '../enums';

interface IProps {
	page: Page;
	config: IConfig;
}

const setDate = async ({ page, config }: IProps) => {
	const { tripDetails } = config;
	const { date } = tripDetails;

	await page.focus(PageElement.INPUT_DATE);
	await page.click(PageElement.INPUT_DATE);
	// TODO: Deprecated
	await page.evaluate(() => document.execCommand('selectall', false));
	await page.keyboard.sendCharacter(date);
	await page.click(PageElement.BODY);
};

export default setDate;
