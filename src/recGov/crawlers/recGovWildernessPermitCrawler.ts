import utils from '../utils';
import actions from '../actions';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const { generatePageUrl } = utils;
const { signIn, getSiteData, setGroupSize, setIsCommercialTrip } = actions;

puppeteer.use(StealthPlugin());

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	const pageUrl = generatePageUrl();
	await page.goto(pageUrl);

	await signIn(page);
	await setGroupSize(page);
	await setIsCommercialTrip(page);

	const siteData = await getSiteData(page);

	console.log(siteData);

	// await page.waitFor(99000);

	await browser.close();
})();
