import config from './config';
import puppeteer from 'puppeteer-extra';
import { PermitAvailability } from './enums';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import RecreationGov from './classes/recreation-gov/recreation-gov.class';

puppeteer.use(StealthPlugin());

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	const recreationGov = new RecreationGov({ page, config });

	await recreationGov.visitHomePage();
	await recreationGov.signIn();
	await recreationGov.visitPermitsPage();
	await recreationGov.setDate();
	await recreationGov.setGroupSize();

	await page.waitForTimeout(1000);

	const { availability, permitCount } =
		await recreationGov.getPermitAvailability();

	if (availability === PermitAvailability.AVAILABLE) {
		await recreationGov.selectPermit();
		await recreationGov.clickBookNow();
	}

	await page.waitForTimeout(9999999);

	await browser.close();
})();
