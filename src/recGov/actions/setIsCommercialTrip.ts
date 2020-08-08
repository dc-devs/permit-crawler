import { Page } from 'puppeteer';
import { recGovPageElements } from '../constants';

const { commericalTripNoButton } = recGovPageElements;

const setIsCommericalTrip = async (page: Page) => {
	await page.evaluate(
		({ commericalTripNoButton }) => {
			const input = document.querySelector(
				commericalTripNoButton
			) as HTMLInputElement;

			input.click();
		},
		{ commericalTripNoButton }
	);
};

export default setIsCommericalTrip;
