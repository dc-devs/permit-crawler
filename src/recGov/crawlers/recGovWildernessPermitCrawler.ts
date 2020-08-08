import utils from '../utils';
import actions from '../actions';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const { generatePageUrl } = utils;
const { signIn, findMyPermit } = actions;

puppeteer.use(StealthPlugin());

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	const pageUrl = generatePageUrl();
	await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });

	await signIn(page);
	await findMyPermit(page);

	await browser.close();
})();
