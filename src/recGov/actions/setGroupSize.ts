import { Page } from 'puppeteer';
import { recGovPageElements } from '../constants';
import config from '../../crawlConfigs/recGovWildernessPermitConfig';

const { tripDetails } = config;
const { groupSize } = tripDetails;
const { groupSizeInput, addGroupMemberButton } = recGovPageElements;

const setGroupSize = async (page: Page) => {
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
};

export default setGroupSize;
