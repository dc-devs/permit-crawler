import { Page } from 'puppeteer';
import clickBookNowButton from './clickBookNowButton';
import clickAvailabilityButton from './clickAvailabilityButton';

const bookNow = async (page: Page, site: string) => {
	await clickAvailabilityButton(page, site);
	await clickBookNowButton(page);
};

export default bookNow;
