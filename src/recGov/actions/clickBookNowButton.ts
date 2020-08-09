import { Page } from 'puppeteer';
import { pageElements } from '../constants';

const { bookNowContentSelector } = pageElements;

const clickBookNowButton = async (page: Page): Promise<boolean> => {
	return await page.evaluate(
		({ bookNowContentSelector }) => {
			const bookNowContent = document.querySelector(
				bookNowContentSelector
			) as HTMLElement;

			const bookNowButton = bookNowContent.querySelector(
				'button'
			) as HTMLElement;

			bookNowButton.click();

			return true;
		},
		{ bookNowContentSelector }
	);
};

export default clickBookNowButton;
