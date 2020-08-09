import { Page } from 'puppeteer';
// import clickBookNowButton from './clickBookNowButton';
import clickAvailabilityButton from './clickAvailabilityButton';

const bookNow = async (page: Page) => {
	const twentyMinutes = 1200000;

	await clickAvailabilityButton(page);
	// await clickBookNowButton(page);

	await page.waitFor(twentyMinutes);
};

export default bookNow;
