import { Page } from 'puppeteer';
import { PageElement } from '../enums';
import { IConfig } from '../../../interfaces';

interface IProps {
	page: Page;
	config: IConfig;
	customGroupSize?: string | null | undefined;
}

const setGroupSize = async ({ page, config, customGroupSize }: IProps) => {
	const { tripDetails } = config;
	const { groupSize: desiredGroupSize } = tripDetails;
	const groupSize = customGroupSize || desiredGroupSize;

	await page.focus(PageElement.INPUT_GROUPSIZE);
	await page.click(PageElement.INPUT_GROUPSIZE);
	// TODO: Deprecated
	await page.evaluate(() => document.execCommand('selectall', false));
	await page.keyboard.sendCharacter(groupSize);
	await page.click(PageElement.BODY);

	await page.waitForSelector(PageElement.BOOK_NOW_CONTENT);
};

export default setGroupSize;
