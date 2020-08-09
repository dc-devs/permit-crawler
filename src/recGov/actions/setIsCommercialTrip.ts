import { Page } from 'puppeteer';
import { pageElements } from '../constants';

const { commericalTripNoButtonSelector } = pageElements;

const setIsCommericalTrip = async (page: Page): Promise<void> => {
	await page.evaluate(
		({ commericalTripNoButtonSelector }) => {
			const input = document.querySelector(
				commericalTripNoButtonSelector
			) as HTMLInputElement;

			input.click();
		},
		{ commericalTripNoButtonSelector }
	);
};

export default setIsCommericalTrip;
