import { Page } from 'puppeteer';
import config from '../../crawlConfigs/recGovWildernessPermitConfig';
import { pageElements } from '../constants';

const {
	dateInputSelector
} = pageElements;

const { tripDetails } = config;
const { month, day } = tripDetails;

const setDate = async (page: Page): Promise<void> => {
	await page.focus(dateInputSelector);
	await page.keyboard.press('ArrowRight');
	for (let i = 0; i < 8; i++) {
		await page.keyboard.press('ArrowLeft');
	}
	for (let i = 0; i < 2; i++) {
		await page.keyboard.press('Backspace');
	}
	await page.keyboard.type(month);
	await page.keyboard.press('ArrowRight');
	await page.keyboard.press('Delete');
	await page.keyboard.press('Delete');
	await page.keyboard.type(day);
	await page.keyboard.press('Enter');
};

export default setDate;
