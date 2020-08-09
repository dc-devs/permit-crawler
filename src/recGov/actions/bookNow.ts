import { Page } from 'puppeteer';
import clickBookNowButton from './clickBookNowButton';
import clickAvailabilityButton from './clickAvailabilityButton';

const bookNow = async (page: Page) => {
	await clickAvailabilityButton(page);
	await clickBookNowButton(page);
	await page.waitFor(999000);
};

export default bookNow;
