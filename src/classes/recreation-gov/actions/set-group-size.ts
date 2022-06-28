import { Page } from 'puppeteer';
import { PageElement } from '../enums';
import { IConfig } from '../../../interfaces';

interface IProps {
	page: Page;
	config: IConfig;
}

const setGroupSize = async ({ page, config }: IProps) => {
	const { tripDetails } = config;
	const { groupSize } = tripDetails;

	await page.focus(PageElement.INPUT_GROUPSIZE);
	await page.click(PageElement.INPUT_GROUPSIZE);
	// TODO: Deprecated
	await page.evaluate(() => document.execCommand('selectall', false));
	await page.keyboard.sendCharacter(groupSize);
	await page.click(PageElement.BODY);
};

export default setGroupSize;
