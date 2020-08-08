import utils from '../utils';
import actions from '../actions';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const { generatePageUrl } = utils;
const { signIn, getPermitInfo, setGroupSize, setIsCommercialTrip } = actions;

puppeteer.use(StealthPlugin());

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	const pageUrl = generatePageUrl();
	await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });

	await signIn(page);
	await setGroupSize(page);
	await setIsCommercialTrip(page);

	const permitInfo = await getPermitInfo(page);

	console.log(permitInfo);

	await browser.close();
})();
