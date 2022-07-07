import config from './config';
import puppeteer from 'puppeteer-extra';
import { Twilio, RecreationGov } from './classes';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

(async () => {
	const { tripDetails } = config;
	const twilio = new Twilio({ config });
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	const recreationGov = new RecreationGov({
		page,
		twilio,
		config,
		browser,
		tripDetails,
	});

	await recreationGov.visitHomePage();
	await recreationGov.signIn();
	await recreationGov.visitPermitsPage();
	await recreationGov.bookPermit();
})();
