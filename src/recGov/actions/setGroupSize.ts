import { Page } from 'puppeteer';
import { pageElements } from '../constants';
import config from '../../crawlConfigs/recGovWildernessPermitConfig';

const { tripDetails } = config;
const { groupSize } = tripDetails;
const { groupSizeInputSelector, addGroupMemberButtonSelector } = pageElements;

const setGroupSize = async (page: Page): Promise<void> => {
	await page.evaluate(
		({ groupSizeInputSelector }) => {
			const input = document.querySelector(
				groupSizeInputSelector
			) as HTMLInputElement;
			input.value = '';
		},
		{ groupSizeInputSelector }
	);

	await page.evaluate(
		({ groupSize, addGroupMemberButtonSelector }) => {
			const members = parseInt(groupSize, 10);

			for (let i = 0; i < members; i++) {
				const button = document.querySelector(
					addGroupMemberButtonSelector
				) as HTMLElement;

				button.click();
			}
		},
		{ groupSize, addGroupMemberButtonSelector }
	);
};

export default setGroupSize;
